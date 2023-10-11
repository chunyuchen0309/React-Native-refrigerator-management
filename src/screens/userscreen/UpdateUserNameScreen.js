import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Button, Input, } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { modifyUserNameApi, removeError } from "../../store/userSlice";

const UpdateUserNameScreen = () => {
    const state = useSelector(state => state.userInfo);
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleuserNameChange = useCallback((text) => {
        setUserName("" + text);
    }, []);


    const Update = async () => {
        setIsLoading(true);
        //console.log(username+" and "+accountName+" and "+token.token);
        var data = {
            email: state.info.email,
            name: userName,
            phone: state.info.phone,
            newPassword: "",
            oldPassword: "",
        }
        await dispatch(modifyUserNameApi(
            { "modifydata": data }
            ));
        setIsLoading(false);
        navigation.goBack();
        /*axios({
            method:"PUT",
            url:`${BASE_URL}/auth/modify`,
            headers: {'Authorization': state.token},
            data:{
                email:state.info.email,
                name:userName,
                phone:state.info.phone,
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
        setUserName(state.info.username);
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
                            用戶名稱
                        </Text>
                        <TextInput
                            selectionColor='#777'
                            accessibilityLabel="用戶名稱"
                            accessible={true}
                            style={Userstyle.textContainerStyle}
                            value={userName}
                            multiline={false}
                            onChangeText={handleuserNameChange}
                        />
                        <Button
                            buttonStyle={Userstyle.buttonUpdate}
                            title="修改"
                            loading={isLoading}
                            onPress={() => { Update() }} />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};


export default UpdateUserNameScreen;