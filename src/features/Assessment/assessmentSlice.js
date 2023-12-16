import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../api"
const initialState = {
    age: null,
    gender: null,
    weight: null,
    goal: null,
    goalWeight: null
}

export const getUserAssessment = createAsyncThunk("getUserAssessment", async () => {
// const data = await api.getUserDetails();  
})
//TODO: calculate user calorie intake and etc here

const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {

    }

})
export const { addAssessmentDetails } = assessmentSlice.actions;
export default assessmentSlice.reducer;