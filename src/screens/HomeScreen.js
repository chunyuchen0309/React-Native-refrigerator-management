import React, { Component, useCallback, useContext, useEffect, useState } from "react";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {  useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";


const HomeScreen =()=>{
    
    const {isLoading}=useContext(AuthContext);
    const navigation=useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const isFocused=useIsFocused();

    const onRefresh =useCallback(()=>{ // 避免不必要的渲染使用
        setRefreshing(true);
            setRefreshing(false);   
    },[]);

    console.log("home");

        return(
        
        <SafeAreaView style={styles.sa}>
        <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        >
        <Button
        title="建立冰箱"
        onPress={
            ()=>navigation.navigate('Step1',)
        }>
            
        </Button>
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
                onPress={()=>navigation.navigate('Qrcode',{"json1":{"data":"abc","name":"owen"}})}
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
        alignSelf:'center',
    },
});

export default HomeScreen;