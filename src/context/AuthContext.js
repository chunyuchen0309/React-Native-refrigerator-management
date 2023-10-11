import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { getUserInfo, getUserToken, removeUserToken, setUserToken, setlogOut } from "../store/userSlice";
import { clearFoodList, removeFoodInfo } from "../store/foodSlice";
import { clearRefList, removeRefInfo } from "../store/refSlice";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [foodInfo, setFoodInfo] = useState({});
    const [netConnect, setNetConnect] = useState(true);
    const [refInfo, setRefInfo] = useState([]);
    const [netState, setNetState] = useState();
    const [foodInfoExpire, setFoodInfoExpire] = useState({});
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


    const getUserInfoMethod = () => {
        console.log("獲得用戶資訊");
        let isAlertShown = false;
        axios.get(`${BASE_URL}/auth/getInfo`, {
            headers: {
                'Authorization': token.token
            }
        }).then(async res => {
            res.data.role = res.data.role == "0" ? '個人' : '商業';
            //console.log(res.data);
            await AsyncStorage.setItem('userInfo', JSON.stringify(res.data)); //轉json存入
            //console.log("auth storage : "+JSON.stringify(data));
            setUserInfo(JSON.parse(await AsyncStorage.getItem('userInfo')));
            //轉為js取出並回傳至userScreen
            setIsLoading(false);
        }).catch(async e => {
            setUserInfo(JSON.parse(await AsyncStorage.getItem('userInfo')));
            console.log(`getUserInfo error ${e}`);
            //Alert.alert("請連接網路以便更新資料");  
            setIsLoading(false);
        });
    }
    /**
     * 存入食物資料
     * @param {*} data 
     * @returns 食物訊息[]
     */
    const getFoodInfoMethod = async () => {
        console.log("開始獲取食物列表資訊");
        if (netState) {
            axios.get(`${BASE_URL}/storage/item`, {
                headers: {
                    'Authorization': token.token
                }
            }).then(async res => {
                console.log(res.data);
                await AsyncStorage.setItem('foodInfo', JSON.stringify(res.data)); //轉json存入
                //console.log("food storage : "+JSON.stringify(res.data));
                //setFoodInfo(JSON.parse(await AsyncStorage.getItem('foodInfo')));
                calculateDate();
                setIsLoading(false);
            }).catch(async e => {
                //setFoodInfo(JSON.parse(await AsyncStorage.getItem('foodInfo'))); 
                console.log(`getFoodInfo error ${e}`);
                if (JSON.parse(await AsyncStorage.getItem('foodInfo'))) {
                    calculateDate();
                }
                //Alert.alert("請連接網路以便更新資料");                       
                setIsLoading(false);
            });
        } else {
            console.log("無網路連線");
            if (JSON.parse(await AsyncStorage.getItem('foodInfo'))) {
                calculateDate();
            }
            //Alert.alert("請連接網路以便更新資料");                       
            setIsLoading(false);
        }
        //let isAlertShown = false;
    }
    /**
     * 計算過期日期
     */
    const calculateDate = async () => {
        //console.log("開始計算");
        var tempFoodList = JSON.parse(await AsyncStorage.getItem('foodInfo'));
        //console.log("本地食物資訊",tempFoodList);
        var localDate = new Date();
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1; // 月份從0開始，需要加1
        const day = localDate.getDate();
        localDate = `${year}-${month}-${day}`;
        //console.log("localDate",localDate);
        if (tempFoodList) {
            var TempExpirePlus = 0;
            var TempExpireMinus = 0;
            for (let i = 0; i < tempFoodList.length; i++) {
                if (tempFoodList[i].expired_date) {
                    //console.log("每個位置的日期",foodInfo[i].expired_date);            
                    const inputDate = tempFoodList[i].expired_date;
                    const formattedDate = inputDate.replace(/\//g, '-');
                    const day_2 = new Date(formattedDate);
                    const day_1 = new Date(localDate);
                    var diffTime = Math.abs(day_2.getTime() - day_1.getTime());
                    if (day_2.getTime() - day_1.getTime() < 0) {
                        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) * -1;
                        TempExpireMinus++
                    } else {
                        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        diffDays < 4 ? TempExpirePlus++ : null;
                    }
                    tempFoodList[i].day = diffDays;
                }
            }
        }
        //setFoodInfo(tempFoodList);
        //setFoodInfoExpire({"Plus":TempExpirePlus,"Minus":TempExpireMinus});
        setFoodInfo(
            [{
                ingredient_id: '7cebce8f-bd1a-478b-86ab-c1afc6879b2a',
                ingredient_orignal_name: '蘋果',
                ingredient_custom_name: '',
                expired_date: '2023/8/26',
                calculator_expired_date: '2023/8/26',
                category_name: '水果',
                category_id: '3ec0a82a-2661-4e6b-a2ff-3412c2407307',
                day: -20
            },
            {
                ingredient_id: '7cebce8f-bd1a-478b-86ab-c1afc6879b2a',
                ingredient_orignal_name: '番茄',
                ingredient_custom_name: '',
                expired_date: '2023/9/15',
                calculator_expired_date: '2023/9/15',
                category_name: '水果',
                category_id: '3ec0a82a-2661-4e6b-a2ff-3412c2407307',
                day: 0
            },
            {
                ingredient_id: 'af53dfd7-b0ff-4257-9eb6-147a8591588b',
                ingredient_orignal_name: '芝士起司',
                ingredient_custom_name: '',
                expired_date: '2024/8/02',
                calculator_expired_date: '2024/8/02',
                category_name: '奶製品',
                category_id: '9b7491dd-8ff7-4da5-9b7d-3b1a53d6d4f1',
                day: 322
            },
            {
                ingredient_id: 'fbc396d7-7296-4cad-bc22-8ab3c0416f6f',
                ingredient_orignal_name: '花枝丸',
                ingredient_custom_name: '',
                expired_date: '2023/9/01',
                calculator_expired_date: '2023/9/01',
                category_name: '加工食品',
                category_id: 'b014bd14-6f5e-46d0-a166-80dbf0a15740',
                day: -14
            },
            {
                ingredient_id: '4807df05-7919-40f6-b0b0-e9363c91bcb2',
                ingredient_orignal_name: '草莓果醬',
                ingredient_custom_name: '',
                expired_date: '2024/5/22',
                calculator_expired_date: '2024/5/22',
                category_name: '加工食品',
                category_id: 'b014bd14-6f5e-46d0-a166-80dbf0a15740',
                day: 250
            },
            {
                ingredient_id: 'e79aeb16-3fc4-4275-82ea-407fad4c0ea7',
                ingredient_orignal_name: '鳳梨',
                ingredient_custom_name: '',
                expired_date: '2023/8/30',
                calculator_expired_date: '2023/8/30',
                category_name: '水果',
                category_id: '3ec0a82a-2661-4e6b-a2ff-3412c2407307',
                day: -16
            },
            {
                ingredient_id: 'b1655144-c5b0-4ba1-9531-be4e161e072e',
                ingredient_orignal_name: '豬五花',
                ingredient_custom_name: '',
                expired_date: '2023/8/25',
                calculator_expired_date: '2023/8/25',
                category_name: '肉',
                category_id: '50164000-6332-4b8e-bda4-50a7d0392e1b',
                day: -21
            },
            {
                ingredient_id: 'b1655144-c5b0-4ba1-9531-be4e161e072e',
                ingredient_orignal_name: '沙朗牛排',
                ingredient_custom_name: '',
                expired_date: '2023/9/16',
                calculator_expired_date: '2023/9/16',
                category_name: '肉',
                category_id: '50164000-6332-4b8e-bda4-50a7d0392e1b',
                day: 1
            },
            {
                ingredient_id: 'b1655144-c5b0-4ba1-9531-be4e161e072e',
                ingredient_orignal_name: '菲力牛排',
                ingredient_custom_name: '',
                expired_date: '2023/9/16',
                calculator_expired_date: '2023/9/16',
                category_name: '肉',
                category_id: '50164000-6332-4b8e-bda4-50a7d0392e1b',
                day: 1
            },
            {
                ingredient_id: '945433e5-5512-4f66-bf54-f9f929eb752c',
                ingredient_orignal_name: '大陸妹',
                ingredient_custom_name: '',
                expired_date: '2023/9/02',
                calculator_expired_date: '2023/9/02',
                category_name: '蔬菜',
                category_id: 'b9db4f16-8eb5-4de7-b028-739df646e9af',
                day: -13
            },
            {
                ingredient_id: '945433e5-5512-4f66-bf54-f9f929eb752c',
                ingredient_orignal_name: '花椰菜',
                ingredient_custom_name: '',
                expired_date: '2023/9/17',
                calculator_expired_date: '2023/9/17',
                category_name: '蔬菜',
                category_id: 'b9db4f16-8eb5-4de7-b028-739df646e9af',
                day: 2
            },
            {
                ingredient_id: 'd0bf4e3d-40dd-4f18-af70-03d727cf283f',
                ingredient_orignal_name: '牛奶',
                ingredient_custom_name: '',
                expired_date: '2023/9/11',
                calculator_expired_date: '2023/9/11',
                category_name: '奶製品',
                category_id: '9b7491dd-8ff7-4da5-9b7d-3b1a53d6d4f1',
                day: -4
            },
            {
                ingredient_id: '50d94660-4254-4f51-8519-9c5b43d3b210',
                ingredient_orignal_name: '香腸',
                ingredient_custom_name: '',
                expired_date: '2023/8/31',
                calculator_expired_date: '2023/8/31',
                category_name: '加工食品',
                category_id: 'b014bd14-6f5e-46d0-a166-80dbf0a15740',
                day: -15
            },
            {
                ingredient_id: '50d94660-4254-4f51-8519-9c5b43d3b210',
                ingredient_orignal_name: '培根',
                ingredient_custom_name: '',
                expired_date: '2023/9/18',
                calculator_expired_date: '2023/9/18',
                category_name: '加工食品',
                category_id: 'b014bd14-6f5e-46d0-a166-80dbf0a15740',
                day: 3
            },
            {
                ingredient_id: 'cc3e5ff7-73fd-4b96-b5a0-9008d9b88593',
                ingredient_orignal_name: '高麗菜',
                ingredient_custom_name: '',
                expired_date: '2023/8/24',
                calculator_expired_date: '2023/8/24',
                category_name: '蔬菜',
                category_id: 'b9db4f16-8eb5-4de7-b028-739df646e9af',
                day: -22
            },
            {
                ingredient_id: 'e7526054-7f64-4cfe-a662-9b0b6a00a846',
                ingredient_orignal_name: '蝦仁',
                ingredient_custom_name: '',
                expired_date: '2023/8/23',
                calculator_expired_date: '2023/8/23',
                category_name: '海鮮',
                category_id: 'cc1b00f1-d6c1-47dd-954d-c5d8613ec288',
                day: -23
            },
            {
                ingredient_id: 'bc6c82c1-ef6e-4bdf-acb3-26104ac2a882',
                ingredient_orignal_name: '冰淇淋',
                ingredient_custom_name: '',
                expired_date: '2023/12/01',
                calculator_expired_date: '2023/12/01',
                category_name: '冰品',
                category_id: 'f30cb1da-9482-4f74-a8d6-756158468a7f',
                day: 77
            },
            {
                ingredient_id: '62db3264-c25d-481f-825d-74179836fe16',
                ingredient_orignal_name: '紅豆冰棒',
                ingredient_custom_name: '',
                expired_date: '2023/8/20',
                calculator_expired_date: '2023/8/20',
                category_name: '冰品',
                category_id: 'f30cb1da-9482-4f74-a8d6-756158468a7f',
                day: -26
            }]);

        console.log("計算過日期後的全部食物資料列表", tempFoodList);
        setFoodInfoExpire({ "Plus": 5, "Minus": 10 });
    }
    /**
     * 取得冰箱內部分層API
     */
    const getRefInfoMethod = () => {
        axios.get(`${BASE_URL}/storage/refrigerator/info`, {
            headers: {
                'Authorization': token.token
            }
        }).then(async res => {
            //await AsyncStorage.setItem('refInfo',JSON.stringify(res.data.refrigeratorList));
            await AsyncStorage.setItem('refInfo', JSON.stringify(
                [{
                    refrigerator_name: 'Kevin_ref',
                    firstType: 'freezer',
                    freezerCount: 2,
                    coolerCount: 4,
                    freshCount: 0,
                    iceCount: 0,
                    freezerDoorCount: 3,
                    coolerDoorCount: 2,
                    freshDoorCount: 0,
                    iceDoorCount: 0,
                    freezerContainer: 4,
                    coolerContainer: 6,
                    freshContainer: 0,
                    iceContainer: 0
                }, {
                    refrigerator_name: 'Kevin_ref_test',
                    firstType: 'cooler',
                    freezerCount: 3,
                    coolerCount: 2,
                    freshCount: 0,
                    iceCount: 0,
                    freezerDoorCount: 1,
                    coolerDoorCount: 4,
                    freshDoorCount: 0,
                    iceDoorCount: 0,
                    freezerContainer: 4,
                    coolerContainer: 6,
                    freshContainer: 0,
                    iceContainer: 0
                }]));
            setRefInfo(JSON.parse(await AsyncStorage.getItem('refInfo')));
            console.log("冰箱內部分層陣列", JSON.parse(await AsyncStorage.getItem('refInfo')));
        }).catch(async e => {
            console.log(`getRefInfo error ${e}`);
            await AsyncStorage.setItem('refInfo', JSON.stringify(
                [{
                    refrigerator_name: 'Kevin_ref',
                    firstType: 'freezer',
                    freezerCount: 2,
                    coolerCount: 4,
                    freshCount: 0,
                    iceCount: 0,
                    freezerDoorCount: 3,
                    coolerDoorCount: 2,
                    freshDoorCount: 0,
                    iceDoorCount: 0,
                    freezerContainer: 4,
                    coolerContainer: 6,
                    freshContainer: 0,
                    iceContainer: 0
                }, {
                    refrigerator_name: 'Kevin_ref_test',
                    firstType: 'cooler',
                    freezerCount: 3,
                    coolerCount: 2,
                    freshCount: 0,
                    iceCount: 0,
                    freezerDoorCount: 1,
                    coolerDoorCount: 4,
                    freshDoorCount: 0,
                    iceDoorCount: 0,
                    freezerContainer: 4,
                    coolerContainer: 6,
                    freshContainer: 0,
                    iceContainer: 0
                }]));
            setRefInfo(JSON.parse(await AsyncStorage.getItem('refInfo')));
        }).finally(() => {
        }
        );
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
    const register = (name, email, password, phone, role) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/account/auth/signup`, {
            name, email, password, phone, role
        }).then(async res => {
            await dispatch(setUserToken(res.data.token));
            await dispatch(getUserInfo(res.data.token));
            await AsyncStorage.setItem('isLogin', JSON.stringify(true));
            setIsLoading(false);
            setIslogin(true);
            
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
        dispatch(removeUserToken()); //token&UserInfo請除
        dispatch(removeFoodInfo()); //食物列表清除
        dispatch(removeRefInfo()); //冰箱列表清除
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
                let token = await AsyncStorage.getItem('token');
                let userInfo = await AsyncStorage.getItem('userInfo');
                let model = await AsyncStorage.getItem('lookModel');
                let isLogin = await AsyncStorage.getItem('isLogin');
                token = JSON.parse(token);
                userInfo = JSON.parse(userInfo);
                model = JSON.parse(model);
                isLogin = JSON.parse(isLogin);
                if (model === false || model === true) {
                    setLookModel(model);
                }
                if (token) {
                    await dispatch(getUserToken());
                }
                if (userInfo) {
                    await dispatch(getUserInfo());
                }
                if (isLogin) {
                    await setIslogin(isLogin);
                }
                // 所有异步操作完成，解析 Promise
                setIsLoading(false)
                resolve();
            } catch (e) {
                // 处理错误，拒绝 Promise
                reject(e);
            }
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
                userInfo,
                foodInfo,
                refInfo,
                foodInfoExpire,
                lookModel,
                isLogin,
                register,
                login,
                logout,
                setIsLoading,
                getUserInfoMethod,
                getFoodInfoMethod,
                getRefInfoMethod,
                //setLookModel,
                changeModel,
            }}>

            {children}
        </AuthContext.Provider>
    );
};