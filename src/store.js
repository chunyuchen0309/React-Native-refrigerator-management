import { configureStore,} from '@reduxjs/toolkit'
import createRecipeSlice from './store/createRecipeSlice'
import createRefrigeratorSlice from './store/createRefrigeratorSlice'
import userSlice from './store/userSlice'
import foodSlice from './store/foodSlice'
import refSlice from './store/refSlice'
import createFoodSlice from './store/createFoodSlice'


export default configureStore({
    reducer: {
        
        createRecipe:createRecipeSlice, //key:value
        createRefrigerator:createRefrigeratorSlice,
        userInfo:userSlice,
        foodInfo:foodSlice,
        refInfo:refSlice,
        createFood:createFoodSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})