import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext= createContext();

export const AuthProvider =({children})=>{
    const [userInfo,setUserInfo]=useState({});
    const [isLoading,setIsLoading]=useState(false);
    const [splashLoading,setSplashLoading]= useState(false);

    const login =(email,password)=>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/auth/login`,{
            email,
            password,
        }).then(res=>{
            setIsLoading(false);
            let userInfo=res.data;
            console.log(userInfo);
            console.log(res.status);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            
        }).catch(e=>{
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
        
    }

    const register =(name,email,password,phone,role)=>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/auth/signup`,{
        name,email,password,phone,role
        

        }).then(res=>{
            let userInfo=res.data
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            
            console.log(userInfo);
            setIsLoading(false);
        }).catch(e=>{
            
            console.log(`register error${e}`);
            setIsLoading(false);
        });
        //setIsLoading(false);
    };

    const logout =()=>{
        //setIsLoading(true);

        
            //console.log(res.data);
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false);
        
        //setIsLoading(false);
    };

    const isLoggedIn=async ()=>{
        try{
            //setSplashLoading(true);
            let userInfo =await AsyncStorage.getItem('userInfo')
            userInfo=JSON.parse(userInfo);

            if(userInfo){
                setUserInfo(userInfo);
            };

            //setSplashLoading(false);
        }catch(e){
            //setSplashLoading(false);
            console.log(`is logged in error ${e}`);

        }
    };

    useEffect(()=>{
        isLoggedIn();
    },[]);


    return(
        <AuthContext.Provider 
        value={{
          isLoading,
          userInfo,
          splashLoading,
          register,
          login,
          logout,
        }}>
        
        {children}
        </AuthContext.Provider>
    );
};