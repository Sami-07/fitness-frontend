import  {Clerk} from "@clerk/clerk-js"
const url = "https://fitness-webapp-backend-ft91.onrender.com"
// const url = "http://localhost:5000"
const clerk = new Clerk(process.env.REACT_APP_PUBLISHABLE_KEY);
const auth = {}
export async function getCurrentUser() {
    try {
        // Ensure Clerk is loaded before using any methods
        await clerk.load();

        // Check if Clerk is loaded and ready
        if (clerk.loaded) {
            // Access the current user directly from Clerk
            const user = clerk.user;
            const session = clerk.session;
          if (!session) {
                console.log("Session is not loaded yet.");
                return { user: null };
            }

        
            const res = await fetch(url + "/current-user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await session.getToken()}`,
                },
        
            })
            const parsedRes = await res.json();
            console.log("getCurrentUser for state:", parsedRes)
            return { user: parsedRes?.user };
        } else {
            console.error("Clerk is not loaded yet.");
            return { user: null };
        }
    } catch (error) {
        console.error("Error loading Clerk:", error);
        return { user: null };
    }
}
export const saveUser = async (userData) => {
    try {
        const response = await fetch(url + "/save-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
          return { status: false, error: "Failed to save user info" };
        }
     return { status: true };
    } catch (error) {
        console.error("Error saving user info:", error);
        return { status: false, error: "Failed to save user info" };
    }
};

export async function logout() {
    try {
        const res = await fetch(url + "/logout", {
            method: "POST",
            credentials: "include",
        });
        return { status: true };
    } catch (error) {
        return { status: false, error: error.message };
    }
}

export async function login(email, password) {
    try {
        const data = await fetch(url + "/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        const parsedData = await data.json();
        return { result: parsedData };
    }
    catch (err) {
        return { error: err.message }
    }
}


export async function register(userName, email, password) {
    try {


        const data = await fetch(url + "/register", {
            method: "POST",
            credentials: "include",

            headers: {
                "Content-Type": "application/json",



            },
            body: JSON.stringify({ userName, email, password })
        })

        const pasredData = await data.json();

        return { result: pasredData };

    }
    catch (err) {
        return { error: err.message }
    }


}

//New funtions
export async function getUserAssessment() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const result = await fetch(url + "/dashboard/getuserassessment", {
            method: "GET",
            credentials: "include",
        });
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const parsedRes = await result.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in getUserAssessment:", error);
        return { status: false, error: error.message };
    }
}

export async function calculateIntake() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const result = await fetch(url + "/dashboard/calculatemacrointake", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await result.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in calculateIntake:", error);
        return { status: false, error: error.message };
    }
}

export async function addBodyWeight({ weight }) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const result = await fetch(url + "/dashboard/addbodyweight", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ weight })
        });
        const parsedRes = await result.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in addBodyWeight:", error);
        return { status: false, error: error.message };
    }
}

export async function getTodayBodyWeight() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const result = await fetch(url + "/dashboard/gettodaysbodyweight", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await result.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in getTodayBodyWeight:", error);
        return { status: false, error: error.message };
    }
}

export async function updateBodyWeight({ weight }) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const result = await fetch(url + "/dashboard/updatebodyweight", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ weight })
        });
        const parsedRes = await result.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in updateBodyWeight:", error);
        return { status: false, error: error.message };
    }
}

export async function fetchResults(term) {
    try {
        const result = await fetch(url + "/dashboard/fetchresults", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ term })
        });
        const parsedRes = await result.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in fetchResults:", error);
        return { status: false, error: error.message };
    }
}

export async function getFitnessInfo() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const res = await fetch(url + "/dashboard/getgooglefitnessinfo", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await res.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in getFitnessInfo:", error);
        return { status: false, error: error.message };
    }
}

export async function getMeals() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false, error: "unauthenticated" };
        }
        const result = await fetch(url + "/dashboard/getmeals", {
            method: "GET",
            credentials: "include",
        });
        const parsedResult = await result.json();
        return { data: parsedResult.data };
    } catch (error) {
        console.error("Error in getMeals:", error);
        return { status: false, error: error.message };
    }
}

export async function fetchBreakfastData() {
    try {
        await fetch(url + '/dashboard/getbreakfastinfo', {
            credentials: "include",
        });
    } catch (error) {
        console.error("Error in fetchBreakfastData:", error);
        throw error;
    }
}

