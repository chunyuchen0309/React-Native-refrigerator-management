const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import axios from "axios";
const initialState={
    refList:[],
    isLoading:false,
}

export const getRefInfo = createAsyncThunk('refSlice/getRefInfo', async (_,thunkAPI) => {
    console.log("redux獲取RefApi", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/storage/refrigerator/info`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        await AsyncStorage.setItem('refInfo',JSON.stringify(response.data.refrigeratorList));
        console.log("RefApi獲取成功", response.data);
        console.log("RefApi獲取成功 :res", response);
        return response.data.refrigeratorList;
    } catch (e) {
        console.log("RefApi獲取失敗", e);
        return JSON.parse(await AsyncStorage.getItem('refInfo'));
    }
});

export const queryRefPlace = createAsyncThunk('refSlice/queryRefPlace', async (_,thunkAPI) => {
    console.log("redux獲取queryRefPlaceApi",);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/storage/store/place`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
            data:{
                "refrigerator_name": "Kevin_ref",
                "compartment_row": 1,
                "compartment_col": 2,
                "container_row": 1,
                "container_col": 2,
            }
        });
        
        console.log("queryRefPlaceApi獲取成功", response.data);
        //return response.data.refrigeratorList;
    } catch (e) {
        console.log("queryRefPlaceApi獲取失敗", e);
        //return JSON.parse(await AsyncStorage.getItem('refInfo'));
    }
});


export const removeRefInfo = createAsyncThunk('refSlice/removeRefInfo', async () => {
    //console.log("redux刪除RefApi");
    return await AsyncStorage.removeItem('refInfo');;
});


const refSlice =createSlice({
    name:'ref',
    initialState :initialState,
    reducers:{
        setIsloading(state,action){
            console.log("更改isLoading")
            state.isLoading = true;
        },
        clearRefList(state,action){
            console.log("redux清除refInfoList")
            state.refList=[]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRefInfo.fulfilled, (state, action) => {
            if(action.payload){
                console.log("refInfo獲取成功",action.payload);
                state.refList = action.payload;
                state.isLoading = false;
            }
        }),
        builder.addCase(removeRefInfo.fulfilled, (state, action) => {
            state.refList=[];
            console.log("removeRefInfo成功");
        })
    }
})
export const {setIsloading,clearRefList}=refSlice.actions;

export default refSlice.reducer;