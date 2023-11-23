import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text, } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";

//import { Swipeable } from "react-native-gesture-handler/Swipeable";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./ItemBox";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale } from "../ScaleMethod";
import { getBusinessSharedList, getSharedList } from "../../store/userSlice";
import ItemBusinessBox from "./ItemBusinessBox";



const SharedBusinessListScreen = () => {

    const state = useSelector(state => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [requestUserList, setRequestUserList] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {

        setUserList(state.businessSharedList);
        setRequestUserList(state.businessSharedRequestList);


    }, [state.businessSharedList, state.businessSharedRequestList]);

    const agreeAccount = (index) => {  //同意申請
        console.log("agreeAccount_up");
        axios({
            method: "PUT",
            url: `${BASE_URL}/account/account/business/request`,
            headers: { 'Authorization': state.token },
            data: {
                "request_id": requestUserList[index].request_id,
                "response": true
            },
        }).then(res => {
            console.log("同意申請成功", res.data);
            dispatch(getBusinessSharedList());
        }).catch(e => {
            console.log(`getAccount error ${e}`);
        }).finally(() => {
            //navigation.goBack();
        });
    }
    const deleteAccount = (index) => { //刪除共用
        console.log("deleteAccount_up", userList[index].name, userList[index].email, userList[index].phone);
        axios({
            method: "DELETE",
            url: `${BASE_URL}/account/account/business`,
            headers: { 'Authorization': state.token },
            data: {
                "member_email": userList[index].request_user_email,
            },
        }).then(res => {
            dispatch(getBusinessSharedList());
            console.log("刪除成功", res.data);
        }).catch(function (error) {
            console.log(error);
        }).finally(() => {
            //navigation.goBack();
        });
    }


    const deleteItem = (index) => { //回調函數
        //console.log("刪除call")
        Alert.alert(
            "帳戶訊息",
            `名稱:${userList[index].request_user_name}\n 
            郵件: ${userList[index].request_user_email}`,
            [
                { text: "取消", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "刪除", onPress: () => deleteAccount(index), style: 'destructive' }
            ]
        )
    };

    const agreeItem = (index) => {
        Alert.alert(
            "申請訊息",
            `名稱:${requestUserList[index].request_user_name}\n 
            郵件: ${requestUserList[index].request_user_email}`,
            [
                { text: "取消", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "同意", onPress: () => agreeAccount(index), style: 'destructive' }
            ]
        )
    }




    return (
        <SafeAreaView style={Userstyle.safeAreaView}>
            {state.businessOwner == "" ?
                <>
                    <Text style={Userstyle.list_outTitle}>
                        商業共享使用者
                    </Text>
                    <View style={[Userstyle.towList, { height: moderateScale(250), }]}>
                        <FlashList
                            data={userList}
                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無用戶資料</Text>}
                            estimatedItemSize={50}
                            renderItem={({ item, index }) => (
                                <ItemBusinessBox data={item} handleDelete={() => deleteItem(index)}

                                />
                            )}
                        />
                    </View>
                    <Text style={Userstyle.list_outTitle}>
                        申請加入
                    </Text>
                    <View style={[Userstyle.towList, { height: moderateScale(250), }]}>
                        <FlashList
                            data={requestUserList}
                            estimatedItemSize={50}
                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無用戶資料</Text>}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => agreeItem(index)}>
                                    <View style={[Userstyle.listButton, { height: moderateScale(45), }]}>
                                        <Text style={[Userstyle.listTitle,{fontSize:moderateScale(23),lineHeight:moderateScale(35),fontWeight:'500',color:"#777",}]}>
                                            {item.request_user_name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            )}
                        />
                    </View>
                </> : <>
                    <Text style={Userstyle.list_outTitle}>
                        商業帳號共享擁有者
                    </Text>
                    <View style={[Userstyle.towList, { height: moderateScale(250), }]}>
                        <FlashList
                            data={[state.businessOwner]}
                            estimatedItemSize={50}
                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無用戶資料</Text>}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity>
                                    <View style={[Userstyle.listButton, { height: moderateScale(45), }]}>
                                        <Text style={[Userstyle.listTitle,{fontSize:moderateScale(23),lineHeight:moderateScale(35),fontWeight:'500',color:"#777",}]}>
                                            {item}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            )}
                        />
                    </View>
                </>}

        </SafeAreaView>
    );
};


export default SharedBusinessListScreen;