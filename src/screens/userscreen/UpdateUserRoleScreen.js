import React, { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
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
import { useSelector } from "react-redux";
import { moderateScale } from "../ScaleMethod";

const UpdateUserRoleScreen=()=>{
    console.log("UpdateUserRoleScreen");
    const state = useSelector(state => state.userInfo);
    const [userRole,setUserRole]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();

    const Update=()=>{
        setIsLoading(true);
        console.log(userRole);
        axios({
            method:"PUT",
            url:`${BASE_URL}/auth/modify`,
            headers: {'Authorization':state.token},
            data:{
                name:state.info.username,
                phone:state.info.phone,
                role:userRole,
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
        setUserRole(state.info.role== "個人" ? 0:1 );
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