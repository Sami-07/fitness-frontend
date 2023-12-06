import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
    foodData: [],
    // totalBreakfastNutrients: { calories: 0, protein: 0, fats: 0, carbs: 0, fiber: 0, sugar: 0 },
    // totalMorningSnacksNutrients: { calories: 0, protein: 0, fats: 0, carbs: 0, fiber: 0, sugar: 0 },
    // totalLunchNutrients: { calories: 0, protein: 0, fats: 0, carbs: 0, fiber: 0, sugar: 0 },
    // totalEveningSnacksNutrients: { calories: 0, protein: 0, fats: 0, carbs: 0, fiber: 0, sugar: 0 },
    // totalDinnerNutrients: { calories: 0, protein: 0, fats: 0, carbs: 0, fiber: 0, sugar: 0 },
    breakfastCalories: 0,
    morningSnacksCalories: 0,
    lunchCalories: 0,
    eveningSnacksCalories: 0,
    dinnerCalories: 0,
    totalCalories: 0,
    totalPercentageCal: 0

}

export const fetchMeals = createAsyncThunk("fetchMeals", async () => {
    try {
        const result = await api.getMeals();
        return result;
    }
    catch (err) {
        console.log(err.message);
    }
})
export const dashboardSlice = createSlice({
    name: "foodItems",
    initialState,
    reducers: {
        addBreakfastData: async (state, action) => {
            try {
                const result = await api.addBreakfastData(action.payload);
            }
            catch (err) {
                console.log(err.message);
            }
        },
        addMorningSnacksData: async (state, action) => {
            try {
                const result = await api.addMorningSnacksData(action.payload);
            }
            catch (err) {
                console.log(err.message);
            }
        },
        addLunch: async (state, action) => {
            try {
                const result = await api.addLunch(action.payload);
            }
            catch (err) {
                console.log(err.message);
            }
        },
        addEveningSnacks: async (state, action) => {
            try {
                const result = await api.addEveningSnacks(action.payload);
            }
            catch (err) {
                console.log(err.message);
            }
        },
        addDinner: async (state, action) => {
            try {
                const result = await api.addDinner(action.payload);
            }
            catch (err) {
                throw err;
            }
        },
      removeMeal : async (state, action)=>{
        try {
           await api.removeMeal(action.payload)
        } catch (err) {
          console.log(err.message);  
        }
      },
calcPercentage  : (state,action) =>{
    console.log("inside action", action.payload)

  
}

    },
    extraReducers: {
        [fetchMeals.fulfilled]: (state, action) => {
            state.foodData = action.payload;
            const obj = action.payload.data[0]

            let sum = 0;
            if (obj) {
                if (obj.breakfast) {
                    Object.keys(obj.breakfast).map(foodName => {
                        sum += obj["breakfast"][foodName]["calories"]
                    })
                    console.log(sum)
                    state.breakfastCalories = sum;
                }
                sum = 0
                if (obj.morningSnacks) {
                    Object.keys(obj.morningSnacks).map(foodName => {
                        sum += obj["morningSnacks"][foodName]["calories"]
                    })
                    state.morningSnacksCalories = sum;
                }
                sum = 0
                if (obj.lunch) {
                    Object.keys(obj.lunch).map(foodName => {
                        sum += obj["lunch"][foodName]["calories"]
                    })
                    state.lunchCalories = sum;
                }
                sum = 0
                if (obj.eveningSnacks) {
                    Object.keys(obj.eveningSnacks).map(foodName => {
                        sum += obj["eveningSnacks"][foodName]["calories"]
                    })
                    state.eveningSnacksCalories = sum;
                }
                sum = 0
                if (obj.dinner) {
                    Object.keys(obj.dinner).map(foodName => {
                        sum += obj["dinner"][foodName]["calories"]
                    })
                    state.dinnerCalories = sum;
                    console.log(sum);
                    console.log("state sum", state.dinnerCalories);
                }
                state.totalCalories = state.breakfastCalories + state.morningSnacksCalories + state.lunchCalories + state.eveningSnacksCalories + state.dinnerCalories
                state.totalPercentageCal = (state.totalCalories /  2400) * 100;
               

            }

        }
    }
})

export const { addBreakfastData, addMorningSnacksData, addLunch, addEveningSnacks, addDinner,removeMeal,calcPercentage } = dashboardSlice.actions;

export default dashboardSlice.reducer;