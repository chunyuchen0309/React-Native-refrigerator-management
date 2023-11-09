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
import { useDispatch, useSelector } from "react-redux";
import { modifyAccountNameApi, removeError,} from "../../store/userSlice";
import { moderateScale } from "../ScaleMethod";

const UpdateAccountnameScreen=()=>{
    //console.log("UpdateAccountnameScreen");
    const state = useSelector(state => state.userInfo);
    const [accountName,setAccountName]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();
    const dispatch = useDispatch()
    const handleAccountNameChange = useCallback((text) => {
        setAccountName(text);
    }, []);
    const Update=async ()=>{
        setIsLoading(true);
        //console.log(username+" and "+accountName+" and "+token.token);
        var data={
            username:state.info.username,
            account_name:accountName
            }
        await dispatch(modifyAccountNameApi(
            {"modifydata": data }
            ));
        setIsLoading(false);
        navigation.goBack();
    }
    useEffect(()=>{
        setAccountName(state.info.accountName);
    },[]);

    useEffect(()=>{
        if(state.error){
            Alert.alert("請連結網路已變更新");
            dispatch(removeError());
        }
    },[state.error]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        
                        <Text style={Userstyle.textLabel}
                        accessible={false}
                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        accessibilityState={{ disabled: true }} >
                            帳戶名稱
                        </Text>
                        <TextInput
                            autoCapitalize="none" 
                            selectionColor='#777'
                            accessibilityLabel="帳戶名稱"
                            accessible={true}
                            style={Userstyle.textContainerStyle}
                            value={accountName}
                            onChangeText={handleAccountNameChange}
                            multiline={false}   
                        />
                    
                        <Button
                        titleStyle={{fontSize:moderateScale(17),fontWeight:'500'}}
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


export default UpdateAccountnameScreen;