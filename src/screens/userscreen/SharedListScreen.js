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
import { getSharedList } from "../../store/userSlice";



const SharedListScreen = () => {
    
    const state = useSelector(state => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [requestUserList, setRequestUserList] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(state.sharedList){
            setUserList(state.sharedList.userList);
            setRequestUserList(state.sharedList.requestUserList);
        }
        
    }, [state.sharedList?.userList,state.sharedList?.requestUserList]);

    const agreeAccount = (index) => {  //同意申請
        console.log("agreeAccount_up");
        axios({
            method: "PUT",
            url: `${BASE_URL}/account/account/request/handle`,
            headers: { 'Authorization': state.token },
            data: {
                targetName: requestUserList[index].name,
                targetEmail: requestUserList[index].email,
                targetPhone: requestUserList[index].phone,
                status: true,
            },
        }).then(res => {
            console.log("同意申請成功",res.data);
            dispatch(getSharedList());
        }).catch(e => {
            console.log(`getAccount error ${e}`);
        }).finally(() => {
            //navigation.goBack();
        });
    }
    const deleteAccount = (index) => { //刪除共用
        console.log("deleteAccount_up",userList[index].name,userList[index].email,userList[index].phone);
        axios({
            method: "PUT",
            url: `${BASE_URL}/account/account/shared/delete`,
            headers: { 'Authorization': state.token },
            data: {
                name: userList[index].name,
                email: userList[index].email,
                phone: userList[index].phone,
            },
        }).then(res => {
            dispatch(getSharedList());
            console.log("刪除成功",res.data);
        }).catch(function (error){
            console.log(error);
        }).finally(() => {
            //navigation.goBack();
        });
    }


    const deleteItem = (index) => { //回調函數
        //console.log("刪除call")
        Alert.alert(
            "帳戶訊息",
            `名稱:${userList[index].name}\n 
            電話號碼: ${userList[index].phone}\n
            郵件: ${userList[index].email}`,
            [
                { text: "取消", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "刪除", onPress: () => deleteAccount(index), style: 'destructive' }
            ]
        )
    };

    const agreeItem = (index) => {
        Alert.alert(
            "申請訊息",
            `名稱:${requestUserList[index].name}\n 
            電話號碼: ${requestUserList[index].phone}\n
            郵件: ${requestUserList[index].email}`,
            [
                { text: "取消", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "同意", onPress: () => agreeAccount(index), style: 'destructive' }
            ]
        )
    }




    return (
        <SafeAreaView style={Userstyle.safeAreaView}>

            <Text style={Userstyle.list_outTitle}>
                個人共享使用者
            </Text>
            <View style={[Userstyle.towList,{height:moderateScale(250),}]}>
                <FlashList
                    data={userList}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無用戶資料</Text>}
                    estimatedItemSize={50}
                    renderItem={({ item, index }) => (
                        <ItemBox data={item} handleDelete={() => deleteItem(index)}

                        />
                    )}
                />
            </View>
            <Text style={Userstyle.list_outTitle}>
                申請加入
            </Text>
            <View style={[Userstyle.towList,{height:moderateScale(250),}]}>
                <FlashList
                    data={requestUserList}
                    estimatedItemSize={50}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無用戶資料</Text>}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => agreeItem(index)}>
                            <View style={[Userstyle.listButton,{height:moderateScale(45),}]}>
                                <Text style={[Userstyle.listTitle,{fontSize:moderateScale(23),lineHeight:moderateScale(35),fontWeight:'500',color:"#777",}]}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>

                    )}
                />
            </View>
        </SafeAreaView>
    );
};


export default SharedListScreen;