export async function addBreakfastData(breakfastFoodData) {
    try {

        const data = await fetch(url + '/dashboard/addbreakfast', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(breakfastFoodData)
        });
        const breakfastData = await data.json();

       
        return { data: breakfastData };
    } catch (error) {
        console.error("Error in addBreakfastData:", error);
        throw error;
    }
}


export async function addMorningSnacksData(morningSnacksData) {
    try {


        const res = await fetch(url + '/dashboard/addmorningsnacks', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(morningSnacksData)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const parsedRes = await res.json();
        return { data: parsedRes };
    } catch (error) {
        console.error("Error in addMorningSnacksData:", error);
        throw error;
    }
}

export async function addLunch(lunchData) {
    try {

        const res = await fetch(url + '/dashboard/addlunch', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lunchData)
        });
        const parsedRes = await res.json();
        return { data: parsedRes };
    } catch (error) {
        console.error("Error in addLunch:", error);
        throw error;
    }
}

export async function addEveningSnacks(eveningSnacksData) {
    try {

        const res = await fetch(url + '/dashboard/addeveningsnacks', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eveningSnacksData)
        });
        const parsedRes = await res.json();
        return { data: parsedRes };
    } catch (error) {
        console.error("Error in addEveningSnacks:", error);
        throw error;
    }
}

export async function addDinner(dinnerData) {
    try {

        const res = await fetch(url + '/dashboard/adddinner', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dinnerData)
        });
        const parsedRes = await res.json();
        return { data: parsedRes };
    } catch (error) {
        console.error("Error in addDinner:", error);
        throw error;
    }
}

export async function addWater(qty) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/addwater", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ qty })
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in addWater:", error);
        throw error;
    }
}

export async function fetchWaterIntake() {
    try {
        const { user } = await getCurrentUser();
        console.log("user fetchWaterIntake" , user)
        if (!user) {
            throw new Error("unauthenticated custom");
        }
        const res = await fetch(url + "/dashboard/fetchwaterintake", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await res.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in fetchWaterIntake:", error);
        throw error;
    }
}

export async function getFoodNutrients(foodName) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + `/dashboard/foodnutrients`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ foodName })
        });
        const parsedRes = await res.json();
        return { data: parsedRes.data };
    } catch (error) {
        console.error("Error in getFoodNutrients:", error);
        throw error;
    }
}

export async function getExistingMealNutrients(foodName, mealType) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/getexistingmealnutrients", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ foodName, mealType })
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in getExistingMealNutrients:", error);
        throw error;
    }
}

export async function getAllCustomMeals() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/getallcustommeals", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in getAllCustomMeals:", error);
        throw error;
    }
}

export async function addCustomMeal(customMealDetails) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/addcustommeal", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customMealDetails)
        });
        const parsedRes = await res.json();
        return { data: parsedRes };
    } catch (error) {
        console.error("Error in addCustomMeal:", error);
        throw error;
    }
}

export async function removeMeal(foodItem, mealType) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        await fetch(url + "/dashboard/removemeal", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ foodItem, mealType })
        });
    } catch (error) {
        console.error("Error in removeMeal:", error);
        throw error;
    }
}

export async function getExercises(muscle) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/getexercises", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ muscle })
        });
        const parsedRes = await res.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in getExercises:", error);
        throw error;
    }
}

export async function addWorkout(data) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            return { status: false };
        }
        const res = await fetch(url + "/dashboard/addworkout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const parsedRes = await res.json();
        return { res: parsedRes };
    } catch (error) {
        console.error("Error in addWorkout:", error);
        return { status: false };
    }
}

export async function getWorkoutDetails() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/getworkoutdetails", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await res.json();
        return { parsedRes };
    } catch (error) {
        console.error("Error in getWorkoutDetails:", error);
        throw error;
    }
}

export async function changeWorkoutDay(workoutDay) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/editworkoutday", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ workoutDay }),
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in changeWorkoutDay:", error);
        throw error;
    }
}

export async function editSet(data) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/editset", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in editSet:", error);
        throw error;
    }
}

export async function deleteSet(data) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/deleteset", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in deleteSet:", error);
        throw error;
    }
}

export async function fetchWorkoutForADay(selectedDate) {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/fetchworkoutforaday", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedDate }),
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in fetchWorkoutForADay:", error);
        throw error;
    }
}

