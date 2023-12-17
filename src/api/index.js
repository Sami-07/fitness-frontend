import { auth } from "../firebase/config";

const url = "http://localhost:5000/dashboard"
const baseUrl = "http://localhost:5000"



async function getUserToken() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // User is logged in
            const idToken = await user.accessToken;
            console.log("in side function", idToken);
            return { idToken };
        }
    })
}

export async function register(userName, email) {
    try {


        const data = await fetch(baseUrl + "/register", {
            method: "POST",
            headers: {

                "Content-Type": "application/json",

            },
            body: JSON.stringify({ userName, email })
        })

        const pasredData = await data.json();
        console.log("res of register", pasredData);
        return { result: pasredData };

    }
    catch (err) {
        console.log(err.message);
    }


}
export async function addAssessmentDetails({ age, gender, height, weight, approach, goalWeight, activityLevel }) {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken;
                    const result = await fetch(url + "/addassessmentdetails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${idToken}`
                        }
                        ,
                        body: JSON.stringify({ age, gender, height, weight, approach, goalWeight, activityLevel })
                    },
                    )
                    const paredRes = await result.json();
                    await fetch(url + "/calculatemacrointake", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    })
                    if (result) {
                        resolve({ result: paredRes.status })
                    }
                }
            })
        }
        catch (err) {
            console.log(err.message);
        }
    })
}
export async function getUserAssessment() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken;
                    const result = await fetch(url + "/getuserassessment", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    })
                    const parsedRes = await result.json();
                    resolve({ parsedRes })
                }
            })
        }
        catch (err) {

        }
    })
}

//CALCULATE MACRO INTAKE
export async function calculateIntake() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken;
                    const res = await fetch(url + "/calculatemacrointake", {
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
            console.log("weight in api", weight);
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const idToken = await user.accessToken
                    const res = await fetch(url + "/addbodyweight", {
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
                const result = await fetch(url + "/gettodaysbodyweight", {
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
                    const res = await fetch(url + "/updatebodyweight", {
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

    const res = await fetch(url + "/fetchresults", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ term })
    })
    const parsedRes = await res.json();
    return parsedRes;

}

export function getMeals() {
    return new Promise(async (resolve, reject) => {
        try {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;

                    const result = await fetch(url + "/getmeals", {
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
            console.log(err.message);
            reject(err);
        }
    });
}




export async function fetchBreakfastData() {
    await fetch('http://localhost:5000/dashboard/getbreakfastinfo')
}

export async function addBreakfastData(breakfastFoodData) {
    console.log("hrjhkrgjekf")
    return new Promise(async (resolve, reject) => {
        try {

            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is logged in
                    const idToken = await user.accessToken;
                    console.log("function id Token", idToken);
                    const data = await fetch('http://localhost:5000/dashboard/addbreakfast', {
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
                    const data = await fetch('http://localhost:5000/dashboard/addmorningsnacks', {
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
                    const data = await fetch('http://localhost:5000/dashboard/addlunch', {
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
                    const data = await fetch('http://localhost:5000/dashboard/addeveningsnacks', {
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
                    const data = await fetch('http://localhost:5000/dashboard/adddinner', {
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
                    const data = await fetch(url + "/getexistingmealnutrients", {
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
                    const response = await fetch(url + "/getallcustommeals", {
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
                    const data = await fetch(url + "/addcustommeal",
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
                    const data = await fetch(url + "/removemeal",
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