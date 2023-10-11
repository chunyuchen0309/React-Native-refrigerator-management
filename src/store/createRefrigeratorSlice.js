const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    info:{
        outConfig:'',
        coldCount:'',
        freezingCount:'',
        coldDoorCount:'',
        freezingDoorCount:'',
        coldPlaneCount:'',
        freezingPlaneCount:'',
        name:'',
    },
}

const createRefrigeratorSlice =createSlice({
    name:'createRefrigerator',
    initialState :initialState,
    reducers:{
        setRefInfo(state,action){
            state.info.outConfig = action.payload.outConfig ? action.payload.outConfig : state.info.outConfig;
            state.info.coldCount = action.payload.coldCount ? action.payload.coldCount : state.info.coldCount;
            state.info.freezingCount = action.payload.freezingCount ? action.payload.freezingCount : state.info.freezingCount;
            state.info.coldDoorCount = action.payload.coldDoorCount ? action.payload.coldDoorCount : state.info.coldDoorCount;
            state.info.freezingDoorCount = action.payload.freezingDoorCount ? action.payload.freezingDoorCount : state.info.freezingDoorCount;
            state.info.coldPlaneCount = action.payload.coldPlaneCount ? action.payload.coldPlaneCount : state.info.coldPlaneCount;
            state.info.freezingPlaneCount=action.payload.freezingPlaneCount ? action.payload.freezingPlaneCount: state.info.freezingPlaneCount;
            state.info.name=action.payload.name ?action.payload.name:state.info.name;
            /*state.info={
                ...state.info,
                img:action.payload.img,
                name:action.payload.name,
                time:action.payload.time,
                category:action.payload.category,
                difficult:action.payload.difficult,
                describe:action.payload.describe,
            };*/
            console.log("建立冰箱state：",state.info);
        }
    }
})

export const {setRefInfo}=createRefrigeratorSlice.actions;

export default createRefrigeratorSlice.reducer;