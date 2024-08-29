import { useEffect, useState } from 'react'
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { redirectToNutrientsPage } from '../functions/redirectToNutrientsPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals } from '../features/dashboard/dashboardSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customNutrients } from '../functions/customNutrients';
import { fetchResults, removeMeal } from '../api';
import { FiArrowUpRight } from "react-icons/fi";
export default function Lunch() {
  const [searchResults, setSearchResults] = useState([]);
  async function handleChange(e) {
    setFoodName(e.target.value)

    const res = await fetchResults(e.target.value);
    
    const nameArr = (res.data).map(item => {
      return item.name
    })
    setSearchResults(nameArr);
    
  }
  const [totalCalories, setTotalCalories] = useState(0);

  const result = useSelector((state) => state.app.foodData.data);
  const calories = useSelector(state => state.app.lunchCalories)
  const dispatch = useDispatch();
  useEffect(() => {


    // dispatch(fetchMeals())

    function calcCalories() {
      let lunch = result[0].lunch;
      let sumCalories = 0;
      Object.keys(lunch).map(foodName => {
        sumCalories += lunch[foodName].calories;

      })
      setTotalCalories(sumCalories);
    }
    if (result && result.length > 0 && result[0].lunch) {

      calcCalories();
    }

  }, [totalCalories])
  function handleDelete(foodItem, mealType) {
    removeMeal(foodItem, mealType)
    // window.location.href = "/foodtracker"
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
    <div> <ToastContainer
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
          <p>Lunch</p><p>{calories.toFixed(2)} Cal</p>
        </div>
        <div className='bg-white rounded-xl flex flex-col gap-6 py-4 px-2'>
          {(result && result.length > 0 && result[0].lunch) && Object.keys(result[0].lunch).map(foodItem => {

            return (
              <div className=' flex justify-between'>
                <div>
                  <p className='text-xl capitalize '>{foodItem}</p>
                  <div className='flex gap-8 '>
                    <p>Qty :{result[0].lunch[foodItem].qty} g</p>
                    <p onClick={() => {
                      if (result[0].lunch[foodItem].isCustomMeal) {

                        customNutrients({ foodName: foodItem, foodData: result[0].lunch[foodItem], mealType: "lunch" })
                      }
                      else {
                        redirectToNutrientsPage({ foodName: foodItem })
                      }
                    }} className='underline underline-offset-2 cursor-pointer'>Nutrients Info.</p>
                  </div>
                </div>
                <div className='flex gap-4 items-center'><p>{result[0].lunch[foodItem].calories.toFixed(2)} Cal</p><FaCircleMinus onClick={() => handleDelete(foodItem, "lunch")} className=' text-xl' /> </div>
              </div>
            )
          })}
          <div className='flex justify-between gap-5 items-center px-4'>
            <input autocomplete="off" className='rounded-full w-full border-2 shadow-sm px-4 py-2' type='text' name='foodName' value={foodName} onChange={(e) => handleChange(e)} placeholder='Search your food...' />
            <button onClick={() => {

              if (foodName.length != 0) {
                toast.error('Please select a food from the below list.', {
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
          {(searchResults.length === 0 && foodName.length > 0) && <p className='px-4 font-semibold bg-blue-100 py-2 rounded-xl'>No Search Results yet.<br>

          </br><span className='font-normal text-sm'> Try Searching for general foods (Chicken, Panner, Dosa etc.)</span></p>}
          {searchResults.length > 0 && <div className=' w-full px-2 py-2'>
            <p className='font-semibold'>
              Search Results:
            </p>
            {searchResults.map(item => {
              return (

                <div key={item} onClick={() => redirectToNutrientsPage({ foodName: item, mealType: "lunch" })} className='cursor-pointer flex justify-between items-center p-4 border-2 mb-1 bg-blue-100 border-gray-400 rounded-xl'>{item} <FiArrowUpRight className='text-2xl' /></div>



              )

            })}

          </div>}
          <div className='flex gap-2 text-sm px-4'>
            <p>Can&#39;t find your meal?</p>
            <a href={`/custommeal?mealtype=lunch`} className='font-semibold underline underline-offset-2'> Add from Custom Meals </a>
          </div>
        </div>
      </div>
    </div>
  )
}
