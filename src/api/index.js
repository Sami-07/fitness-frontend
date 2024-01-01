import { auth } from "../firebase/config";

const url = "http://localhost:5000/dashboard"
const baseUrl = "http://localhost:5000"
// const url = "https://fitness-webapp-backend.vercel.app/dashboard"
// const baseUrl = "https://fitness-webapp-backend.vercel.app"



async function getUserToken() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // User is logged in
            const idToken = await user.accessToken;

            return { idToken };
        }
    })
}

export async function register(userName, email) {
    try {


        const data = await fetch( "/dashboard/register", {
            method: "POST",
            headers: {

                "Content-Type": "application/json",

            },
            body: JSON.stringify({ userName, email })
        })

        const pasredData = await data.json();

        return { result: pasredData };

    }
    catch (err) {
        console.log(err.message);
    }


}

export async function registerGoogleUser(displayName, email) {
    try {


        const data = await fetch( "/dashboard/registergoogleuser", {
            method: "POST",
            headers: {

                "Content-Type": "application/json",

            },
            body: JSON.stringify({ displayName, email })
        })

        const pasredData = await data.json();

        return { result: pasredData };

    }
    catch (err) {
        console.log(err.message);
    }
}
export async function addAssessmentDetails({ age, gender, height, weight, approach, goalWeight, activityLevel }) {
    try {
        const user = auth.currentUser;

        if (!user) {
            // Handle the case where the user is not authenticated.
            throw new Error("User not authenticated.");
        }

        const idToken = await user.getIdToken();

        // Assuming 'url' is defined somewhere in your code
        const response = await fetch( "/dashboard/addassessmentdetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            body: JSON.stringify({ age, gender, height, weight, approach, goalWeight, activityLevel })
        });

        const parsedRes = await response.json();

        // Assuming 'url' is defined somewhere in your code
        const x = await fetch( "/dashboard/calculatemacrointake", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        });

        return parsedRes.status;
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error to indicate failure
    }
}

// export async function getUserAssessment() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             auth.onAuthStateChanged(async (user) => {
//                 if (user) {
//                     const idToken = await user.accessToken;
//                     const result = await fetch( "/dashboard/getuserassessment", {
//                         method: "GET",
//                         headers: {
//                             Authorization: `Bearer ${idToken}`
//                         }
//                     })
//                     const parsedRes = await result.json();
//                     resolve({ parsedRes })
//                 }
//             })
//         }
//         catch (err) {

//         }
//     })
// }
export async function getUserAssessment() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken;
                    const result = await fetch("/dashboard/getuserassessment", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    });

                    if (!result.ok) {
                        throw new Error(`HTTP error! Status: ${result.status}`);
                    }

                    const parsedRes = await result.json();
                    resolve({ parsedRes });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

//CALCULATE MACRO INTAKE
export async function calculateIntake() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken;
                    const res = await fetch( "/dashboard/calculatemacrointake", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    })
                    const parsedRes = await res.json();
                    resolve({ parsedRes });
                }
            })
        }
        catch (err) {

        }
    })
}

//ADD Body Weight to the database Everyday.
export async function addBodyWeight({ weight }) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken
                    const res = await fetch( "/dashboard/addbodyweight", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${idToken}`
                        },
                        body: JSON.stringify({ weight })
                    })
                    const parsedRes = await res.json();
                    resolve({ parsedRes })
                }
            })

        }
        catch (err) {

        }
    })
}

//GET body weight for the current day, if already added.
export async function getTodayBodyWeight() {
    return new Promise(async (resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idToken = await user.accessToken;
                const result = await fetch( "/dashboard/gettodaysbodyweight", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                })
                const parsedRes = await result.json();
                resolve({ parsedRes })
            }
        })
    })
}

//UPDATE Body Weight
export function updateBodyWeight({ weight }) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken
                    const res = await fetch( "/dashboard/updatebodyweight", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${idToken}`
                        },
                        body: JSON.stringify({ weight })
                    })
                    const parsedRes = await res.json();
                    resolve({ parsedRes })
                }
            })

        }
        catch (err) {

        }
    })
}

