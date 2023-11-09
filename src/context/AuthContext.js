import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { getUserInfo, getUserToken, removeUserInfo, removeUserToken, setUserToken, setlogOut } from "../store/userSlice";
import { removeRepiceInfo } from "../store/repiceSlice";
import { removeFoodInfo } from "../store/foodSlice";
import { removeRefInfo } from "../store/refSlice";
import * as RootNavigation from '../components/RootNavigation';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [netConnect, setNetConnect] = useState(true);
    const [netState, setNetState] = useState();
    const [lookModel, setLookModel] = useState();
    const [isLogin, setIslogin] = useState(false);
    const dispatch = useDispatch();

    // Subscribeset
    NetInfo.fetch().then(state => {
        //console.log("Connection type", state.type);
        //console.log("Is connected?", state.isConnected);
        setNetState(state.isConnected);
    });

    const changeModel = async (val) => {
        //console.log("Auth傳入的目前模式",val)
        await AsyncStorage.setItem('lookModel', JSON.stringify(val)); //轉json存入
        //console.log("資料庫的目前模式",JSON.parse(await AsyncStorage.getItem('lookModel')))
        setLookModel(val);
    }
    /**
     * 登入API
     * @param {*} email 
     * @param {*} password 
     */
    const login = (email, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/account/auth/login`, {
            email,
            password,
        }).then(async res => {
            await dispatch(setUserToken(res.data.token));
            await dispatch(getUserInfo());
            await AsyncStorage.setItem('isLogin', JSON.stringify(true));
            setIsLoading(false);
            setIslogin(true);
            //RootNavigation.navigate('Home');
            
        }).catch(async e => {
            Alert.alert("帳號或密碼錯誤");
            console.log(`login error ${e}`);
            setIsLoading(false);
        });
    }
    /**
     * 註冊API
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     * @param {*} phone 
     * @param {*} role 
     */
    const register = (name, email, password, phone,role) => {
        setIsLoading(true);
        console.log({name, email, password, phone,role});
        axios({
            method: "POST",
            url: `${BASE_URL}/account/auth/signup`,
            data: {
                "name": name,
                "email": email,
                "password":password,
                "phone":phone,
                "role":role,
            },
        }).then(async res => {
            console.log("註冊成功",res.data);
            await dispatch(setUserToken(res.data.token));
            await dispatch(getUserInfo());
            await AsyncStorage.setItem('isLogin', JSON.stringify(true));
            setIsLoading(false);
            setIslogin(true);
            //RootNavigation.navigate('Home');
        }).catch(e => {
            console.log(`register error${e}`);
            setIsLoading(false);
        });
    }
    /**
     * 登出，並清除本地暫存資料
     */
    const logout = async () => {
        console.log('logout');
        await dispatch(removeUserToken()); //token&UserInfo請除
        await dispatch(removeFoodInfo()); //食物列表清除
        await dispatch(removeRefInfo()); //冰箱列表清除
        await dispatch(removeUserInfo()); //使用者資訊清除
        await dispatch(removeRepiceInfo());//食譜列表清除
        await AsyncStorage.removeItem('isLogin');
        setIsLoading(false);
        setIslogin(false);

    };
    /**
     * 登入時載入token以及個人資料
     */
    const isLoggedIn = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("isLoggedIn 再次取值")
                setIsLoading(true);
                let token = JSON.parse(await AsyncStorage.getItem('token'));
                let userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
                let model = JSON.parse(await AsyncStorage.getItem('lookModel'));
                if (model === false || model === true) {
                    setLookModel(model);
                }
                if (token) {
                    await dispatch(getUserToken());
                }
                if (userInfo) {
                    await dispatch(getUserInfo());
                }
                resolve("再次登入成功");
            } catch (e) {
                reject(e);
                console.log(e);
            }
        }).then(async (result) => {
            console.log('Success:', result);
            let isLoginTemp = JSON.parse(await AsyncStorage.getItem('isLogin'));
            if (isLoginTemp) {
                setIslogin(isLoginTemp);
            }
            setIsLoading(false)
        });
    };

    useEffect(() => {
        isLoggedIn();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                token,
                splashLoading,
                lookModel,
                isLogin,
                register,
                login,
                logout,
                setIsLoading,
                changeModel,
            }}>

            {children}
        </AuthContext.Provider>
    );
};