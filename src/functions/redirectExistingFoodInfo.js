import { getExistingMealNutrients } from "../api";
import { getFoodNutrients } from "../api";
export async function redirectExistingFoodInfo({foodName, mealType}) {
 
const foodInfo = await getExistingMealNutrients(foodName, mealType);

  const tempFoodData = {
    [foodName]:
    {
      calories: foodInfo[foodName]["calories"],
      protein: foodInfo[foodName]["protein"],
      fats: foodInfo[foodName]["fats"],
      carbs: foodInfo[foodName]["carbs"],
      fiber: foodInfo[foodName]["fiber"],
      sugar: foodInfo[foodName]["sugar"],
      qty : foodInfo[foodName]["qty"]
    }
  }
  const p = JSON.stringify(tempFoodData)
  window.location.href = `/nutrientsinfo?fooddata=${p}&mealtype=${mealType}`
}