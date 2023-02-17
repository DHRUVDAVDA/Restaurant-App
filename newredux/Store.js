import {configureStore} from '@reduxjs/toolkit'
import myFoodSlice from './myFoodSlice'

export const myStore = configureStore({
    reducer:{
        food:myFoodSlice,
    },
});