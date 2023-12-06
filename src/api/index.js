const url = "http://localhost:5000/dashboard"

export async function getMeals() {
    const result = await fetch(url + "/getmeals");
    const parsedResult = await result.json();
    return { data: parsedResult.data }
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
    console.log("r", response);
    if (response) {

        console.log("data", response)
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
    if(parsed){

        console.log("recent", parsed)
        return parsed;
    }
}
export async function getAllCustomMeals() {
    const response = await fetch(url + "/getallcustommeals");
    const parsedRes = await response.json();
    console.log("api", response);
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