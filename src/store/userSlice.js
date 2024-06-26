import AsyncStorage from "@react-native-async-storage/async-storage";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import { BASE_URL } from "../config";
import axios from "axios";
const initialState = {
    info: {
        username: "",
        email: "",
        phone: "",
        role: "",
        accountName: "",
        accountSharedStatus: false,
    },
    token: "",
    isLoading: false,
    error: "",
    sharedList:[],
    businessInfo:{},
    role:"",
    businessSharedList:[],
    businessSharedRequestList:[],
    businessOwner:'',
}
/**
 * 取得使用者API
 */
export const getUserInfo = createAsyncThunk('userSlice/getUserInfo', async (_,thunkAPI) => {
    console.log("redux獲取uerInfoApi", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/account/auth/getInfo`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        response.data.role = response.data.role == "0" ? '個人' : '商業';
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
        console.log("UserApi獲取成功", response.data);
        return response.data;
    } catch (e) {
        console.log("UserApi獲取失敗", e);
        return JSON.parse(await AsyncStorage.getItem('userInfo'));
    }
});

/**
 * 取得使用者API
 */
export const getBusinessInfo = createAsyncThunk('userSlice/getBusinessInfo', async (_,thunkAPI) => {
    console.log("redux獲取businessInfoApi", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/account/account/business/info`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        
        
        console.log("business獲取成功", response.data);
        await AsyncStorage.removeItem('foodInfo');
        return {info:response.data,role:"商業"};
    } catch (e) {
        console.log("business獲取失敗", e);
        if(e.response.status=="400"){
            return {info:{name:"",address:"",phone:"",number:""},role:"個人"};
        }
        
        //return JSON.parse(await AsyncStorage.getItem('businessInfo'));
    }
});
/**
 * redux取得使用者本地token 
 */
export const getUserToken = createAsyncThunk('userSlice/getUserToken', async () => {
    console.log("redux獲取本地token異步");
    let token = JSON.parse(await AsyncStorage.getItem('token'))
    return token
});
/**
 * redux更新使用者帳號名稱API
 */
