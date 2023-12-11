import { getFoodNutrients } from "../api";
export async function redirectToNutrientsPage({foodName, mealType}) {
  const response = await getFoodNutrients(foodName);

  const foodInfo = response.data[0];

  const tempFoodData = {
    [foodInfo["name"]]:
    {
      calories: foodInfo["calories"],
      protein: foodInfo["protein_g"],
      fats: foodInfo["fat_total_g"],
      carbs: foodInfo["carbohydrates_total_g"],
      fiber: foodInfo["fiber_g"],
      sugar: foodInfo["sugar_g"]
    }
  }
  const p = JSON.stringify(tempFoodData)
  window.location.href = `/nutrientsinfo?fooddata=${p}&mealtype=${mealType}`
}