import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../api"
const initialState = {
    isLoading: true,
    age: null,
    gender: null,
    weight: null,
    goal: null,
    goalWeight: null,
    data: null
}

export const getUserAssessment = createAsyncThunk("getUserAssessment", async () => {
    const data = await api.getUserAssessment();
    console.log("data in slice", data);
    return data;
})
//TODO: calculate user calorie intake and etc here

const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {

    }
    , extraReducers: {
        [getUserAssessment.fulfilled]: (state, action) => {

            if (action.payload) {
                console.log("action payload after fullfilled", action.payload.parsedRes)
                state.data = action.payload.parsedRes
            }
            state.isLoading = false;
        }
    }
})
export const { } = assessmentSlice.actions;
export default assessmentSlice.reducer;