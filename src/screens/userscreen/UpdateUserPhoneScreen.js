import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input, } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { modifyUserPhoneApi, removeError } from "../../store/userSlice";
import { moderateScale } from "../ScaleMethod";

const UpdateUserPhoneScreen = () => {
    //console.log("UpdateUserPhoneScreen");
    const state = useSelector(state => state.userInfo);
    const [userPhone, setUserPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleuserPhoneChange = useCallback((text) => {
        setUserPhone(text);
    }, []);


    const Update = async () => {
        setIsLoading(true);
        var data = {
            name: state.info.username,
            phone: userPhone,
            email: state.info.email,
            newPassword: "",
            oldPassword: "",
        }
        await dispatch(modifyUserPhoneApi(
            {"modifydata": data }
        ));
        setIsLoading(false);
        navigation.goBack();

        /*axios({
            method:"PUT",
            url:`${BASE_URL}/auth/modify`,
            headers: {'Authorization': state.token},
            data:{
                name:state.info.username,
                phone:userPhone,
                email:state.info.email,
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
        });*/
    }

    useEffect(()=>{
        if(state.error){
            Alert.alert("請連結網路已變更新");
            dispatch(removeError());
        }
    },[state.error]);

    useEffect(() => {
        setUserPhone(state.info.phone);
    }, []);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>

                        <Text style={Userstyle.textLabel}
                            accessible={false}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityState={{ disabled: true }} >
                            用戶電話號碼
                        </Text>
                        <TextInput
                            keyboardType='numeric'
                            selectionColor='#777'
                            accessibilityLabel="用戶電話號碼"
                            accessible={true}
                            style={Userstyle.textContainerStyle}
                            value={userPhone}
                            multiline={false}
                            onChangeText={handleuserPhoneChange} />


                        <Button
                            buttonStyle={Userstyle.buttonUpdate}
                            title="修改"
                            titleStyle={{fontSize:moderateScale(17),fontWeight:'500'}}
                            loading={isLoading}
                            onPress={() => { Update() }} />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};


export default UpdateUserPhoneScreen;