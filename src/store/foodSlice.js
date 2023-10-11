const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axios from "axios";
const initialState={
    foodList:[],
    isLoading:false,
    Plus:"",
    Minus:"",
}

export const calculateDate = createAsyncThunk('foodSlice/calculateDate', async (ttt,{dispatch}) => {
    console.log("開始計算");
    var tempFoodList =JSON.parse(await AsyncStorage.getItem('foodInfo'));
    //console.log("本地食物資訊",tempFoodList);
    var localDate = new Date();
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1; // 月份從0開始，需要加1
    const day = localDate.getDate();
    localDate = `${year}-${month}-${day}`;
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
                //console.log("食物資訊",diffDays);
                tempFoodList[i].day= diffDays;
            }
        }
    }
    console.log("計算過後的foodList : ",tempFoodList);
    return  {"tempFoodList":tempFoodList,"Plus":TempExpirePlus,"Minus":TempExpireMinus};
});

export const getFoodInfo = createAsyncThunk('foodSlice/getFoodInfo', async (_,thunkAPI) => {
    console.log("redux獲取FoodApi", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/storage/item`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        await AsyncStorage.setItem('foodInfo',JSON.stringify(response.data)); //轉json存入
        console.log("FoodApi獲取成功", response.data);
        thunkAPI.dispatch(calculateDate());
    } catch (e) {
        console.log("FoodApi獲取失敗", e);
        thunkAPI.dispatch(calculateDate());
        return 
    }
});

export const deleteFoodApi = createAsyncThunk('foodSlice/deleteFoodApi', async (deleteID,thunkAPI) => {
    console.log("redux刪除deleteFoodApi id:", deleteID);

    try {
        const response = await axios({
            method: "DELETE",
            url: `${BASE_URL}/storage/item`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
            data:{"ingredient_id":deleteID},
        });
        console.log("deleteFoodApi獲取成功", response.data);  
    } catch (e) {
        console.log("deleteFoodApi獲取失敗", e);
    }
});



export const removeFoodInfo = createAsyncThunk('refSlice/removeFoodInfo', async () => {
    //console.log("redux刪除RefApi");
    return await AsyncStorage.removeItem('foodInfo');;
});

const foodSlice =createSlice({
    name:'food',
    initialState :initialState,
    reducers:{
        setIsloading(state,action){
            console.log("更改isLoading")
            state.isLoading = true;
        },
        clearFoodList(state,action){
            console.log("redux清除foodInfoList")
            state=initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(calculateDate.fulfilled, (state, action) => {
            if(action.payload){
                console.log("foodInfo獲取成功",action.payload.tempFoodList);
                state.foodList = action.payload.tempFoodList;
                state.Plus=action.payload.Plus;
                state.Minus=action.payload.Minus;
                state.isLoading = false;
            }
        }),
        builder.addCase(removeFoodInfo.fulfilled, (state, action) => {
            console.log("removeFoodInfo成功");
            state.Minus=""
            state.Plus=""
            state.foodList=[]
        })
    }
})
export const {setIsloading,clearFoodList}=foodSlice.actions;

export default foodSlice.reducer;