export async function getAllExercises() {
    try {
        const { user } = await getCurrentUser();
        if (!user) {
            throw new Error("unauthenticated");
        }
        const res = await fetch(url + "/dashboard/getallexercises", {
            method: "GET",
            credentials: "include",
        });
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error("Error in getAllExercises:", error);
        throw error;
    }
}
export async function addAssessmentDetails({ age, gender, height, weight, approach, goalWeight, activityLevel }) {
    try {
        const { user } = await getCurrentUser();
      
        if (!user) {
            // Handle the case where the user is not authenticated.
            throw new Error("User not authenticated.");
        }



        // Assuming 'url' is defined somewhere in your code
        const response = await fetch(url + "/dashboard/addassessmentdetails", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ age, gender, height, weight, approach, goalWeight, activityLevel })
        });

        const parsedRes = await response.json();


        return parsedRes.status;
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error to indicate failure
    }
}

// // export async function getUserAssessment() {
// //     return new Promise(async (resolve, reject) => {
// //         try {
// //             auth.onAuthStateChanged(async (user) => {
// //                 if (user) {
// //                     const idToken = await user.accessToken;
// //                     const result = await fetch(url +  "/dashboard/getuserassessment", {
// //                         method: "GET",
// //                         headers: {
// //                             
// //                         }
// //                     })
// //                     const parsedRes = await result.json();
// //                     resolve({ parsedRes })
// //                 }
// //             })
// //         }
// //         catch (err) {

// //         }
// //     })
// // }
// export async function getUserAssessment() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const idToken = await user.accessToken;
//                     const result = await fetch(url + "/dashboard/getuserassessment", {
//                         method: "GET",

//                     });

//                     if (!result.ok) {
//                         throw new Error(`HTTP error! Status: ${result.status}`);
//                     }

//                     const parsedRes = await result.json();
//                     resolve({ parsedRes });
//                 }
//             });
//         } catch (err) {
//             reject(err);
//         }
//     });
// }

// //CALCULATE MACRO INTAKE
// export async function calculateIntake() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const idToken = await user.accessToken;
//                     const res = await fetch(url + "/dashboard/calculatemacrointake", {
//                         method: "GET",
//                         headers: {

//                         }
//                     })
//                     const parsedRes = await res.json();
//                     resolve({ parsedRes });
//                 }
//             })
//         }
//         catch (err) {

//         }
//     })
// }

// //ADD Body Weight to the database Everyday.
// export async function addBodyWeight({ weight }) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const idToken = await user.accessToken
//                     const res = await fetch(url + "/dashboard/addbodyweight", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",

//                         },
//                         body: JSON.stringify({ weight })
//                     })
//                     const parsedRes = await res.json();
//                     resolve({ parsedRes })
//                 }
//             })

//         }
//         catch (err) {

//         }
//     })
// }

// //GET body weight for the current day, if already added.
// export async function getTodayBodyWeight() {
//     return new Promise(async (resolve, reject) => {
//         auth.onAuthStateChanged(async (user) => {
//             if (user) {
//                 const idToken = await user.accessToken;
//                 const result = await fetch(url + "/dashboard/gettodaysbodyweight", {
//                     method: "GET",
//                     headers: {

//                     }
//                 })
//                 const parsedRes = await result.json();
//                 resolve({ parsedRes })
//             }
//         })
//     })
// }

// //UPDATE Body Weight
// export function updateBodyWeight({ weight }) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const idToken = await user.accessToken
//                     const res = await fetch(url + "/dashboard/updatebodyweight", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",

//                         },
//                         body: JSON.stringify({ weight })
//                     })
//                     const parsedRes = await res.json();
//                     resolve({ parsedRes })
//                 }
//             })

//         }
//         catch (err) {

//         }
//     })
// }

// //FETCH search results from PUBLIC api
// export async function fetchResults(term) {

//     const res = await fetch(url + "/dashboard/fetchresults", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ term })
//     })
//     const parsedRes = await res.json();
//     return parsedRes;

// }






// export async function getFitnessInfo() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const idToken = await user.accessToken;
//                     const res = await fetch(url + "/dashboard/getgooglefitnessinfo",
//                         {
//                             method: "GET",
//                             headers: {

//                             }
//                         })
//                     const parsedRes = await res.json();

//                     resolve({ parsedRes });
//                 }
//             })
//         }
//         catch (err) {

//         }
//     })
// }
// export function getMeals() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;


//                     const result = await fetch(url + "/dashboard/getmeals", {
//                         method: "GET",

//                     });
//                     const parsedResult = await result.json();

//                     resolve({ data: parsedResult.data });
//                 }
//             });
//         } catch (err) {

//             reject(err);
//         }
//     });
// }




// export async function fetchBreakfastData() {
//     await fetch(url + '/dashboard/getbreakfastinfo')
// }

