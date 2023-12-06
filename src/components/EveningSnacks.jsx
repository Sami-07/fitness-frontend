import { useEffect, useState } from 'react'
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { redirectToNutrientsPage } from '../functions/redirectToNutrientsPage';
import { getMeals } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals } from '../features/dashboard/dashboardSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customNutrients } from '../functions/customNutrients';
import { removeMeal } from '../api';
export default function EveningSnacks() {

  const [totalCalories, setTotalCalories] = useState(0);

  const result = useSelector((state) => state.app.foodData.data);
  const calories = useSelector(state => state.app.eveningSnacksCalories)
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchMeals())
    function calcCalories() {
      let eveningSnacks = result[0].eveningSnacks;
      let sumCalories = 0;
      Object.keys(eveningSnacks).map(foodName => {
        sumCalories += eveningSnacks[foodName].calories;

      })
      setTotalCalories(sumCalories);
    }
    if (result && result.length > 0 && result[0].eveningSnacks) {

      calcCalories();
    }
  }, [totalCalories])
  function handleDelete(foodItem, mealType) {
    removeMeal(foodItem, mealType)
    window.location.href = "/foodtracker"
    toast.success('Food Item removed.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const [foodName, setFoodName] = useState("");
  return (
    <div>   <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
      <div>

        <div className='flex justify-between pt-4 pb-2'>
          <p>Evening Snacks</p><p>{calories} of 712 Cal</p>
        </div>
        <div className='bg-white rounded-xl flex flex-col gap-6 py-4 px-2'>
          {(result && result.length > 0 && result[0].eveningSnacks) && Object.keys(result[0].eveningSnacks).map(foodItem => {
            return (
              <div className=' flex justify-between'>
                <div>
                  <p className='text-xl capitalize '>{foodItem}</p>
                  <div className='flex gap-8 '>
                    <p>Qty :{result[0].eveningSnacks[foodItem].qty} g</p>
                    <p onClick={() => { {
                      if (result[0].eveningSnacks[foodItem].isCustomMeal) {

                        customNutrients({ foodName: foodItem, foodData: result[0].eveningSnacks[foodItem], mealType: "eveningsnacks" })
                      }
                      else {
                        redirectToNutrientsPage({ foodName: foodItem })
                      }
                    }}} className='underline underline-offset-2 cursor-pointer'>Nutrients Info.</p>
                  </div>
                </div>
                <div className='flex gap-4 items-center'><p>{result[0].eveningSnacks[foodItem].calories} Cal</p><FaCircleMinus onClick={() => handleDelete(foodItem, "eveningSnacks")} className=' text-xl' /> </div>
              </div>
            )
          })}
          <div className='flex justify-between gap-5 items-center px-4'>
            <input className='rounded-full w-full border-2 shadow-sm px-4 py-2' type='text' name='foodName' value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder='Search your food...' />
            <button onClick={() => {

              if (foodName.length != 0) {
                redirectToNutrientsPage({ foodName, mealType: "eveningsnacks" })
              }
              else {
                toast.error('Please Select a food name.', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            }} type='submit'>
              <FaCirclePlus className='text-mypink text-4xl' />
            </button>
          </div>
          <div className='flex gap-2 text-sm px-4'>
            <p>Can&#39;t find your meal?</p>
            <a href={`/custommeal?mealtype=eveningsnacks`} className='font-semibold underline underline-offset-2'> Add from Custom Meals </a>
          </div>
        </div>
      </div>
    </div>
  )
}