export const modifyAccountNameApi = createAsyncThunk('userSlice/modifyAccountNameApi', async (payload,thunkAPI) => {
    const { modifydata } = payload;
    try {
        const response = await axios({
                method: "PUT",
                url: `${BASE_URL}/account/account/modify`,
                headers: { 'Authorization':thunkAPI.getState().userInfo.token },
                data: modifydata,
            }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
/**
 * redux更新使用者名稱API
 */
export const modifyUserNameApi = createAsyncThunk('userSlice/modifyUserNameApi', async (payload,thunkAPI) => {
    const { modifydata } = payload;
    try {
        const response = await axios({
                method: "PUT",
                url: `${BASE_URL}/account/auth/modify`,
                headers: { 'Authorization':thunkAPI.getState().userInfo.token },
                data: modifydata,
            }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
/**
 * redux更新使用者電話號碼API
 */
export const modifyUserPhoneApi = createAsyncThunk('userSlice/modifyUserPhoneApi', async (payload,thunkAPI) => {
    const { modifydata } = payload;
    try {
        const response = await axios({
                method: "PUT",
                url: `${BASE_URL}/account/auth/modify`,
                headers: { 'Authorization':thunkAPI.getState().userInfo.token },
                data: modifydata,
            }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

/**
 * redux更新使用者電話號碼API
 */
export const checkToken = createAsyncThunk('userSlice/checkToken', async (_,thunkAPI) => {
    console.log("checkTokenAPI")
    try {
        const response = await axios({
                method: "GET",
                url: `${BASE_URL}/account/account/check`,
                headers: { 'Authorization':thunkAPI.getState().userInfo.token },
            }
        );
        console.log("確認token",response.data);
    } catch (error) {
        console.log(error.response);
        
        
        if(error.response.status=="400"){
            //console.log(`Bearer ${error.response.data}`);
            await thunkAPI.dispatch(setUserToken(`Bearer ${error.response.data}`));
            console.log("token錯誤");
            
        }
    }
});

/**
 * redux移除使用者本地token以及清除使用者資訊
 */
export const removeUserToken = createAsyncThunk('userSlice/removeUserToken', async () => {
    //console.log("redux獲取token異步");
    return await AsyncStorage.removeItem('token');;
});

export const removeUserInfo = createAsyncThunk('userSlice/removeUserInfo', async () => {
    //console.log("redux獲取token異步");
    return await AsyncStorage.removeItem('userInfo');;
});
/**
 * redux設置使用者本地token 
 */
export const setUserToken = createAsyncThunk('userSlice/setUserToken', async (token) => {
    //console.log("redux獲取token異步");
    await AsyncStorage.setItem('token', JSON.stringify(token));
    return token;
});
/**
 * 取得使用者API
 */
export const getSharedList = createAsyncThunk('userSlice/getSharedList', async (_,thunkAPI) => {
    console.log("redux獲取getSharedList", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/account/account/request`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("getSharedList獲取失敗", e);
    }
});

export const getBusinessSharedList = createAsyncThunk('userSlice/getBusinessSharedList', async (_,thunkAPI) => {
    console.log("redux獲取BusinessSharedListApi", thunkAPI.getState().userInfo.token);
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/account/account/business/request`,
            headers: { 'Authorization': thunkAPI.getState().userInfo.token },
        });
        console.log("BusinessSharedListApi獲取成功");
        console.log(response);
        var tempList1=[];
        var tempList2=[];
        for(var i=0;i<response.data.length;i++){
            if(response.data[i].status=="processing"){
                tempList1.push(response.data[i]);
            }else{
                tempList2.push(response.data[i]);
            }
        }
        if(response.status=='202'){
            console.log("member")
            return {list1:[],list2:[],businessOwner:response.data.owner_name}
        }else{
            console.log("not member")
            return {list1:tempList1,list2:tempList2,businessOwner:''}
        }
        
    } catch (e) {
        console.log("BusinessSharedListApi獲取失敗", e);
        return {list1:[],list2:[]}
    }
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setIsloading(state, action) {
            console.log("更改isLoading")
            state.isLoading = true;
        },
        setlogOut(state, action) {
            console.log("redux清除userInfoList")
            state.token = "";
            state.info = initialState.info;
            state.sharedList=[];
            state.businessInfo={};
            state.role="個人";
            state.businessSharedList=[];
            state.businessSharedRequestList=[];
            state.businessOwner="";
        },
        removeError(state, action) {
            console.log("redux清除removeError")
            state.error = "";
        },
    },

    extraReducers: (builder) => {
            builder.addCase(getUserInfo.fulfilled, (state, action) => {
                if (action.payload) {
                    //console.log("userInfo獲取成功",action.payload);
                    state.info = action.payload;
                    state.isLoading = false;
                }
            }),
            builder.addCase(getUserToken.fulfilled, (state, action) => {
                console.log("userToken獲取成功 值： ", action.payload);
                state.token = action.payload;
            }),
            builder.addCase(removeUserToken.fulfilled, (state, action) => {
                console.log("removeUserToken成功");
                state.token = "";
                state.info = initialState.info;
                state.isLoading = false;
                state.error="";
            }),
            builder.addCase(setUserToken.fulfilled, (state, action) => {
                console.log("setUserToken成功", action.payload);
                state.token = action.payload;
            }),
            builder.addCase(modifyAccountNameApi.fulfilled, (state, action) => {
                console.log("modifyAccountNameApi成功", action.payload);
            }),
            builder.addCase(modifyAccountNameApi.rejected, (state, action) => {
                console.log("modifyAccountNameApi失敗", action.payload);
                state.error=action.payload;
            }),
            builder.addCase(modifyUserNameApi.fulfilled, (state, action) => {
                console.log("modifyUserNameApi成功", action.payload);
            }),
            builder.addCase(modifyUserNameApi.rejected, (state, action) => {
                console.log("modifyUserNameApi失敗", action.payload);
                state.error=action.payload;
            }),
            builder.addCase(modifyUserPhoneApi.fulfilled, (state, action) => {
                console.log("modifyUserPhoneApi成功", action.payload);
            }),
            builder.addCase(modifyUserPhoneApi.rejected, (state, action) => {
                console.log("modifyUserPhoneApi失敗", action.payload);
                state.error=action.payload;
            }),
            builder.addCase(removeUserInfo.fulfilled, (state, action) => {
                console.log("removeUserInfo成功", action.payload);
            }),
            builder.addCase(getSharedList.fulfilled, (state, action) => {
                state.sharedList=action.payload;
            }),
            builder.addCase(getBusinessInfo.fulfilled,(state,action)=>{
                state.businessInfo=action.payload.info;
                state.role=action.payload.role;
            }),
            builder.addCase(getBusinessSharedList.fulfilled,(state,action)=>{
                state.businessSharedList=action.payload.list2
                state.businessSharedRequestList=action.payload.list1
                state.businessOwner=action.payload.businessOwner
            })
    },
})

export const { setIsloading, setlogOut ,removeError} = userSlice.actions;

export default userSlice.reducer;