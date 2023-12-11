export async function customNutrients({foodName, foodData, mealType}) {


   
    const foodInfo = foodData;
      const tempFoodData = {
        [foodName]:
        {
          calories: foodInfo["calories"],
          protein: foodInfo["protein"],
          fats: foodInfo["fats"],
          carbs: foodInfo["carbs"],
          fiber: foodInfo["fiber"],
          sugar: foodInfo["sugar"]
        }
      }
     
      const p = JSON.stringify(tempFoodData)
      window.location.href = `/nutrientsinfo?fooddata=${p}&mealtype=${mealType}`
    }