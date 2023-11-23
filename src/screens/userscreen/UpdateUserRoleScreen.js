import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, CheckBox, Input, Text,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale } from "../ScaleMethod";
import { setUserToken } from "../../store/userSlice";

const UpdateUserRoleScreen=()=>{
    
    const state = useSelector(state => state.userInfo);
    const [userRole,setUserRole]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();
    const dispatch = useDispatch()
    const Update=()=>{

        setIsLoading(true);
        console.log(userRole);
        
        axios({
            method:"GET",
            url:`${BASE_URL}/account/account/business/switch`,
            headers: {'Authorization':state.token},
        }).then(async res=>{
            console.log("更換token成功",res.data);
            await dispatch(setUserToken(res.data));
            setIsLoading(false);
            navigation.goBack();
        }).catch(function (error){
            console.log(error);
            setIsLoading(false);
            if(error.response.status=="500"){
                Alert.alert("目前無商業帳號，請註冊商業帳號或者申請商業帳號共用")
            }
            
        }).finally(()=>{
            setIsLoading(false);
            
        });
    }
    useEffect(()=>{
        setUserRole(state.role=="商業"? 1:0 );
    },[]);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                    <View style={[Userstyle.checkBoxView,{justifyContent:'center'}]}>
                        <CheckBox
                        //disabled={true}
                            checked={userRole == 1}
                            onPress={()=>setUserRole(0)}
                            title="個人"
                            textStyle={{color:"#919191",fontSize:moderateScale(18)}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare}  size={40} color="#919191"  />}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                        <CheckBox
                        //disabled={true}
                            checked={userRole == 0}
                            onPress={()=>setUserRole(1)}
                            title="商業"
                            textStyle={{color:"#919191",fontSize:moderateScale(18)}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare} size={40} color="#919191"/>}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                    </View>   
                    <Button
                        buttonStyle={Userstyle.buttonUpdate}
                        titleStyle={{fontSize:moderateScale(17),fontWeight:'500'}}
                        title="修改"
                        loading={isLoading}
                        onPress={()=>{Update()}}/>              
                        
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};


export default UpdateUserRoleScreen;