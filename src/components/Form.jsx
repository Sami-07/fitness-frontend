import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBreakfastData } from '../features/dashboard/dashboardSlice';

export default function Form() {
    const dispatch = useDispatch();

    const [breakfastData, setBreakfastData] = useState([])
    const [eachFoodItem, setEachFoodItem] = useState({ foodName: "", calories: "", protein: "", carbs: "", fats: "", fiber: "", qty: "" })
    function clearInput() {
        setEachFoodItem({ foodName: "", calories: "", protein: "", carbs: "", fats: "", fiber: "", qty: "" })
    }
    function handleSubmit(e) {
        //Also save to database on every form submit of each food item
        e.preventDefault();

        const obj =
        {
            [eachFoodItem.foodName]: {
                calories: eachFoodItem.calories,
                protein: eachFoodItem.protein,
                carbs: eachFoodItem.carbs,
                fats: eachFoodItem.fats,
                fiber: eachFoodItem.fiber,
                qty: eachFoodItem.qty
            }
        }
        //NOTE : No need of pushing the food items to an array.
        dispatch(addBreakfastData(obj));
        //Just add individual food item to the database on every + click
        setBreakfastData(prevData => [...prevData, eachFoodItem]);

        clearInput();

    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-2 mt-1 p-2'>
            <input type='text' name='foodname' value={eachFoodItem.foodName} onChange={(e) => setEachFoodItem({ ...eachFoodItem, foodName: e.target.value })} placeholder='Enter Food name' className='w-52 h-20 border-2' />
            <input type='number' name='calories' value={eachFoodItem.calories} onChange={(e) => setEachFoodItem({ ...eachFoodItem, calories: e.target.value })} placeholder='calories' className='w-52 h-20 border-2' />
            <input type='number' name='protein' value={eachFoodItem.protein} onChange={(e) => setEachFoodItem({ ...eachFoodItem, protein: e.target.value })} placeholder='protein' className='w-52 h-20 border-2' />
            <input type='number' name='carbs' value={eachFoodItem.carbs} onChange={(e) => setEachFoodItem({ ...eachFoodItem, carbs: e.target.value })} placeholder='carbs' className='w-52 h-20 border-2' />
            <input type='number' name='fats' value={eachFoodItem.fats} onChange={(e) => setEachFoodItem({ ...eachFoodItem, fats: e.target.value })} placeholder='fats' className='w-52 h-20 border-2' />
            <input type='number' name='fiber' value={eachFoodItem.fiber} onChange={(e) => setEachFoodItem({ ...eachFoodItem, fiber: e.target.value })} placeholder='fiber' className='w-52 h-20 border-2' />
            <input type='number' name='qty' value={eachFoodItem.qty} onChange={(e) => setEachFoodItem({ ...eachFoodItem, qty: e.target.value })} placeholder='qty' className='w-52 h-20 border-2' />
            <button className="border-2 p-4 text-2xl rounded-full">+</button>
        </form>
    )
}
