import React, { Component, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {  useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../assets/stepBarColor";

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
        accessible={true}
        accessibilityLabel="建立冰箱按鈕"
        title="建立冰箱"
        onPress={
            ()=>navigation.navigate('Step1',)
        }>
            
        </Button>
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