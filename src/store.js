import { configureStore,} from '@reduxjs/toolkit'
import createRecipeSlice from './store/createRecipeSlice'
import createRefrigeratorSlice from './store/createRefrigeratorSlice'
import userSlice from './store/userSlice'
import foodSlice from './store/foodSlice'
import refSlice from './store/refSlice'
import createFoodSlice from './store/createFoodSlice'
import refQuerySlice from './store/refQuerySlice'
import repiceSlice from './store/repiceSlice'


export default configureStore({
    reducer: {
        createRecipe:createRecipeSlice, //key:value
        createRefrigerator:createRefrigeratorSlice,
        userInfo:userSlice,
        foodInfo:foodSlice,
        refInfo:refSlice,
        createFood:createFoodSlice,
        refQuery:refQuerySlice,
        repiceInfo:repiceSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})