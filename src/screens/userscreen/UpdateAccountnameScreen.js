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

const UpdateAccountnameScreen=()=>{
    console.log("UpdateAccountnameScreen");
    const [accountName,setAccountName]=useState("");
    const [username,setUserName]=useState("");
    const route = useRoute();
    const {token}=useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();

    const handleAccountNameChange = useCallback((text) => {
        setAccountName(text);
      }, []);


    const Update=()=>{
        setIsLoading(true);
        //console.log(username+" and "+accountName+" and "+token.token);

        axios({
            method:"PUT",
            url:`${BASE_URL}/account/modify`,
            headers: {'Authorization': token.token},
            data:{
                username:username,
                account_name:accountName
            },
        }).then(res=>{
            console.log(res.data);
            setIsLoading(false);
        }).catch(e=>{
            console.log(`UpdateAccountName error ${e}`);
            setIsLoading(false);
            
        }).finally(()=>{
            setIsLoading(false);
            navigation.goBack();
        });

        
    }
    useEffect(()=>{
        setAccountName(route.params?.accountName);
        setUserName(route.params?.username);
    },[]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        <Input
                        label="冰箱名稱"
                        labelStyle={Userstyle.lable1}
                        containerStyle={Userstyle.containerStyle1}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        value={accountName}
                        onChangeText={handleAccountNameChange}
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


export default UpdateAccountnameScreen;