//FETCH search results from PUBLIC api
export async function fetchResults(term) {

    const res = await fetch( "/dashboard/fetchresults", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ term })
    })
    const parsedRes = await res.json();
    return parsedRes;

}
export async function getFitnessInfo() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken;
                    const res = await fetch( "/dashboard/getgooglefitnessinfo",
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${idToken}`
                            }
                        })
                    const parsedRes = await res.json();

                    resolve({ parsedRes });
                }
            })
        }
        catch (err) {

        }
    })
}
export function getMeals() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;


                    const result = await fetch( "/dashboard/getmeals", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });
                    const parsedResult = await result.json();

                    resolve({ data: parsedResult.data });
                }
            });
        } catch (err) {

            reject(err);
        }
    });
}




export async function fetchBreakfastData() {
    await fetch( '/dashboard/getbreakfastinfo')
}

export async function addBreakfastData(breakfastFoodData) {

    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;

                    const data = await fetch( '/dashboard/addbreakfast', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(breakfastFoodData)
                    })
                    if (data) {
                        resolve({ data: breakfastFoodData })
                    }
                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })
}
export async function addMorningSnacksData(morningSnacksData) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( '/dashboard/addmorningsnacks', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(morningSnacksData)
                    })
                    if (data) {
                        resolve({ data: morningSnacksData })
                    }
                }
            })
        }
        catch (err) {

        }


    })
}
export async function addLunch(lunchData) {



    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( '/dashboard/addlunch', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(lunchData)
                    })
                    if (data) {
                        resolve({ data: lunchData })
                    }
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    })
}
export async function addEveningSnacks(eveningSnacksData) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( '/dashboard/addeveningsnacks', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(eveningSnacksData)
                    })
                    if (data) {
                        resolve({ data: eveningSnacksData })
                    }
                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })
}
export async function addDinner(dinnerData) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( '/dashboard/adddinner', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dinnerData)
                    })
                    if (data) {
                        resolve({ data: dinnerData })
                    }

                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })
}
export async function addWater(qty) {
    const user = auth.currentUser;
    if (!user) {
        return { status: false, message: "Unauthorized" }
    }
    const idToken = await user.getIdToken();
    const res = await fetch( "/dashboard/addwater", {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ qty })
    })
    const parsedRes = await res.json();
    return parsedRes;
}

export async function fetchWaterIntake() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.getIdToken();
                    const res = await fetch( "/dashboard/fetchwaterintake", {
                        method: "GET",
                        headers: {


                            Authorization: `Bearer ${idToken}`
                        }
                    })

                    const parsedRes = await res.json();

                    resolve({ parsedRes });
                }
            })
        }
        catch (err) {
            console.log(err.message)
        }
    })

}
export async function getFoodNutrients(foodName) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;

                    const data = await fetch(`${url}/foodnutrients`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${idToken}`,
                        },
                        body: JSON.stringify({ foodName })
                    })
                    const response = await data.json()

                    if (response) {


                        resolve({ data: response.data })
                    }
                }
            })
        }
        catch (err) {

        }
    })
}
export async function getExistingMealNutrients(foodName, mealType) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( "/dashboard/getexistingmealnutrients", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ foodName, mealType })
                    })
                    const parsed = await data.json();
                    if (parsed) {
                        resolve(parsed);
                    }

                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })
}
export async function getAllCustomMeals() {

    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const response = await fetch( "/dashboard/getallcustommeals", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                        }
                    });
                    const parsedRes = await response.json();

                    if (parsedRes) {
                        resolve(parsedRes);
                    }

                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })

}
export async function addCustomMeal(CustomMealDetails) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( "/dashboard/addcustommeal",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(CustomMealDetails)
                        });
                    if (data) {
                        resolve({ data: CustomMealDetails })
                    }

                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })






}
export async function removeMeal(foodItem, mealType) {
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    const data = await fetch( "/dashboard/removemeal",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${idToken}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ foodItem, mealType })
                        })

                }
            })
        }
        catch (err) {
            console.log(err);
        }

    })





}



export async function getExercises(muscle) {
    try {
        const user = auth.currentUser;

        if (!user) {
            // Handle the case where the user is not authenticated.
            throw new Error("User not authenticated.");
        }

        const idToken = await user.getIdToken();

        // Assuming 'url' is defined somewhere in your code
        const response = await fetch( "/dashboard/getexercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            body: JSON.stringify({ muscle })
        });

        const parsedRes = await response.json();

        // Assuming 'url' is defined somewhere in your code


        return { parsedRes };
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error to indicate failure
    }
}
export async function addWorkout(data) {
    try {
        const user = auth.currentUser;

        if (!user) {

            return { status: false }
        }
        const idToken = await user.getIdToken();

        const res = await fetch( "/dashboard/addworkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            body: JSON.stringify(data)
        })
        const parsedRes = await res.json();

        return { res: parsedRes }
    } catch (err) {
        return { status: false }

    }
}

export async function getWorkoutDetails() {
    return new Promise(async (resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                const res = await fetch( "/dashboard/getworkoutdetails", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                })
                const x = await res.json();

                resolve({ parsedRes: x })
            }
        })
    })
}

export async function changeWorkoutDay(workoutDay) {
    const user = auth.currentUser;
    if (!user) {
        return { status: false, message: "Unauthorized" }
    }
    const idToken = await user.getIdToken();
    const res = await fetch( "/dashboard/editworkoutday",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            body: JSON.stringify({ workoutDay })
        })
    const parsedRes = await res.json();
    return parsedRes;
}

export async function editSet(data) {
    const user = auth.currentUser;
    if (!user) {
        return { status: false, error: "Unauthorized" }
    }
    const idToken = await user.getIdToken();
    const res = await fetch( "/dashboard/editset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify(data)
    })
    const parsedRes = await res.json();

    return parsedRes;
}
export async function deleteSet(data) {
    const user = auth.currentUser;
    if (!user) {
        return { status: false, error: "Unauthorized" }
    }
    const idToken = await user.getIdToken();
    const res = await fetch( "/dashboard/deleteset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify(data)
    })
    const parsedRes = await res.json();

    return parsedRes;
}
export async function fetchWorkoutForADay(selectedDate) {
    const user = auth.currentUser;
    if (!user) {
        return { status: false, error: "Unauthorized" }
    }
    const idToken = await user.getIdToken();
    const res = await fetch( "/dashboard/fetchworkoutforaday", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ selectedDate })
    })
    const parsedRes = await res.json();
    return parsedRes;
}
export async function getAllExercises() {

    const user = auth.currentUser;
    if (!user) {
        return { status: false, error: "Unauthorized" }
    }
    const idToken = await user.getIdToken();
    const res = await fetch( "/dashboard/getallexercises", {
        method: "GET",
        headers: {

            Authorization: `Bearer ${idToken}`
        }

    })

    const parsedRes = await res.json();

    return parsedRes;
}


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

//         const response = await fetch(
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

//     const idToken = await user.getIdToken();
//     const res = await fetch( "/dashboard/getgooglesteps", {
//         method: "GET",
//         headers: {

//             Authorization: `Bearer ${idToken}`
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
                    const res = await fetch( "/dashboard/getgooglesteps", {
                        method: "GET",
                        headers: {

                            Authorization: `Bearer ${idToken}`
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


