import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dashboardReducer from "../features/dashboard/dashboardSlice"
import customMealReducer from "../features/CustomMeal/customMealSlice";
import authReducer from "../features/Auth/authSlice";
import assessmentReducer from "../features/Assessment/assessmentSlice";
import bodyWeightReducer from "../features/BodyWeight/bodyWeightSlice";
export const store = configureStore({
    reducer: {
        app: dashboardReducer,
        customMeals: customMealReducer,
        auth: authReducer,
        assessment: assessmentReducer,
        bodyWeight: bodyWeightReducer
    }
});

