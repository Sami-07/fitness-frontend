import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dashboardReducer from "../features/dashboard/dashboardSlice"
import customMealReducer from "../features/CustomMeal/customMealSlice";
import authReducer from "../features/Auth/authSlice"
export const store = configureStore({
    reducer: {
        app :  dashboardReducer,
        customMeals :  customMealReducer,
        auth : authReducer
    }
});

