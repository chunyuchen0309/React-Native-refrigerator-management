import AsyncStorage from "@react-native-async-storage/async-storage";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { BASE_URL } from "../config";
import axios from "axios";
const initialState={
    "refName" :"",
    "container_col":"",
    "container_row":"",
    "compartment_row": "",
    "compartment_col": '1',
    "category":"",
    "foodList":[],
}

export const calculateDate = createAsyncThunk('refQuerySlice/calculateDate', async (resData,{dispatch}) => {
    console.log("開始計算");
    var tempFoodList =resData;
    //console.log("本地食物資訊",tempFoodList);
    var localDate = new Date();
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1; // 月份從0開始，需要加1
    const day = localDate.getDate();
    localDate = `${year}-${month}-${day}`;
    if(tempFoodList){
        for(let i=0;i<tempFoodList.length;i++){
            if(tempFoodList[i].expired_date){
                //console.log("每個位置的日期",foodInfo[i].expired_date);            
                const inputDate = tempFoodList[i].expired_date;
                const formattedDate = inputDate.replace(/\//g, '-');
                const day_2 = new Date(formattedDate); 
                const day_1 = new Date(localDate);
                day_1.setHours(0, 0, 0, 0); // 将时间部分设置为0
                day_2.setHours(0, 0, 0, 0);
                var diffTime = Math.abs(day_2 .getTime() - day_1.getTime());
                if(day_2 .getTime() - day_1.getTime()<0){
                    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))*-1;
                }else{
                    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }
                //console.log("食物資訊",diffDays);
                tempFoodList[i].day= diffDays;
            }
        }
    }
    console.log("計算過後的queryFoodList : ",tempFoodList);
    return  {"tempFoodList":tempFoodList};
});

export const RefQueryInfo_calculate = createAsyncThunk('refQuerySlice/RefQueryInfo_calculate', async (resData,{dispatch}) => {
    console.log("開始計算");
    var tempFoodList =resData;
    var changeFoodList=[];
    changeFoodList.length=tempFoodList.length;
    console.log("本地食物資訊",changeFoodList.length);
    var localDate = new Date();
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1; // 月份從0開始，需要加1
    const day = localDate.getDate();
    localDate = `${year}-${month}-${day}`;
    if(tempFoodList){
        for(let i=0;i<tempFoodList.length;i++){
            if(tempFoodList[i].expiredTime){
                //console.log("每個位置的日期",foodInfo[i].expired_date);            
                const inputDate = tempFoodList[i].expiredTime;
                const formattedDate = inputDate.replace(/\//g, '-');
                const day_2 = new Date(formattedDate); 
                const day_1 = new Date(localDate);
                day_1.setHours(0, 0, 0, 0); // 将时间部分设置为0
                day_2.setHours(0, 0, 0, 0);
                var diffTime = Math.abs(day_2 .getTime() - day_1.getTime());
                if(day_2 .getTime() - day_1.getTime()<0){
                    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))*-1;
                }else{
                    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }
                //tempFoodList[i].day= diffDays;
                changeFoodList[i] = {
                    calculator_expired_date:tempFoodList[i].calculatorExpiredTime,
                    category_id:tempFoodList[i].category.categoryId,
                    category_name:tempFoodList[i].category.name,
                    container_col:tempFoodList[i].containerId.containerCol,
                    container_row:tempFoodList[i].containerId.containerRow,
                    day:diffDays,
                    expired_date:tempFoodList[i].expiredTime,
                    ingredient_custom_name:tempFoodList[i].customName?tempFoodList[i].customName:"",
                    ingredient_id:tempFoodList[i].ingredient_id,
                    ingredient_orignal_name:tempFoodList[i].oldName,
                    refrigerator_col:tempFoodList[i].containerId.compartment.refrigeratorCol,
                    refrigerator_row:tempFoodList[i].containerId.compartment.refrigeratorRow,
                }
            }
        }
    }
    console.log("計算過後的queryFoodList : ",changeFoodList);
    return  {"tempFoodList":changeFoodList};
});

