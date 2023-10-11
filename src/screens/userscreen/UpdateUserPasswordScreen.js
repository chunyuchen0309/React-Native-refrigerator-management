import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Input,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";

const UpdateUserPasswordScreen=()=>{
    //console.log("UpdateUserPasswordScreen");
    const state = useSelector(state => state.userInfo);
    const [userPasswordOld,setUserPasswordOld]=useState("");
    const [userPasswordNew,setUserPasswordNew]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage,setErrorMessage]=useState("");
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
            url:`${BASE_URL}/account/auth/modify`,
            headers: {'Authorization': state.token},
            data:{
                email:state.info.email,
                name:state.info.username,
                phone:state.info.phone,
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
            }else{
                Alert.alert("請連接網路以便更新")
            }
            setIsLoading(false);
            
        }).finally(()=>{
            setIsLoading(false);
        });

        
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        <Text style={Userstyle.textLabel}
                            accessible={false}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityState={{ disabled: true }} >
                                輸入目前密碼
                        </Text>
                        <TextInput
                            selectionColor='#777'
                            accessibilityLabel="輸入目前密碼"
                            accessible={true}
                            style={Userstyle.textContainerStyle}
                            value={userPasswordOld}
                            onChangeText={handleuserPasswordChangeOld}
                            multiline={false}
                        />
                        <View style={Userstyle.whitebg}>
                            <Text style={[Userstyle.textLabelTwo,{marginTop:0}]}
                                accessible={false}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityState={{ disabled: true }} >
                                    新密碼
                            </Text>
                            <TextInput
                                selectionColor='#777'
                                accessibilityLabel="輸入欲修改的密碼"
                                accessible={true}
                                style={Userstyle.textContainerStyleTwo}
                                value={userPasswordNew}
                                onChangeText={handleuserPasswordChangeNew}
                                secureTextEntry
                                multiline={false}
                            />
                            <Text style={Userstyle.textLabelTwo}
                                accessible={false}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityState={{ disabled: true }} >
                                    確認密碼
                            </Text>
                            <TextInput
                                selectionColor='#777'
                                accessibilityLabel="再次輸入新密碼"
                                accessible={true}
                                style={Userstyle.textContainerStyleTwo}
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                secureTextEntry
                                errorMessage={errorMessage}
                                multiline={false}
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