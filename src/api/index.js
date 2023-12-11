import { auth } from "../firebase/config";

const url = "http://localhost:5000/dashboard"
const baseUrl = "http://localhost:5000"

export async function register(userInfo) {
    try {


        const data = await fetch(baseUrl + "/register", {
            method: "POST",
            headers: {

                "Content-Type": "application/json",

            },
            body: JSON.stringify(userInfo)
        })

        const pasredData = await data.json();
       
        return { result: pasredData };

    }
    catch (err) {
        console.log(err.message);
    }


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
    const data = await fetch('http://localhost:5000/dashboard/addbreakfast', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(breakfastFoodData)
    })
    if (data) {
        return { data: breakfastFoodData }
    }


}
export async function addMorningSnacksData(morningSnacksData) {
    const data = await fetch('http://localhost:5000/dashboard/addmorningsnacks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(morningSnacksData)
    })
    if (data) {
        return { data: morningSnacksData }
    }


}
export async function addLunch(lunchData) {
    const data = await fetch('http://localhost:5000/dashboard/addlunch', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(lunchData)
    })
    if (data) {
        return { data: lunchData }
    }


}
export async function addEveningSnacks(eveningSnacksData) {
    const data = await fetch('http://localhost:5000/dashboard/addeveningsnacks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eveningSnacksData)
    })
    if (data) {
        return { data: eveningSnacksData }
    }


}
export async function addDinner(dinnerData) {
    const data = await fetch('http://localhost:5000/dashboard/adddinner', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dinnerData)
    })
    if (data) {
        return { data: dinnerData }
    }


}
export async function getFoodNutrients(foodName) {

    const data = await fetch(`${url}/foodnutrients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ foodName })
    })
    const response = await data.json()
   
    if (response) {

      
        return { data: response.data }
    }
}
export async function getExistingMealNutrients(foodName, mealType) {

    const data = await fetch(url + "/getexistingmealnutrients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ foodName, mealType })
    })
    const parsed = await data.json();
    if (parsed) {

    
        return parsed;
    }
}
export async function getAllCustomMeals() {
    const response = await fetch(url + "/getallcustommeals");
    const parsedRes = await response.json();

    if (parsedRes) {
        return parsedRes;
    }
}
export async function addCustomMeal(CustomMealDetails) {
    const data = await fetch(url + "/addcustommeal",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(CustomMealDetails)
        });
    if (data) {
        return { data: CustomMealDetails }
    }
}
export async function removeMeal(foodItem, mealType) {
    const data = await fetch(url + "/removemeal",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ foodItem, mealType })
        })
}