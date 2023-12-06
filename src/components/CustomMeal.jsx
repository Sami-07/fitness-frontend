import React, { useEffect } from 'react'
import Heading from '../ReusableComponents/Heading'
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomMeals } from '../features/CustomMeal/customMealSlice';
import { IoMdAddCircle } from "react-icons/io";
import Button from '../ReusableComponents/Button';
import { useLocation } from 'react-router-dom';
import { addBreakfastData, addDinner, addEveningSnacks, addLunch, addMorningSnacksData } from '../features/dashboard/dashboardSlice';
import { redirectToNutrientsPageForCustomMeals } from '../functions/redirectToNutrientsPageForCustomMeals';
export default function CustomMeal() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.customMeals.allCustomMeals.data);
  const search = useLocation().search;
  const mealType = new URLSearchParams(search).get('mealtype');
  console.log("mealtype", mealType);
  console.log("data", data);
  useEffect(() => {
    dispatch(fetchCustomMeals());
  }, [])
  function handleSubmit(mealInfo) {
    const { mealName, calories, protein, fats, carbs, sugar, fiber } = mealInfo;
    const customMealData = {
      mealName, calories, protein, fats, carbs, sugar, fiber
    }

    switch (mealType) {
      case "breakfast":
        dispatch(addBreakfastData(customMealData));
        break;
      case "morningsnacks":
        dispatch(addMorningSnacksData(customMealData));
        break;
      case "lunch":
        dispatch(addLunch(customMealData));
        break;
      case "eveningsnacks":
        dispatch(addEveningSnacks(customMealData));
        break;
      case "dinner":
        dispatch(addDinner(customMealData));
        break;
    }

  }
  return (
    <div> <Heading title={"Your Custom Meals"} logo={<MdOutlineFreeBreakfast />} desc={"Add a Custom Meal from the following added meals list."} />
      {data && data.map(each => {
        return (
          <div className='text-xl border-2 mx-10 py-5 shadow-xl rounded-xl'>

            <div className='flex justify-between px-20'>
              <p className='font-semibold'>{each.mealName}</p>       <p>{each.calories} Cal</p>
            </div>


            <div className='text-center'>
              <button type='submit' onClick={() => redirectToNutrientsPageForCustomMeals({ foodData: each, mealType: mealType })}  >
                <Button textColor="white" fontSize={""} text={`View more info.`} width={"40"} />
              </button>
            </div>
          </div>
        )
      })}
      <a href='/addcustommeal'>

        <Button textColor="white" fontSize={""} text={`Add new`} width={"40"} icon={<IoMdAddCircle className='text-xl' />} />
      </a>
    </div>
  )
}
