import AsyncStorage from "@react-native-async-storage/async-storage";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { BASE_URL } from "../config";
import axios from "axios";
const initialState={
    info:[],
}

const createFoodSlice =createSlice({
    name:'createFoodSlice',
    initialState :initialState,
    reducers:{
        addFood(state,action){
            console.log("增加foodListHand : ",action.payload);
            state.info.push(action.payload);
        },
        addFoodInv(state,action){
            console.log("增加foodListInv : ",action.payload);
            state.info=(action.payload);
        },
        clearList(state,action){
            console.log("清除新增食物列表");
            state.info=[];
        },
        addRemove(state,action){
            console.log("存入至後端刪除以選取得Inv: ",action.payload);
            state.info=state.info.filter((_, index) => !action.payload.includes(index));
            //刪除不是傳入的index,filter保留為true的值
            //所以傳入的值如果有擇變為false,如果沒有擇變為true保留
        }        
    },
})

export const {addFood,addFoodInv,clearList,addRemove}=createFoodSlice.actions;

export default createFoodSlice.reducer;