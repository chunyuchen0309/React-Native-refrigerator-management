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

const UpdateUserRoleScreen=()=>{
    console.log("UpdateUserRoleScreen");
    const [userRole,setUserRole]=useState("");
    const [userInfo,setUserInfo]=useState("");
    const route = useRoute();
    const {token}=useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(false);
    const navigation=useNavigation();

    const Update=()=>{
        setIsLoading(true);
        //console.log(userRole+" and "+accountRole+" and "+token.token);

        axios({
            method:"PUT",
            url:`${BASE_URL}/auth/modify`,
            headers: {'Authorization': token.token},
            data:{
                name:userInfo.username,
                phone:userInfo.phone,
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
        setUserInfo(route.params?.userInfo);
        setUserRole(route.params?.userInfo.role);
    },[]);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                    <View style={Userstyle.checkBoxView}>
                        <CheckBox
                        disabled={true}
                            checked={userRole == 1}
                            onPress={()=>setUserRole(0)}
                            title="個人"
                            textStyle={{color:"#919191"}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare}  size={40} color="#919191"  />}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                        <CheckBox
                        disabled={true}
                            checked={userRole == 0}
                            onPress={()=>setUserRole(1)}
                            title="商業"
                            textStyle={{color:"#919191"}}
                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',}}
                            checkedIcon={<FontAwesomeIcon icon={faSquare} size={40} color="#919191"/>}
                            uncheckedIcon={<FontAwesomeIcon icon={faSquareCheck} size={40} color="#F49F0C"/>}
                        />
                    </View>                 
                        
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};


export default UpdateUserRoleScreen;