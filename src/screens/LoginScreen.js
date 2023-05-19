import React, { useContext, useState } from "react";
import { Button, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, View ,Keyboard,TouchableWithoutFeedback} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { KeyboardAvoidingView } from "react-native";
import {  } from "react-native";

const LoginScreen =()=>{

    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const navigation=useNavigation();
    //取得AuthContext

    const {isLoading,login}=useContext(AuthContext);

    
    return(
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                                accessible={false}>
        <SafeAreaView style={styles.container}>
        
        
        <KeyboardAvoidingView behavior="position" enabled>
        

       
            <Input
                containerStyle={{height:80 ,width:350}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{height:45}}
                inputStyle={{}}
                leftIcon={<FontAwesomeIcon icon={ faEnvelope} size={25} color="#919191" />}
                label="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={text =>setEmail(text)}
                //onFocus={(event) => {this._scrollToInput(ReactNative.findNodeHandle(event.target))}}
                 />
            
            <Input
                containerStyle={{height:80 ,width:350}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{height:45}}
                leftIcon={<FontAwesomeIcon icon={ faCircleExclamation } size={25} color="#919191"/>}
                inputStyle={{}}
                label="Password"
                
                secureTextEntry //password
                onChangeText={text =>setPassword(text)}
                value={password}
                 />
        
            <View style={styles.twoButton}>
            
                <Button 
                title="Login"
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
                titleStyle={{ marginHorizontal: 10, color: 'black' ,fontWeight:"bold"}}

                onPress={()=>login(email,password)}
                />
            
                <Button 
                title="Register"
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

                onPress={()=>navigation.navigate('Register')}//to RegisterScreen
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

});

export default LoginScreen;