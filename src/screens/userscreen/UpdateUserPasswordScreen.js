import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const UpdateUserPasswordScreen=()=>{
    //console.log("UpdateUserPasswordScreen");
    const [userPasswordOld,setUserPasswordOld]=useState("");
    const [userPasswordNew,setUserPasswordNew]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const [userInfo,setUserInfo]=useState("");
    const route = useRoute();
    const {token}=useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();

    const handleuserPasswordChangeOld = useCallback((text) => {
        setUserPasswordOld(text);
      }, []);
    
      const handleuserPasswordChangeNew = useCallback((text) => {
        setUserPasswordNew(text);
      }, []);

      const handleConfirmPasswordChange = useCallback((text) => {
        setConfirmPassword(text);
        if (userPasswordNew == text) {
            setErrorMessage("");
        } else {
            setErrorMessage("確認密碼不符合");
        }
      },[[userPasswordNew]]);


    const Update=()=>{
        setIsLoading(true);
        //console.log(username+" and "+accountName+" and "+token.token);
        axios({
            method:"PUT",
            url:`${BASE_URL}/auth/modify`,
            headers: {'Authorization': token.token},
            data:{
                email:userInfo.email,
                name:userInfo.username,
                phone:userInfo.phone,
                oldPassword: userPasswordOld,
                newPassword: userPasswordNew,

            },
        }).then(res=>{
            console.log(res.status);
            setIsLoading(false);
            navigation.goBack();
        }).catch(function (error){
            
            //console.log(`error ${error.response.data.errorCode}`);
            if(error.response.data.errorCode==50001){
                //console.log("密碼錯誤")
                Alert.alert("原本密碼輸入錯誤","",
                [
                    {text: "Cancel",style: "cancel"},
                    {text: "OK",style: "ok",}
                  ]);
                setUserPasswordOld("");
            }
            setIsLoading(false);
            
        }).finally(()=>{
            setIsLoading(false);
        });

        
    }
    useEffect(()=>{
        setUserInfo(route.params?.userInfo);
        //setUserPasswordOld(route.params?.userInfo.phone);
    },[]);

    //console.log(userPasswordNew+" , "+confirmPassword+" , "+errorMessage);
    //console.log("old "+userPasswordOld);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        <Input
                            label="輸入目前密碼"
                            labelStyle={Userstyle.lable1}
                            containerStyle={Userstyle.containerStyle1}
                            inputContainerStyle={Userstyle.inputContainerStyle1}
                            inputStyle={Userstyle.inputStyle1}
                            value={userPasswordOld}
                            onChangeText={handleuserPasswordChangeOld}
                            />
                        <View style={Userstyle.whitebg}>
                            <Input
                                label="新密碼"
                                placeholder="輸入欲修改的密碼"
                                labelStyle={Userstyle.lable1}
                                containerStyle={Userstyle.PasswordcontainerStyle}
                                inputContainerStyle={Userstyle.inputContainerStyle1}
                                inputStyle={Userstyle.inputStyle1}
                                value={userPasswordNew}
                                onChangeText={handleuserPasswordChangeNew}
                                secureTextEntry
                                />

                            <Input
                                label="確認密碼"
                                placeholder="再次輸入新密碼"
                                labelStyle={Userstyle.lable1}
                                containerStyle={Userstyle.PasswordcontainerStyle}
                                inputContainerStyle={Userstyle.inputContainerStyle1}
                                inputStyle={Userstyle.inputStyle1}
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                secureTextEntry
                                errorMessage={errorMessage}
                                />
                        </View>
                    
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


export default UpdateUserPasswordScreen;