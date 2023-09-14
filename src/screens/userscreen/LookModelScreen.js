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

const LookModelScreenScreen=()=>{
    console.log("UpdateUserRoleScreen");
    const {token,lookModel,changeModel}=useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();
    const [userLookModel,setUserLookModel]=useState();
    const Update=()=>{
        changeModel(userLookModel);
        navigation.goBack();
    }
    useEffect(()=>{
        setUserLookModel(lookModel);
        console.log("當前狀態"+lookModel);
    },[lookModel]);
    
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                    <View style={[Userstyle.checkBoxView,{marginHorizontal:0,justifyContent:'center'}]}>
                        <CheckBox
                        //disabled={true}
                            checked={userLookModel==false}
                            onPress={()=>setUserLookModel(true)}
                            title="一般模式"
                            textStyle={{color:"#919191"}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare}  size={40} color="#919191"  />}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                        <CheckBox
                        //disabled={true}
                            checked={userLookModel}
                            onPress={()=>setUserLookModel(false)}
                            title="簡易模式"
                            textStyle={{color:"#919191"}}
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


export default LookModelScreenScreen;