import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
    customMealData: {},
    allCustomMeals: []

}
export const fetchCustomMeals = createAsyncThunk("fetchCustomMeals", async () => {
    try {
        const result = await api.getAllCustomMeals();
        console.log("result", result);
        return result;
    } catch (error) {
        console.log(error.message);
    }
})

export const customMealSlice = createSlice({
    name: "custom meals",
    initialState,
    reducers: {
        addCustomMeal: async (state, action) => {
            try {
                console.log("skfkdsj")
                const result = await api.addCustomMeal(action.payload);
                console.log(action.payload)
            } catch (error) {
                console.log(error.message);
            }
        },

    },
    extraReducers: {
        [fetchCustomMeals.fulfilled]: (state, action) => {
            console.log("inside");
            state.allCustomMeals =  action.payload;
            console.log("state", action.payload);
        }
    }
})
export const { addCustomMeal } = customMealSlice.actions;
export default customMealSlice.reducer;