// export async function addBreakfastData(breakfastFoodData) {

//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;

//                     const data = await fetch(url + '/dashboard/addbreakfast', {
//                         method: "POST",
//                         headers: {

//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(breakfastFoodData)
//                     })
//                     if (data) {
//                         resolve({ data: breakfastFoodData })
//                     }
//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })
// }
// export async function addMorningSnacksData(morningSnacksData) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const data = await fetch(url + '/dashboard/addmorningsnacks', {
//                         method: "POST",
//                         headers: {

//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(morningSnacksData)
//                     })
//                     if (data) {
//                         resolve({ data: morningSnacksData })
//                     }
//                 }
//             })
//         }
//         catch (err) {

//         }


//     })
// }
// export async function addLunch(lunchData) {



//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const data = await fetch(url + '/dashboard/addlunch', {
//                         method: "POST",
//                         headers: {

//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(lunchData)
//                     })
//                     if (data) {
//                         resolve({ data: lunchData })
//                     }
//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }
//     })
// }
// export async function addEveningSnacks(eveningSnacksData) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const data = await fetch(url + '/dashboard/addeveningsnacks', {
//                         method: "POST",
//                         headers: {

//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(eveningSnacksData)
//                     })
//                     if (data) {
//                         resolve({ data: eveningSnacksData })
//                     }
//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })
// }
// export async function addDinner(dinnerData) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const data = await fetch(url + '/dashboard/adddinner', {
//                         method: "POST",
//                         headers: {

//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify(dinnerData)
//                     })
//                     if (data) {
//                         resolve({ data: dinnerData })
//                     }

//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })
// }
// export async function addWater(qty) {
//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, message: "Unauthorized" }
//     }

//     const res = await fetch(url + "/dashboard/addwater", {
//         method: "POST",
//         headers: {

//             "Content-Type": "application/json",

//         },
//         body: JSON.stringify({ qty })
//     })
//     const parsedRes = await res.json();
//     return parsedRes;
// }

// export async function fetchWaterIntake() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {

//                     const res = await fetch(url + "/dashboard/fetchwaterintake", {
//                         method: "GET",

//                     })

//                     const parsedRes = await res.json();

//                     resolve({ parsedRes });
//                 }
//             })
//         }
//         catch (err) {
//             console.log(err.message)
//         }
//     })

// }
// export async function getFoodNutrients(foodName) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;

//                     const data = await fetch(url + `/foodnutrients`, {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",

//                         },
//                         body: JSON.stringify({ foodName })
//                     })
//                     const response = await data.json()

//                     if (response) {


//                         resolve({ data: response.data })
//                     }
//                 }
//             })
//         }
//         catch (err) {

//         }
//     })
// }
// export async function getExistingMealNutrients(foodName, mealType) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const data = await fetch(url + "/dashboard/getexistingmealnutrients", {
//                         method: "POST",
//                         headers: {

//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify({ foodName, mealType })
//                     })
//                     const parsed = await data.json();
//                     if (parsed) {
//                         resolve(parsed);
//                     }

//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })
// }
// export async function getAllCustomMeals() {

//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const response = await fetch(url + "/dashboard/getallcustommeals", {
//                         method: "GET",

//                     });
//                     const parsedRes = await response.json();

//                     if (parsedRes) {
//                         resolve(parsedRes);
//                     }

//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })

// }
// export async function addCustomMeal(CustomMealDetails) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in
//                     const idToken = await user.accessToken;
//                     const data = await fetch(url + "/dashboard/addcustommeal",
//                         {
//                             method: "POST",
//                             headers: {

//                                 "Content-Type": "application/json"
//                             },
//                             body: JSON.stringify(CustomMealDetails)
//                         });
//                     if (data) {
//                         resolve({ data: CustomMealDetails })
//                     }

//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })






// }
// export async function removeMeal(foodItem, mealType) {
//     return new Promise(async (resolve, reject) => {
//         try {

//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     // User is logged in

//                     const data = await fetch(url + "/dashboard/removemeal",
//                         {
//                             method: "POST",
//                             headers: {

//                                 "Content-Type": "application/json"
//                             },
//                             body: JSON.stringify({ foodItem, mealType })
//                         })

//                 }
//             })
//         }
//         catch (err) {
//             console.log(err);
//         }

//     })





// }



// export async function getExercises(muscle) {
//     try {
//         const user = auth.currentUser;

//         if (!user) {
//             // Handle the case where the user is not authenticated.
//             throw new Error("User not authenticated.");
//         }



