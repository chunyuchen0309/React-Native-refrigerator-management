import React, { useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input, Text,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";

//import { Swipeable } from "react-native-gesture-handler/Swipeable";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./ItemBox";



const SharedListScreen=()=>{
    console.log("SharedListScreen");
    const {token}=useContext(AuthContext);
    const [isLoading,setIsLoading]=useState(false);
    const [userList,setUserList]=useState([{username:'owen'},{username:'kevin'},{username:'tom'}]);
    const [requestUserList,setRequestUserList]=useState([]);
    const navigation=useNavigation();
    const closeSwipeable = useRef(null);
    useEffect(()=>{
        getAccount();
    },[]);

    const getAccount=()=>{
        setIsLoading(true);
        //console.log(username+" and "+accountName+" and "+token.token);
        axios({
            method:"GET",
            url:`${BASE_URL}/auth/getAccount`,
            headers: {'Authorization': token.token},
        }).then(res=>{
            console.log(res.data);
            setUserList(res.data.userList);
            setRequestUserList(res.data.requestUserList);
            //console.log("使用者帳號(up):"+res.data);
        }).catch(e=>{
            console.log(`getAccount error ${e}`);

        }).finally(()=>{
            //navigation.goBack();
        });        
    }

    const deleteItem = (index) => { //回調函數
        //console.log("刪除call")
        console.log(userList[index]);
        const arr = [...userList];
        arr.splice(index, 1);
        setUserList(arr);
      };


    

    return (
        <SafeAreaView style={Userstyle.safeAreaView}>
            <Text style={Userstyle.list_outTitle}>
                共享使用者
            </Text>
            <View style={Userstyle.towList}>
                <FlashList
                    data={userList}
                    estimatedItemSize={50}
                    renderItem={({item,index})=>(
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
                    renderItem={({item})=>(
                        <ItemBox data={item}/>
                        )}
                    />
            </View>
        </SafeAreaView>
    );
};


export default SharedListScreen;