export const getRefQueryInfo = createAsyncThunk('refQuerySlice/getRefQueryInfo', async (_,thunkAPI) => {
    console.log("redux獲取getRefQueryInfo", thunkAPI.getState().userInfo.token);
    var queryStaete=thunkAPI.getState().refQuery;
    console.log("內部查詢送出：","refrigerator_name:" ,queryStaete.refName,
    "\ncompartment_row:",queryStaete.compartment_row,
    "\ncompartment_col:",queryStaete.compartment_col,
    "\ncontainer_row:", queryStaete.container_row,
    "\ncontainer_col:", queryStaete.container_col,)
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/storage/store/place`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
            data:{
                "refrigerator_name": ""+queryStaete.refName,
                "compartment_row": ""+queryStaete.compartment_row,
                "compartment_col": ""+queryStaete.compartment_col,
                "container_row": ""+queryStaete.container_row,
                "container_col": ""+queryStaete.container_col,
            },
        });
        console.log("getRefQueryInfo獲取成功", response.data.ingredients);
        thunkAPI.dispatch(RefQueryInfo_calculate(response.data.ingredients));
        
        //return response.data;
    } catch (e) {
        console.log("getRefQueryInfo獲取失敗", e);
    }
});

export const getRefQueryInfo_compartment = createAsyncThunk('refQuerySlice/getRefQueryInfo_compartment', async (_,thunkAPI) => {
    console.log("redux獲取getRefQueryInfo_compartment", thunkAPI.getState().userInfo.token);
    var queryStaete=thunkAPI.getState().refQuery;
    var tempDoor=false;
    if(queryStaete.category=="coolerDoor" ||queryStaete.category =="freezerDoor"){
        tempDoor=true;
    }
    console.log("分層查詢送出：","refrigerator_name:" ,queryStaete.refName,
    "\ncompartment_row:",queryStaete.compartment_row,
    "\ncompartment_col:",queryStaete.compartment_col,
    "\ndoor:",tempDoor);
    
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/storage/compartment`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
            data:{
                "refrigerator_name": ""+queryStaete.refName,
                "compartment_row": ""+queryStaete.compartment_row,
                "compartment_col": ""+queryStaete.compartment_col,
                "door": tempDoor,
            },
        });
        console.log("getRefQueryInfo_compartment獲取成功", response.data);
        thunkAPI.dispatch(calculateDate(response.data));
        //return response.data;
    } catch (e) {
        console.log("getRefQueryInfo_compartment獲取失敗", e);
    }
});

const refQuerySlice =createSlice({
    name:'refQuerySlice',
    initialState :initialState,
    reducers:{
        addQuery(state,action){
            console.log("增加addQuery : ",action.payload);
            state.category=action.payload.category?action.payload.category:state.category;
            state.refName=action.payload.refName?action.payload.refName:state.refName;
            state.container_col=action.payload.container_col?action.payload.container_col:state.container_col;
            state.compartment_row=action.payload.compartment_row?action.payload.compartment_row:state.compartment_row;
            state.compartment_col=action.payload.compartment_col?action.payload.compartment_col:state.compartment_col;
            state.container_row=action.payload.container_row?action.payload.container_row:state.container_row;
        },
        clearQuery(state,action){
            console.log("清除queryStatus")
            state.foodList=[];
            state.category="";
            state.compartment_row='';
            state.container_col="";
            state.compartment_row="";
            state.refName="";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(calculateDate.fulfilled, (state, action) => {
            state.foodList=action.payload.tempFoodList
        }),
        builder.addCase(RefQueryInfo_calculate.fulfilled, (state, action) => {
            state.foodList=action.payload.tempFoodList
        })

    }
})

export const {addQuery,clearQuery}=refQuerySlice.actions;

export default refQuerySlice.reducer;