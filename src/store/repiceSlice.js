import AsyncStorage from "@react-native-async-storage/async-storage";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { BASE_URL } from "../config";
import axios from "axios";
const initialState = {
    repiceList: [],
    clickRecipeList: [],
    likeList: [],
}

export const changeObjectToArray = createAsyncThunk('repiceSlice/changeObjectToArray', async (recpiceData, thunkAPI) => {
    console.log("開始轉換")
    for (var i = 0; i < recpiceData.length; i++) {
        const objectIngredients = Object.entries(recpiceData[i].food_name);
        //
        const objectProcedure = Object.entries(recpiceData[i].precedure);
        var tempFoodList = thunkAPI.getState().foodInfo.foodList;


        tempFoodList = tempFoodList.filter((item) => item.day >= 0).map((itme) => { return itme.ingredient_orignal_name });
        //tempFoodList=tempFoodList.filter((item)=>{ return item.day>=0});
        //console.log("篩選的foodList列表",tempFoodList);
        recpiceData[i].ingredients = objectIngredients.map(([key, value]) => {
            const haveFood = tempFoodList.includes(key);
            return { ingredientsName: key, ingredientsUnit: value, haveFood: haveFood };
        });

        recpiceData[i].needFoodList = objectIngredients.map(([key, value]) => {
            return key;
        });
        recpiceData[i].procedureList = objectProcedure.map(([key, value]) => {
            return value;
        });
        recpiceData[i].jaccardNumber = -1;
    }
    //console.log("轉換後的結果",recpiceData);
    return recpiceData;
});



export const removeRepiceInfo = createAsyncThunk('repiceSlice/removeRepiceInfo', async () => {
    //console.log("redux獲取token異步");
    return await AsyncStorage.removeItem('cookbook');
});

export const getRepiceInfo = createAsyncThunk('repiceSlice/getRepiceInfo', async (_, thunkAPI) => {
    console.log("redux獲取getRepiceInfo", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/storage/cookbook`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        console.log("cookbookAPI SUCESS", response.data);
        await AsyncStorage.setItem('cookbook', JSON.stringify(response.data)); //轉json存入
        thunkAPI.dispatch(changeObjectToArray(response.data));
        //return response.data;
    } catch (e) {
        console.log("cookbookAPI獲取失敗", e);
        var temp = JSON.parse(await AsyncStorage.getItem('cookbook'));
        thunkAPI.dispatch(changeObjectToArray(temp));
    }
});

export const getRepiceLikeInfo = createAsyncThunk('repiceSlice/getRepiceLikeInfo', async (_, thunkAPI) => {
    console.log("redux獲取getRepiceLikeInfo", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/storage/cookbook/personal`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        console.log("cgetRepiceLikeInfo SUCESS", response.data);
        return response.data;
    } catch (e) {
        console.log("getRepiceLikeInfo獲取失敗", e);
    }
});

const repiceSlice = createSlice({
    name: 'repiceSlice',
    initialState: initialState,
    reducers: {
        addInfo(state, action) {
            console.log("增加addQuery : ", action.payload);
        },
        setClickRecipe(state, action) {
            console.log("點擊的食譜", action.payload);
            state.clickRecipeList = action.payload;
        },
        setLikeToList(state, acrion) {
            
            if(state.likeList?.length>0 &&state.repiceList?.length>0){
                console.log("喜愛增加")
                for (var i = 0; i < state.repiceList.length; i++) {
                    let foundMatch = false; // 添加一個標誌來標記是否找到匹配
                    for (var j = 0; j < state.likeList.length; j++) {
                        if (state.repiceList[i].id === state.likeList[j].id) {
                            state.repiceList[i].like = true;
                            foundMatch = true; // 找到匹配後設置標誌為 true
                            break; // 找到匹配後跳出內部循環
                        }
                    }
                    if (!foundMatch) {
                        state.repiceList[i].like = false; // 如果未找到匹配，設置為 false
                    }
                }
            }else{
                console.log('無喜愛資訊')
            }
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(changeObjectToArray.fulfilled, (state, action) => {
            console.log("changeObjectToArray成功", action.payload)
            state.repiceList = action.payload;
        }),
            builder.addCase(removeRepiceInfo.fulfilled, (state, action) => {
                console.log("removeRepiceInfo成功");
                state.repiceList = [];
                state.clickRecipeList = [];
                state.likeList = [];
            }),
            builder.addCase(getRepiceLikeInfo.fulfilled, (state, action) => {
                state.likeList = action.payload;
            })
    }
})

export const { addQuery, setClickRecipe, setLikeToList } = repiceSlice.actions;

export default repiceSlice.reducer;