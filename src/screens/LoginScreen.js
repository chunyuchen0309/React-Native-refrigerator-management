import React, { useContext, useState } from "react";
import { Button, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { KeyboardAvoidingView } from "react-native";
import { } from "react-native";
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale } from "./ScaleMethod.js";
import modal_fab from "../style/Modal&FAB";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = () => {
    const state = useSelector(state => state.userInfo);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigation = useNavigation();
    //取得AuthContext
    const [modalVisible,setModalVisible]=useState(false);
    const { isLoading, login ,changeModel} = useContext(AuthContext);
    //console.log("當前使用者資訊",state);
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
                accessible={false}>
                <SafeAreaView style={styles.container}>
                    <Spinner
                    visible={isLoading}
                    animation='fade'
                    overlayColor="rgba(0, 0, 0, 0.9)"
                    />
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
                            <View style={[modal_fab.lookSeelect,Platform.OS === 'android'? {marginVertical:60}:null]}>            
                                <AnimatedLottieView      
                                    style={{width:ScreenWidth*0.8,alignSelf:'center'}}
                                    source={require('../assets/handClick.json')}  
                                    speed={0.8}
                                    autoPlay
                                    loop={false}
                                    autoSize={true}/>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{changeModel(false),login(email, password),setModalVisible(false)}}>
                                    <View style={{backgroundColor:'#D9D9D9',flex:1,marginHorizontal:moderateScale(20),borderRadius:moderateScale(20),marginBottom:moderateScale(30),paddingHorizontal:moderateScale(5)}}>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(30),paddingTop:moderateScale(20),color:'#404496'}}>簡易模式</Text>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(18)}}>主要提供給視力不良者及老年人使用，簡化介面易於操作使用</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}} onPress={()=>{changeModel(true),login(email, password),setModalVisible(false)}}>
                                    <View style={{backgroundColor:'#D9D9D9',flex:1,marginHorizontal:moderateScale(20),borderRadius:moderateScale(20),marginBottom:moderateScale(30),paddingHorizontal:moderateScale(5)}}>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(30),paddingTop:moderateScale(20),color:'#404496'}}>一般模式</Text>
                                        <Text style={{textAlign:'center',fontWeight:'500',fontSize:moderateScale(18)}}>主要提供給一般用戶以及商業用戶使用，功能性較高</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>            
                        </TouchableWithoutFeedback>    
                    </Modal>
                    <KeyboardAvoidingView behavior="position" enabled>
                        <Text style={{ fontSize: 40, color: "#919191", marginHorizontal: 10, marginVertical: 20 }}>
                            登入
                        </Text>
                        <Input
                            containerStyle={{ height: moderateScale(80) }}
                            disabledInputStyle={{ background: "#ddd" }}
                            inputContainerStyle={{ height: moderateScale(45) }}
                            inputStyle={{}}
                            leftIcon={<FontAwesomeIcon icon={faEnvelope} size={moderateScale(25)} color="#919191" />}
                            label="電子郵件"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        //onFocus={(event) => {this._scrollToInput(ReactNative.findNodeHandle(event.target))}}
                        />

                        <Input
                            containerStyle={{ height: moderateScale(80) }}
                            disabledInputStyle={{ background: "#ddd" }}
                            inputContainerStyle={{ height: moderateScale(45) }}
                            leftIcon={<FontAwesomeIcon icon={faCircleExclamation} size={moderateScale(25)} color="#919191" />}
                            inputStyle={{}}
                            label="密碼"

                            secureTextEntry //password
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />

                        <View style={styles.twoButton}>

                            <Button
                                title="登入"
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
                                titleStyle={{ marginHorizontal: moderateScale(10), color: 'black', fontWeight: "bold" }}
                                onPress={() => setModalVisible(true)}
                            />

                            <Button
                                title="註冊頁面"
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
                                titleStyle={{ marginHorizontal: moderateScale(10), color: 'black', fontWeight: "bold" }}
                                onPress={() => navigation.navigate('Register')}//to RegisterScreen
                            />
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    twoButton: {
        flexDirection: 'row', //水平排列
        //flexWrap:'nowrap',
        alignSelf: 'center',
        //justifyContent:'space-around',

    },

});

export default LoginScreen;