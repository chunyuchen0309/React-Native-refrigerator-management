import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
export const AuthContext= createContext();

export const AuthProvider =({children})=>{
    const [token,setToken]=useState({});
    const [isLoading,setIsLoading]=useState(false);
    const [splashLoading,setSplashLoading]= useState(false);
    const [userInfo,setUserInfo]=useState({});
    const [foodInfo,setFoodInfo]=useState({});
    const [netConnect,setNetConnect]=useState(true);
    const [refInfo,setRefInfo]=useState([]);
    const [netState,setNetState]=useState();
    const [foodInfoExpire,setFoodInfoExpire]=useState({});
    const [lookModel,setLookModel]=useState();
    // Subscribeset
    
    /**
     * 存入個人資料API至本地暫存
     */

    NetInfo.fetch().then(state => {
        //console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setNetState(state.isConnected);
      });
    
    const changeModel=async(val)=>{
        console.log("Auth傳入的目前模式",val)
        await AsyncStorage.setItem('lookModel',JSON.stringify(val)); //轉json存入
        console.log("資料庫的目前模式",JSON.parse(await AsyncStorage.getItem('lookModel')))
        setLookModel(val);
    }

    
    const getUserInfoMethod =()=>{    
        console.log("獲得用戶資訊");
        let isAlertShown = false;
        axios.get(`${BASE_URL}/auth/getInfo`,{
            headers: {
                'Authorization': token.token
              }
        }).then(async res=>{
            
            res.data.role= res.data.role == "0" ? '個人' : '商業'; 
            //console.log(res.data);
            await AsyncStorage.setItem('userInfo',JSON.stringify(res.data)); //轉json存入
            //console.log("auth storage : "+JSON.stringify(data));
            setUserInfo(JSON.parse(await AsyncStorage.getItem('userInfo')));
            //轉為js取出並回傳至userScreen
            setIsLoading(false); 
        }).catch(async e=>{
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
    const getFoodInfoMethod =async ()=>{
        console.log("開始獲取食物列表資訊");
        if(netState){
            axios.get(`${BASE_URL}/storage/item`,{
                headers: {
                    'Authorization': token.token
                  }
            }).then(async res=>{
                console.log(res.data);
                await AsyncStorage.setItem('foodInfo',JSON.stringify(res.data)); //轉json存入
                //console.log("food storage : "+JSON.stringify(res.data));
                //setFoodInfo(JSON.parse(await AsyncStorage.getItem('foodInfo')));
                calculateDate();
                setIsLoading(false); 
            }).catch(async e=>{
                //setFoodInfo(JSON.parse(await AsyncStorage.getItem('foodInfo'))); 
                console.log(`getFoodInfo error ${e}`);
                if(JSON.parse(await AsyncStorage.getItem('foodInfo'))){
                    calculateDate();
                }
                //Alert.alert("請連接網路以便更新資料");                       
                setIsLoading(false);
            });
        }else{
            console.log("無網路連線");
            if(JSON.parse(await AsyncStorage.getItem('foodInfo'))){
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
    const calculateDate=async()=>{
        //console.log("開始計算");
        var tempFoodList =JSON.parse(await AsyncStorage.getItem('foodInfo'));
        //console.log("本地食物資訊",tempFoodList);
        var localDate = new Date();
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1; // 月份從0開始，需要加1
        const day = localDate.getDate();
        localDate = `${year}-${month}-${day}`;       
        //console.log("localDate",localDate);
        if(tempFoodList){
            var TempExpirePlus=0;
            var TempExpireMinus=0;
            for(let i=0;i<tempFoodList.length;i++){
                if(tempFoodList[i].expired_date){
                    //console.log("每個位置的日期",foodInfo[i].expired_date);
                    
                    const inputDate = tempFoodList[i].expired_date;
                    const formattedDate = inputDate.replace(/\//g, '-');
                    const day_2 = new Date(formattedDate); 
                    const day_1 = new Date(localDate);
                    var diffTime = Math.abs(day_2 .getTime() - day_1.getTime());
                    if(day_2 .getTime() - day_1.getTime()<0){
                        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))*-1;
                        TempExpireMinus++
                    }else{
                        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        diffDays<4?TempExpirePlus++:null;
                    }
                    tempFoodList[i].day= diffDays;
                }
            }
        }  
        setFoodInfo(tempFoodList);
        setFoodInfoExpire({"Plus":TempExpirePlus,"Minus":TempExpireMinus});
        console.log("計算過日期後的全部食物資料列表",tempFoodList);
    }
    /**
     * 取得冰箱內部分層API
     */
    const getRefInfoMethod =()=>{
        axios.get(`${BASE_URL}/storage/refrigerator/info`,{
            headers: {
                'Authorization': token.token
              }
        }).then(async res=>{
            //await AsyncStorage.setItem('refInfo',JSON.stringify(res.data.refrigeratorList));
            await AsyncStorage.setItem('refInfo',JSON.stringify(
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
            iceContainer: 0 },{
            refrigerator_name: 'Kevin_ref_test',
            firstType: 'freezer',
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
            iceContainer: 0 }]));    
            setRefInfo(JSON.parse(await AsyncStorage.getItem('refInfo')));
            console.log("冰箱內部分層陣列",JSON.parse(await AsyncStorage.getItem('refInfo')));
        }).catch(async e=>{
            console.log(`getRefInfo error ${e}`);
            setRefInfo(JSON.parse(await AsyncStorage.getItem('refInfo')));
        }).finally(()=>{
        }
        );
    }
    /**
     * 登入API
     * @param {*} email 
     * @param {*} password 
     */
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
    }
    /**
     * 登出，並清除本地暫存資料
     */
    const logout =async()=>{
        //setIsLoading(true);   
            console.log('logout');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('foodInfo');
            await AsyncStorage.removeItem('userInfo');
            setToken({});
            setFoodInfo({});
            setUserInfo({});
            setIsLoading(false);
    };
    /**
     * 登入時載入token以及個人資料
     */
    const isLoggedIn=async ()=>{
        try{
            //setSplashLoading(true);
            let token =await AsyncStorage.getItem('token');
            let userInfo=await AsyncStorage.getItem('userInfo')
            let model =await AsyncStorage.getItem('lookModel');
            token=JSON.parse(token);
            userInfo=JSON.parse(userInfo);
            model=JSON.parse(model);
            console.log("isloggedin:",userInfo);  
            console.log("isloggedin_目前模式:",model);   
            if(token){
                setToken(token);
            };
            if(userInfo){
                setUserInfo(userInfo);
            };
            if(model ==false || model ==true){
                setLookModel(model);
                console.log("獲得使用這資料");
            };
            //setSplashLoading(false);
        }catch(e){
            //setSplashLoading(false);
            //console.log(`is logged in error ${e}`);

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
          userInfo,
          foodInfo,
          refInfo,
          foodInfoExpire,
          lookModel,
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