//         // Assuming 'url' is defined somewhere in your code
//         const response = await fetch(url + "/dashboard/getexercises", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",

//             },
//             body: JSON.stringify({ muscle })
//         });

//         const parsedRes = await response.json();

//         // Assuming 'url' is defined somewhere in your code


//         return { parsedRes };
//     } catch (err) {
//         console.error(err.message);
//         throw err; // Re-throw the error to indicate failure
//     }
// }
// export async function addWorkout(data) {
//     try {
//         const user = auth.currentUser;

//         if (!user) {

//             return { status: false }
//         }


//         const res = await fetch(url + "/dashboard/addworkout", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",

//             },
//             body: JSON.stringify(data)
//         })
//         const parsedRes = await res.json();

//         return { res: parsedRes }
//     } catch (err) {
//         return { status: false }

//     }
// }

// export async function getWorkoutDetails() {
//     return new Promise(async (resolve, reject) => {
//         auth.onAuthStateChanged(async (user) => {
//             if (user) {

//                 const res = await fetch(url + "/dashboard/getworkoutdetails", {
//                     method: "GET",
//                     headers: {

//                     }
//                 })
//                 const x = await res.json();

//                 resolve({ parsedRes: x })
//             }
//         })
//     })
// }

// export async function changeWorkoutDay(workoutDay) {
//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, message: "Unauthorized" }
//     }

//     const res = await fetch(url + "/dashboard/editworkoutday",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",

//             },
//             body: JSON.stringify({ workoutDay })
//         })
//     const parsedRes = await res.json();
//     return parsedRes;
// }

// export async function editSet(data) {
//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, error: "Unauthorized" }
//     }

//     const res = await fetch(url + "/dashboard/editset", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",

//         },
//         body: JSON.stringify(data)
//     })
//     const parsedRes = await res.json();

//     return parsedRes;
// }
// export async function deleteSet(data) {
//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, error: "Unauthorized" }
//     }

//     const res = await fetch(url + "/dashboard/deleteset", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",

//         },
//         body: JSON.stringify(data)
//     })
//     const parsedRes = await res.json();

//     return parsedRes;
// }
// export async function fetchWorkoutForADay(selectedDate) {
//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, error: "Unauthorized" }
//     }

//     const res = await fetch(url + "/dashboard/fetchworkoutforaday", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",

//         },
//         body: JSON.stringify({ selectedDate })
//     })
//     const parsedRes = await res.json();
//     return parsedRes;
// }
// export async function getAllExercises() {

//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, error: "Unauthorized" }
//     }

//     const res = await fetch(url + "/dashboard/getallexercises", {
//         method: "GET",
//         headers: {


//         }

//     })

//     const parsedRes = await res.json();

//     return parsedRes;
// }


// export async function getGoogleFitSteps() {
//     const user = auth.currentUser;
//     if (!user) {
//         return { status: false, error: "Unauthorized" }
//     }
//     const accessToken = await user.getIdToken();
//     try {
//         // Specify the start and end times for the data you want to fetch
//         const startTimeMillis = new Date('2023-01-01T00:00:00Z').getTime();
//         const endTimeMillis = new Date().getTime();

//         const response = await fetch(url + 
//             `https://www.googleapis.com/fitness/v1/users/me/dataSources/DERIVED:com.google.step_count.delta:com.google.android.gms:estimated_steps/datasets/${startTimeMillis}-${endTimeMillis}`,
//             {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );

//         if (!response.ok) {
//             throw new Error(`Failed to fetch steps. Status: ${response.status}`);
//         }

//         const data = await response.json();
//         
//         // Extract the number of steps from the response
//         const steps = data.point[0].value[0].intVal;
//         return steps;
//     } catch (error) {
//         console.error('Error fetching steps from Google Fit API:', error.message);
//         throw error;
//     }
// };


// export async function getGoogleFitSteps(){

//     const user = auth.currentUser;
//     if(!user){
//         return { status: false, error: "Unauthorized" }
//     }

//     
//     const res = await fetch(url +  "/dashboard/getgooglesteps", {
//         method: "GET",
//         headers: {

//             
//         }

//     })
// 
//     const parsedRes = await res.json();
//     
//     return parsedRes;
// }


export async function getGoogleFitSteps() {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const res = await fetch(url + "/dashboard/getgooglesteps", {
                        method: "GET",
                        headers: {


                        }

                    })
                    const parsedRes = await res.json();

                    if (res) {
                        resolve({ parsedRes })
                    }

                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })

}


