export async function redirectToNutrientsPageForCustomMeals({ foodData, mealType }) {


  console.log("function", foodData, mealType)
  const foodInfo = foodData;
  const tempFoodData = {
    [foodInfo["mealName"]]:
    {
      calories: foodInfo["calories"],
      protein: foodInfo["protein"],
      fats: foodInfo["fats"],
      carbs: foodInfo["carbs"],
      fiber: foodInfo["fiber"],
      sugar: foodInfo["sugar"],
      isCustomMeal : true
    }
  }
  console.log(tempFoodData);
  const p = JSON.stringify(tempFoodData)
  window.location.href = `/nutrientsinfo?fooddata=${p}&mealtype=${mealType}`
}