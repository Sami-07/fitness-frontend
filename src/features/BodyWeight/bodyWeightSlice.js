import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
const initialState = {
    trackedWeightToday: null,
    todayWeight: null
}
export const getTodayBodyWeight = createAsyncThunk("getTodayBodyWeight", async () => {
    try {


        const res = await api.getTodayBodyWeight();
        // 

        return res
    }
    catch (err) {
        
    }
})


const bodyWeightSlice = createSlice({
    name: "body weight",
    initialState,
    reducers: {

    },
    extraReducers:
    {
        [getTodayBodyWeight.fulfilled]: (state, action) => {
           
            if (action.payload.parsedRes.status) {
                state.trackedWeightToday = true;
                state.todayWeight = action.payload.parsedRes.data.weight
               
            }
            else {
                state.trackedWeightToday = false
                
            }
        }
    }
})

export const { } = bodyWeightSlice.actions;
export default bodyWeightSlice.reducer;