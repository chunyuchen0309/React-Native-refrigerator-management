import React, { useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
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
import { moderateScale } from "../ScaleMethod";

const SharedAccountScreen=()=>{
    //console.log("SharedAccountScreen");
    const [sharedEmail,setSharedEmail]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();
    const state = useSelector(state => state.userInfo);
    const [sendRole,setSendRole]=useState(false);
    const Shared=()=>{
        setIsLoading(true);
        if(sendRole){
            
            console.log(
            '\nnumber:',''+sharedEmail,
            '\nbusiness:',sendRole,);

            axios({
                method:"POST",
                url:`${BASE_URL}/account/account/business/request`,
                headers: {'Authorization': state.token},
                data:{
                    number:sharedEmail,
                },
            }).then(res=>{
                console.log("商業共享請求發送成功",res.data);
                setIsLoading(false);
                navigation.goBack();
            }).catch(function (error){
                console.log(error.response);
                Alert.alert(`${error.response.data.errorMessage}`);
                setIsLoading(false);
            }).finally(()=>{
                setIsLoading(false);
                
            });     

        }else{
            
            console.log('username:',''+state.info.username,
            '\nrequestEmail:',''+sharedEmail,
            '\nbusiness:',sendRole,);
            
            axios({
                method:"PUT",
                url:`${BASE_URL}/account/account/request/send`,
                headers: {'Authorization': state.token},
                data:{
                    'username':''+state.info.username,
                    'requestEmail':''+sharedEmail,
                    'business':sendRole,
                },
            }).then(res=>{
                console.log("個人共享請求發送成功",res.data);
                setIsLoading(false);
                navigation.goBack();
            }).catch(function (error){
                console.log(error.response);
                Alert.alert(`${error.response.data.errorMessage}`);
                setIsLoading(false);
            }).finally(()=>{
                setIsLoading(false);
                
            });        
        }
        
        
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                        <Input
                        label={`${sendRole?'輸入公司統一編號':'輸入對方電子郵件'}`}
                        labelStyle={Userstyle.lable1}
                        containerStyle={[Userstyle.containerStyle1,{marginBottom:0}]}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        value={sharedEmail}
                        autoCapitalize="none" 
                        selectionColor='#777'
                        keyboardType="email-address"
                        onChangeText={text =>setSharedEmail(text)}
                        />
                        <CheckBox
                        //disabled={true}
                            checked={!sendRole}
                            onPress={()=>setSendRole(!sendRole)}
                            title="對方是否為商業用戶"
                            textStyle={{color:"#919191",fontSize:moderateScale(18)}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare} size={40} color="#919191"/>}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                        <Button
                        buttonStyle={Userstyle.buttonUpdate}
                        title="送出共享請求"
                        titleStyle={{fontSize:moderateScale(17),fontWeight:'500'}}
                        loading={isLoading}
                        onPress={()=>{Shared()}}/>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};


export default SharedAccountScreen;