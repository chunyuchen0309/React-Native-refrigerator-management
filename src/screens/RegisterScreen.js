import React, { useContext, useState } from "react";
import { Button, CheckBox, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCircle, faCircleCheck, faCircleDot, faCircleExclamation, faEnvelopeOpen, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";



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

    const {isLoading,register}=useContext(AuthContext);

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
        <KeyboardAvoidingView behavior="position" enabled  >
        <Text style={{fontSize:40,color:"#919191", marginHorizontal:10,marginVertical:20}}>
            Register
        </Text>
        <View style={styles.radioButton}>
            <CheckBox
                checked={role === 1}
                onPress={()=>setRole(0)}
                title="Personal"
                textStyle={{color:"#919191"}}
                containerStyle={{backgroundColor:'transparent',borderColor:'transparent',marginLeft:-1}}
                checkedIcon={<FontAwesomeIcon icon={faCircleDot}  size={20} color="#919191"  />}
                uncheckedIcon={<FontAwesomeIcon icon={faCircleCheck} size={20} color="#F49F0C"/>}
            />
            <CheckBox
                checked={role === 0}
                onPress={()=>setRole(1)}
                title="business"
                textStyle={{color:"#919191"}}
                containerStyle={{backgroundColor:'transparent',borderColor:'transparent',marginLeft:-1}}
                checkedIcon={<FontAwesomeIcon icon={faCircleDot} size={20} color="#919191"/>}
                uncheckedIcon={<FontAwesomeIcon icon={faCircleCheck} size={20} color="#F49F0C"/>}
            />
            </View>
            <Input 
                containerStyle={{height:80 ,width:350}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{height:45}}
                leftIcon={<FontAwesomeIcon icon={ faUser } size={25} color="#919191"/>}
                inputStyle={{}}
                label="Username"
                errorMessage={errorMessage[0]}
                onChangeText={text =>nameBlur(text)}
                value={name}
                clearButtonMode="while-editing"
                 />

            <Input
                containerStyle={{height:80 ,width:350}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{height:45}}
                inputStyle={{}}
                leftIcon={<FontAwesomeIcon icon={ faEnvelopeOpen} size={25} color="#919191" />}
                label="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={text =>setEmail(text)}
                clearButtonMode="while-editing"
                 />
            
            <Input
                containerStyle={{height:80 ,width:350}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{height:45}}
                leftIcon={<FontAwesomeIcon icon={ faCircleExclamation } size={25} color="#919191"/>}
                inputStyle={{}}
                label="Password"
                secureTextEntry //password
                onChangeText={text =>passwordBlur(text)}
                value={password}
                errorMessage={errorMessage[1]}
                clearButtonMode="while-editing"
                />

            <Input
                containerStyle={{height:80 ,width:350}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{height:45}}
                inputStyle={{}}
                leftIcon={<FontAwesomeIcon icon={ faPhone} size={25} color="#919191" />}
                label="Phone"
                keyboardType="numeric"
                value={phone}
                errorMessage={errorMessage[2]}
                onChangeText={text =>phoneBlur(text)}
                clearButtonMode="while-editing"
                />
            
            

            <View style={styles.twoButton}>
                <Button 
                title="Register"
                loading={isLoading}
                buttonStyle={{       
                    backgroundColor: "#A6FCB6",
                    borderRadius: 5,
                }}
                containerStyle={{
                    height: 40,
                    width: 120,
                    marginHorizontal: 30,
                    marginVertical: 10,
                }}
                titleStyle={{ marginHorizontal: 10, color: 'black' ,fontWeight:"bold",}}

                onPress={()=>{
                    register(name,email,password,phone,role);
                }}
                />

                <Button 
                title="Login"
                buttonStyle={{
                    backgroundColor: "#919191",
                    borderRadius: 3,
                }}
                containerStyle={{
                    height: 40,
                    width: 120,
                    marginHorizontal: 30,
                    marginVertical: 10,
                }}
                titleStyle={{ marginHorizontal: 10, color: 'black' ,fontWeight:"bold"}}

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
        //justifyContent:'space-around',
        
    },

    radioButton:{
        flexDirection:'row', //水平排列
        //flexWrap:'nowrap',
        alignSelf:'flex-start',
        marginBottom:10


    },

});

export default RegisterScreen;