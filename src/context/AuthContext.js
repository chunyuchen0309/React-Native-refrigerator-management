import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext= createContext();

export const AuthProvider =({children})=>{
    const [token,setToken]=useState({});
    const [isLoading,setIsLoading]=useState(false);
    const [splashLoading,setSplashLoading]= useState(false);

    const login =(email,password)=>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/auth/login`,{
            email,
            password,
        }).then(res=>{
            setIsLoading(false);
            let token=res.data;
            console.log(token);
            //console.log(res.status);
            setToken(token);
            AsyncStorage.setItem('token',JSON.stringify(token));
            
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
            let token=res.data
            setToken(token);
            AsyncStorage.setItem('token',JSON.stringify(token));
            
            console.log(token);
            setIsLoading(false);
        }).catch(e=>{
            
            console.log(`register error${e}`);
            setIsLoading(false);
        });
        //setIsLoading(false);
    };

    const logout =()=>{
        //setIsLoading(true);   
            console.log('logout');
            AsyncStorage.removeItem('token');
            setToken({});
            setIsLoading(false);
    };

    const isLoggedIn=async ()=>{
        try{
            //setSplashLoading(true);
            let token =await AsyncStorage.getItem('token')
            token=JSON.parse(token);
            console.log("isloggedin:"+token.token);
            if(token){
                setToken(token);
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
          token,
          splashLoading,
          register,
          login,
          logout,
        }}>
        
        {children}
        </AuthContext.Provider>
    );
};