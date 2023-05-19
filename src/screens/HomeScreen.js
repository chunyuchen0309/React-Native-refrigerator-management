import React, { Component, useCallback, useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {  useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";

import messaging from '@react-native-firebase/messaging';

const wait = (timeout) => {// 設定refresh time
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const HomeScreen =()=>{
    
    const {userInfo,isLoading,logout}=useContext(AuthContext);
    const navigation=useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const isFocused=useIsFocused();

    const getFCMToken = async () => {
        console.log("getFCMToken");
        try {
          const token = await messaging().getToken();
          console.log(token);
        } catch (e) {
          console.log(e);
        }
      };
    const onRefresh =useCallback(()=>{ // 避免不必要的渲染使用
        setRefreshing(true);
        wait(1000).then(()=>{
            setRefreshing(false);
            
        });
    
        
    },[]);
    
    
    console.log("home123");
    //console.log("home")
        return(
        
        <SafeAreaView style={styles.sa}>
        <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        scrollsToTop={true}
        >
        <Text>Welcome {userInfo.user}</Text>
        <Button 
                title="fcmtoken"
                buttonStyle={{       
                    backgroundColor: "#919191",
                    borderRadius: 5,
                }}
                containerStyle={{
                    height: 40,
                    width: 120,
                    marginHorizontal: 30,
                    marginVertical: 10,
                }}
                titleStyle={{ marginHorizontal: 10, color: 'black' ,fontWeight:"bold"}}

                onPress={()=>getFCMToken()}
                />  
        <Button 
                title="Qrcode"
                loading={isLoading}
                buttonStyle={{       
                    backgroundColor: "#919191",
                    borderRadius: 5,
                }}
                containerStyle={{
                    height: 40,
                    width: 120,
                    marginHorizontal: 30,
                    marginVertical: 10,
                }}
                titleStyle={{ marginHorizontal: 10, color: 'black' ,fontWeight:"bold"}}
                onPress={()=>navigation.navigate('Qrcode',{title:"Qrcode"})}
                />
            <Button 
                title="Logout"
                loading={isLoading}
                buttonStyle={{       
                    backgroundColor: "#919191",
                    borderRadius: 5,
                }}
                containerStyle={{
                    height: 40,
                    width: 120,
                    marginHorizontal: 30,
                    marginVertical: 10,
                }}
                titleStyle={{ marginHorizontal: 10, color: 'black' ,fontWeight:"bold"}}

                onPress={logout}
                />
            </ScrollView>
            


            
        </SafeAreaView>
        
    );
};
const styles = StyleSheet.create({

    sa:{
        flex:1,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    twoButton:{
        //flexDirection:'row', //水平排列
        //flexWrap:'nowrap',
        alignSelf:'center',
        //justifyContent:'space-around',
        
    },

});
export default HomeScreen;