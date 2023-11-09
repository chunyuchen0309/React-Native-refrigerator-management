import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { BASE_URL } from "../config";
import { Alert } from "react-native";
const initialState={
    info:{
        img:'',
        name:'',
        time:'',
        category:'',
        describe:'',
        difficult:'',
        ingredients:[],
        procedure:[],
        objectIngredients:{},
        objectProcedure:{},
    },
}

export const upRecipeApi = createAsyncThunk('createRecipe/upRecipeApi', async (aaa,thunkAPI) => {
    console.log("redux upRecipeApi",);
   //console.log("最後步驟",thunkAPI.getState().createRecipe.info.objectProcedure);
    try {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/storage/cookbook`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
            data:{
                "image": thunkAPI.getState().createRecipe.info.img,
                "name": thunkAPI.getState().createRecipe.info.name,
                "describe": thunkAPI.getState().createRecipe.info.describe,
                "time": thunkAPI.getState().createRecipe.info.time,
                "category_id": thunkAPI.getState().createRecipe.info.category,
                "difficult": thunkAPI.getState().createRecipe.info.difficult,
                "food_name": thunkAPI.getState().createRecipe.info.objectIngredients,
                "precedure": thunkAPI.getState().createRecipe.info.objectProcedure,
                }
        });
        console.log("upRecipeApi 成功", response.data);
        Alert.alert("新增食譜成功");
    } catch (e) {
        console.log("upRecipeApi 失敗", e);
    }
});

const createRecipeSlice =createSlice({
    name:'createRecipe',
    initialState :initialState,
    reducers:{
        setInfo(state,action){
            state.info.img = action.payload.img ? action.payload.img : state.info.img;
            state.info.name = action.payload.name ? action.payload.name : state.info.name;
            state.info.time = action.payload.time ? action.payload.time : state.info.time;
            state.info.category = action.payload.category ? action.payload.category : state.info.category;
            state.info.difficult = action.payload.difficult ? action.payload.difficult[1] : state.info.difficult;
            state.info.describe = action.payload.describe ? action.payload.describe : state.info.describe;
            state.info.ingredients=action.payload.ingredients ? action.payload.ingredients: state.info.ingredients;
            state.info.procedure=action.payload.procedure ?action.payload.procedure:state.info.procedure;
            console.log("建立食譜state",state.info);
        },
        clearcreateRecipeList(state,action){
            state.info=initialState
        },
        setObjectIngredients(state,action){
            state.info.objectIngredients=action.payload
        },
        setObjectProcedure(state,action){
            state.info.objectProcedure=action.payload
        },

    }
})

export const {setInfo,clearcreateRecipeList,setObjectIngredients,setObjectProcedure}=createRecipeSlice.actions;

export default createRecipeSlice.reducer;