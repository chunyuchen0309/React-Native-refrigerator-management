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
import { useSelector } from "react-redux";



const SharedListScreen = () => {
    console.log("SharedListScreen");
    const state = useSelector(state => state.userInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [requestUserList, setRequestUserList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = () => { //初始載入資料
        axios({
            method: "GET",
            url: `${BASE_URL}/account/request`,
            headers: { 'Authorization': state.token },
        }).then(res => {
            console.log(res.data);
            setUserList(res.data.userList);
            setRequestUserList(res.data.requestUserList);
            //console.log("使用者帳號(up):"+res.data);
        }).catch(e => {
            console.log(`getAccount error ${e}`);

        }).finally(() => {
            //navigation.goBack();
        });
    }

    const agreeAccount = (index) => {  //同意申請
        console.log("agreeAccount_up");
        axios({
            method: "PUT",
            url: `${BASE_URL}/account/request/handle`,
            headers: { 'Authorization': state.token },
            data: {
                targetName: requestUserList[index].name,
                targetEmail: requestUserList[index].email,
                targetPhone: requestUserList[index].phone,
                status: true,
            },
        }).then(res => {
            console.log(res.data);
            getAccount();
        }).catch(e => {
            console.log(`getAccount error ${e}`);
        }).finally(() => {
            //navigation.goBack();
        });
    }
    const deleteAccount = (index) => { //刪除共用
        console.log("deleteAccount_up");
        axios({
            method: "PUT",
            url: `${BASE_URL}/account/shared/delete`,
            headers: { 'Authorization': state.token },
            data: {
                name: userList[index].name,
                email: userList[index].email,
                phone: userList[index].phone,
            },
        }).then(res => {
            console.log(res.data);
            getAccount();
        }).catch(e => {
            console.log(`error ${e}`);
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
                { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "Agree", onPress: () => deleteAccount(index), style: 'destructive' }
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
                { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "Agree", onPress: () => agreeAccount(index), style: 'destructive' }
            ]
        )
    }




    return (
        <SafeAreaView style={Userstyle.safeAreaView}>
            <Text style={Userstyle.list_outTitle}>
                共享使用者
            </Text>
            <View style={Userstyle.towList}>
                <FlashList
                    data={userList}
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
            <View style={Userstyle.towList}>
                <FlashList
                    data={requestUserList}
                    estimatedItemSize={50}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => agreeItem(index)}>
                            <View style={Userstyle.listButton}>
                                <Text style={Userstyle.listTitle}>
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