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
    totalPercentageCal: 0,
    isLoading: true,
    totalProtein: 0,
    waterQty: 0,
    addStatus: false

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


export const addBreakfastData = createAsyncThunk("addBreakfastData", async (payload) => {
    try {
      
        const result = await api.addBreakfastData(payload);
      
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

export const addMorningSnacksData = createAsyncThunk("addMorningSnacksData", async (payload) => {
    try {
        const result = await api.addMorningSnacksData(payload);
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

export const addLunch = createAsyncThunk("addLunch", async (payload) => {
    try {
        const result = await api.addLunch(payload);
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

export const addEveningSnacks = createAsyncThunk("addEveningSnacks", async (payload) => {
    try {
        const result = await api.addEveningSnacks(payload);
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

export const addDinner = createAsyncThunk("addDinner", async (payload) => {
    try {
        const result = await api.addDinner(payload);
        
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

export const removeMeal = createAsyncThunk("removeMeal", async (payload) => {
    try {
        await api.removeMeal(payload);
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

export const calcPercentage = createAsyncThunk("calcPercentage", async (payload) => {
    // You can add async logic here if needed
    return payload;
});




export const addWater = createAsyncThunk("addWater", async (qty) => {
    try {
        const result = await api.addWater(qty);
        return result;
    }
    catch (err) {
        console.log(err.message);
    }
}
)
export const fetchWaterIntake = createAsyncThunk("fetchWaterIntake", async () => {
    try {
        const result = await api.fetchWaterIntake();
   
        return result;
    }
    catch (err) {
        console.log(err.message);
    }
}
)
export const dashboardSlice = createSlice({
    name: "foodItems",
    initialState,
    reducers: {
      
    },
    extraReducers: {
        [fetchMeals.fulfilled]: (state, action) => {
            state.foodData = action.payload;


            let sum = 0;
            let pSum = 0;
            if (action.payload.data[0]) {
                const obj = action.payload.data[0]
                if (obj.breakfast) {
                    Object.keys(obj.breakfast).map(foodName => {
                        sum += obj["breakfast"][foodName]["calories"]
                        pSum += obj["breakfast"][foodName]["protein"]
                    })

                    state.breakfastCalories = sum;

                }
                sum = 0
                if (obj.morningSnacks) {
                    Object.keys(obj.morningSnacks).map(foodName => {
                        sum += obj["morningSnacks"][foodName]["calories"]
                        pSum += obj["morningSnacks"][foodName]["protein"]
                    })
                    state.morningSnacksCalories = sum;
                }
                sum = 0
                if (obj.lunch) {
                    Object.keys(obj.lunch).map(foodName => {
                        sum += obj["lunch"][foodName]["calories"]
                        pSum += obj["lunch"][foodName]["protein"]
                    })
                    state.lunchCalories = sum;
                }
                sum = 0
                if (obj.eveningSnacks) {
                    Object.keys(obj.eveningSnacks).map(foodName => {
                        sum += obj["eveningSnacks"][foodName]["calories"]
                        pSum += obj["eveningSnacks"][foodName]["protein"]
                    })
                    state.eveningSnacksCalories = sum;
                }
                sum = 0
                if (obj.dinner) {
                    Object.keys(obj.dinner).map(foodName => {
                        sum += obj["dinner"][foodName]["calories"]
                        pSum += obj["dinner"][foodName]["protein"]
                    })
                    state.dinnerCalories = sum;


                }
                state.totalCalories = state.breakfastCalories + state.morningSnacksCalories + state.lunchCalories + state.eveningSnacksCalories + state.dinnerCalories
                state.totalPercentageCal = (state.totalCalories / 2400) * 100;

                state.totalProtein = pSum;

            }

        },
        [addWater.fulfilled]: (state, action) => {
            if (action.payload.status) {

                state.addStatus = true
            }
        },
        [fetchWaterIntake.fulfilled]: (state, action) => {
            if (action.payload) {
                let formattedQty = (action.payload.parsedRes.waterIntake) / 1000
                state.waterQty = formattedQty
            }
        },
        [addBreakfastData.fulfilled]: (state, action) => {
           
            if (action.payload.status) {
                state.addStatus = true
            }
        },
        [addMorningSnacksData.fulfilled]: (state, action) => {
            if (action.payload.status) {
                state.addStatus = true
            }
        },
        [addLunch.fulfilled]: (state, action) => {
            if (action.payload.status) {
                state.addStatus = true
            }
        },
        [addEveningSnacks.fulfilled]: (state, action) => {
            if (action.payload.status) {
                state.addStatus = true
            }
        },
        [addDinner.fulfilled]: (state, action) => {
            if (action.payload.status) {
                state.addStatus = true
            }
        },
        [removeMeal.fulfilled]: (state, action) => {
            if (action.payload.status) {
                state.addStatus = true
            }
        },
        [calcPercentage.fulfilled]: (state, action) => {
            if (action.payload) {
                state.totalPercentageCal = action.payload
            }
        }
    }
})



export default dashboardSlice.reducer;