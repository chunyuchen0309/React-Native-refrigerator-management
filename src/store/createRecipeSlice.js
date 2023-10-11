const { createSlice } = require("@reduxjs/toolkit");

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
    },
}

const createRecipeSlice =createSlice({
    name:'createRecipe',
    initialState :initialState,
    reducers:{
        setInfo(state,action){
            state.info.img = action.payload.img ? action.payload.img : state.info.img;
            state.info.name = action.payload.name ? action.payload.name : state.info.name;
            state.info.time = action.payload.time ? action.payload.time : state.info.time;
            state.info.category = action.payload.category ? action.payload.category[1] : state.info.category;
            state.info.difficult = action.payload.difficult ? action.payload.difficult[1] : state.info.difficult;
            state.info.describe = action.payload.describe ? action.payload.describe : state.info.describe;
            state.info.ingredients=action.payload.ingredients ? action.payload.ingredients: state.info.ingredients;
            state.info.procedure=action.payload.procedure ?action.payload.procedure:state.info.procedure;
            /*state.info={
                ...state.info,
                img:action.payload.img,
                name:action.payload.name,
                time:action.payload.time,
                category:action.payload.category,
                difficult:action.payload.difficult,
                describe:action.payload.describe,
            };*/
            console.log("建立食譜state",state.info);
        },
        clearcreateRecipeList(state,action){
            state.info=initialState
        }
    }
})

export const {setInfo,clearcreateRecipeList}=createRecipeSlice.actions;

export default createRecipeSlice.reducer;