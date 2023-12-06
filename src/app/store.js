import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dashboardReducer from "../features/dashboard/dashboardSlice"
import customMealReducer from "../features/CustomMeal/customMealSlice";
export const store = configureStore({
    reducer: {
        app :  dashboardReducer,
        customMeals :  customMealReducer
    }
});

