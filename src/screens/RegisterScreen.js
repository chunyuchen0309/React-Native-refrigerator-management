import React, { useContext, useState } from "react";
import { Button, CheckBox, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faBuilding, faCircle, faCircleCheck, faCircleDot, faCircleExclamation, faEnvelopeOpen, faLocationPin, faMapPin, faMoneyCheck, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

import { scale, moderateScale, verticalScale} from "./ScaleMethod.js";
import modal_fab from "../style/Modal&FAB";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import { ScreenWidth } from "@rneui/base";
const RegisterScreen =()=>{

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [errorMessage,seterrorMessage]=useState([]);
    const [role,setRole]=useState(0);
    const navigation=useNavigation("");
    //const selectIndex="0"
     //取得AuthContext
     const [modalVisible,setModalVisible]=useState(false);
    const {isLoading,register,changeModel}=useContext(AuthContext);

    const nameBlur=(text)=>{
        setName(text);
        
        name.length < 3 ? errorMessage[0]="length too small":errorMessage[0]="";
    }
    const passwordBlur=(text)=>{
        setPassword(text);
        password.length < 3 ? errorMessage[1]="length too small":errorMessage[1]="";
    }

    const phoneBlur=(text)=>{
        setPhone(text);
        phone.length < 9 ? errorMessage[2]="length too small":errorMessage[2]="";
    }

    return(
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Modal 
                        animationIn={"fadeIn"}
                        animationInTiming={800}
                        animationOut={"fadeOut"}
                        animationOutTiming={100}
                        isVisible={modalVisible}
                        backdropOpacity={0.9} 
                        onBackdropPress={() => setModalVisible(false)}
                        >
                        <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
                            <View style={[modal_fab.lookSeelect]}>            
                                <AnimatedLottieView      
                                    style={{width:ScreenWidth*0.8,alignSelf:'center'}}
                                    source={require('../assets/handClick.json')}  
                                    speed={0.5}
                                    autoPlay
                                    loop={false}
                                    autoSize={true}/>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{changeModel(false),register(name,email,password,phone,role)}}>
                                    <View style={{backgroundColor:'#D9D9D9',flex:1,marginHorizontal:moderateScale(20),borderRadius:moderateScale(20),marginBottom:moderateScale(30),paddingHorizontal:moderateScale(5)}}>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(30),paddingTop:moderateScale(20),color:'#404496'}}>簡易模式</Text>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(18)}}>主要提供給視力不良者及老年人使用，簡化介面易於操作使用</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{changeModel(true),register(name,email,password,phone,role)}}>
                                    <View style={{backgroundColor:'#D9D9D9',flex:1,marginHorizontal:moderateScale(20),borderRadius:moderateScale(20),marginBottom:moderateScale(30),paddingHorizontal:moderateScale(5)}}>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(30),paddingTop:moderateScale(20),color:'#404496'}}>一般模式</Text>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(18)}}>主要提供給一般用戶以及商業用戶使用，功能性較高</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>            
                        </TouchableWithoutFeedback>    
                    </Modal>
                <KeyboardAvoidingView behavior="position" enabled  >
                    <Text style={{fontSize:moderateScale(40),color:"#919191", marginHorizontal:moderateScale(10),marginVertical:moderateScale(20)}}>
                        註冊
                    </Text>
                    <Input 
                        containerStyle={{height:moderateScale(80)}}
                        disabledInputStyle={{ background: "#ddd" }}
                        inputContainerStyle={{height:moderateScale(45)}}
                        leftIcon={<FontAwesomeIcon icon={ faUser } size={moderateScale(25)} color="#919191"/>}
                        inputStyle={{}}
                        label="使用者名稱"
                        errorMessage={errorMessage[0]}
                        onChangeText={text =>nameBlur(text)}
                        value={name}
                        clearButtonMode="while-editing"
                        />

                    <Input
                        containerStyle={{height:moderateScale(80)}}
                        disabledInputStyle={{ background: "#ddd" }}
                        inputContainerStyle={{height:moderateScale(45)}}
                        inputStyle={{}}
                        leftIcon={<FontAwesomeIcon icon={ faEnvelopeOpen} size={moderateScale(25)} color="#919191" />}
                        label="電子郵件"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text =>setEmail(text)}
                        clearButtonMode="while-editing"
                        />
                    
                    <Input
                        containerStyle={{height:moderateScale(80)}}
                        disabledInputStyle={{ background: "#ddd" }}
                        inputContainerStyle={{height:45}}
                        leftIcon={<FontAwesomeIcon icon={ faCircleExclamation } size={moderateScale(25)} color="#919191"/>}
                        inputStyle={{}}
                        label="密碼"
                        secureTextEntry //password
                        onChangeText={text =>passwordBlur(text)}
                        value={password}
                        errorMessage={errorMessage[1]}
                        clearButtonMode="while-editing"
                        />

                    <Input
                        containerStyle={{height:moderateScale(80)}}
                        disabledInputStyle={{ background: "#ddd" }}
                        inputContainerStyle={{height:moderateScale(45)}}
                        inputStyle={{}}
                        leftIcon={<FontAwesomeIcon icon={ faPhone} size={moderateScale(25)} color="#919191" />}
                        label="點話號碼"
                        keyboardType="numeric"
                        value={phone}
                        errorMessage={errorMessage[2]}
                        onChangeText={text =>phoneBlur(text)}
                        clearButtonMode="while-editing"
                        />

                    <View style={styles.twoButton}>
                        <Button 
                        title="註冊"
                        loading={isLoading}
                        buttonStyle={{       
                            backgroundColor: "#A6FCB6",
                            borderRadius: moderateScale(5),
                        }}
                        containerStyle={{
                            height: moderateScale(40),
                            width: moderateScale(120),
                            marginHorizontal: moderateScale(30),
                            marginVertical: moderateScale(10),
                        }}
                        titleStyle={{ marginHorizontal: moderateScale(10), color: 'black' ,fontWeight:"bold",}}

                        onPress={()=>{
                            setModalVisible(true);
                        }}
                        />

                        <Button 
                        title="登入頁面"
                        buttonStyle={{
                            backgroundColor: "#919191",
                            borderRadius: moderateScale(3),
                        }}
                        containerStyle={{
                            height: moderateScale(40),
                            width: moderateScale(120),
                            marginHorizontal: moderateScale(30),
                            marginVertical: moderateScale(10),
                        }}
                        titleStyle={{ marginHorizontal: moderateScale(10), color: 'black' ,fontWeight:"bold"}}
                        onPress={()=>navigation.navigate('Login')}//to RegisterScreen
                        />
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        </>
        
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    twoButton:{
        flexDirection:'row', //水平排列
        //flexWrap:'nowrap',
        alignSelf:'center',
        height:200,
        //marginBottom:50,
        //justifyContent:'space-around',
        
    },

});

export default RegisterScreen;