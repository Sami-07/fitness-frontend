export function calcNutrients(foodInfo, qty, mealType) {

    const foodName = Object.keys(foodInfo)[0];
    const { calories, protein, fats, fiber, sugar, carbs } = foodInfo[foodName];
    const calPerG = calories / 100;
    const proteinPerG = protein / 100;
    const carbsPerG = carbs / 100;
    const fatsPerG = fats / 100;
    const fiberPerG = fiber / 100;
    const sugarPerG = sugar / 100;

    const newFoodObj = {
        [foodName]: {
            calories: calPerG * qty,
            protein: proteinPerG * qty,
            fats: fatsPerG * qty,
            carbs: carbsPerG * qty,
            fiber: fiberPerG * qty,
            sugar: sugarPerG * qty,
            qty: qty
        }
    }
    const p = JSON.stringify(newFoodObj)
    window.location.href = `/nutrientsinfo?fooddata=${p}&mealtype=${mealType}`
    // return newFoodObj;
}