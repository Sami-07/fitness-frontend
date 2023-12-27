import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
const initialState = {
    exercises: null,
    isAdded: null,
    todayWorkouts: null,
    workoutDayInState: null,
    msg: null,
    workoutDataForADay: null,
    allExercises: null
}
export const getExercises = createAsyncThunk("getExercises", async (muscle) => {
    const res = await api.getExercises(muscle)
    return res
})

export const addWorkout = createAsyncThunk("addWorkout", async (data) => {
    const res = await api.addWorkout(data)
    console.log("added", res.res);
    return res.res;
})

export const getWorkoutDetails = createAsyncThunk("getWorkoutDetails", async () => {
    const res = await api.getWorkoutDetails()
    return res;
})

export const changeWorkoutDay = createAsyncThunk("changeWorkoutDay", async (workoutDay) => {
    const res = await api.changeWorkoutDay(workoutDay)
    return res;
})

export const editSet = createAsyncThunk("editSet", async (data) => {
    const res = await api.editSet(data)
    return res;
})

export const deleteSet = createAsyncThunk("deleteSet", async (data) => {
    const res = await api.deleteSet(data)
    return res;
})
export const fetchWorkoutForADay = createAsyncThunk("fetchWorkoutForADay", async (selectedDate) => {
    const res = await api.fetchWorkoutForADay(selectedDate);
    console.log("data of a date workout", res);
    return res;

})
export const getAllExercises = createAsyncThunk("getAllExercises", async () => {
    const res = await api.getAllExercises();
    // console.log("data of a date workout", res);
    return res;

})

const workoutSlice = createSlice({
    name: "workout",

    initialState,

    reducers: {

    },

    extraReducers: {
        [addWorkout.fulfilled]: (state, action) => {
            state.msg = action.payload.message
        },

        [getExercises.fulfilled]: (state, action) => {
            if (action.payload.parsedRes.result) {
                state.exercises = action.payload.parsedRes.result
            }
        },

        [getWorkoutDetails.fulfilled]: (state, action) => {
            state.todayWorkouts = action.payload.parsedRes
            if (action.payload.parsedRes.parsedRes && action.payload.parsedRes.parsedRes.workoutDay) {
                state.workoutDayInState = action.payload.parsedRes.parsedRes.workoutDay
            }
        },

        [changeWorkoutDay.fulfilled]: (state, action) => {
            state.msg = action.payload.message;
        },

        [editSet.fulfilled]: (state, action) => {
            state.msg = action.payload.message;
        },

        [deleteSet.fulfilled]: (state, action) => {
            state.msg = action.payload.message;
        },
        [fetchWorkoutForADay.fulfilled]: (state, action) => {

            state.workoutDataForADay = action.payload;

        },
        [getAllExercises.fulfilled]: (state, action) => {
            state.allExercises = action.payload;
        }

    }

})
export const { } = workoutSlice.actions
export default workoutSlice.reducer;