import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, CheckBox, Input,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const SharedAccountScreen=()=>{
    //console.log("SharedAccountScreen");
    const [sharedEmail,setSharedEmail]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();
    const state = useSelector(state => state.userInfo);
    const [sendRole,setSendRole]=useState(false);
    const Shared=()=>{
        setIsLoading(true);
        
        axios({
            method:"PUT",
            url:`${BASE_URL}/account/request/send`,
            headers: {'Authorization': state.token},
            data:{
                username:state.info.username,
                requestEmail:sharedEmail,
                business:sendRole,
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
    console.log(sendRole);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        <Input
                        label="對方電子郵件"
                        labelStyle={Userstyle.lable1}
                        containerStyle={[Userstyle.containerStyle1,{marginBottom:0}]}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        value={sharedEmail}
                        onChangeText={text =>setSharedEmail(text)}
                        />
                        <CheckBox
                        //disabled={true}
                            checked={!sendRole}
                            onPress={()=>setSendRole(!sendRole)}
                            title="商業"
                            textStyle={{color:"#919191"}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare} size={40} color="#919191"/>}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                        <Button
                        buttonStyle={Userstyle.buttonUpdate}
                        title="送出共享請求"
                        loading={isLoading}
                        onPress={()=>{Shared()}}/>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};


export default SharedAccountScreen;