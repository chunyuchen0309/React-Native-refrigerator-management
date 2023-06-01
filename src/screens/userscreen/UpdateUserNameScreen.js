import React, { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const UpdateUserNameScreen=()=>{
    console.log("UpdateUsernameScreen");
    const [userName,setUserName]=useState("");
    const [userInfo,setUserInfo]=useState("");
    const route = useRoute();
    const {token}=useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();

    const handleuserNameChange = useCallback((text) => {
        setUserName(text);
      }, []);


    const Update=()=>{
        setIsLoading(true);
        //console.log(username+" and "+accountName+" and "+token.token);

        axios({
            method:"PUT",
            url:`${BASE_URL}/auth/modify`,
            headers: {'Authorization': token.token},
            data:{
                email:userInfo.email,
                name:userName,
                phone:userInfo.phone,
                newPassword:"",
                oldPassword:"",
            },
        }).then(res=>{
            console.log(res.data);
            setIsLoading(false);
        }).catch(e=>{
            console.log(`UpdateUserName error ${e}`);
            setIsLoading(false);
            
        }).finally(()=>{
            setIsLoading(false);
            navigation.goBack();
        });

        
    }
    useEffect(()=>{
        setUserInfo(route.params?.userInfo);
        setUserName(route.params?.userInfo.username);
    },[]);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        <Input
                        label="用戶名稱"
                        labelStyle={Userstyle.lable1}
                        containerStyle={Userstyle.containerStyle1}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        value={userName}
                        onChangeText={handleuserNameChange}
                        />
                    
                        <Button
                        buttonStyle={Userstyle.buttonUpdate}
                        title="修改"
                        loading={isLoading}
                        onPress={()=>{Update()}}/>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};


export default UpdateUserNameScreen;