import React, { useState } from 'react'
import Heading from '../ReusableComponents/Heading'
import { BiSolidDish } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { addCustomMeal } from '../features/CustomMeal/customMealSlice';
import { IoIosAddCircle } from "react-icons/io";
import Button from '../ReusableComponents/Button';
export default function AddCustomMeal() {
    const [mealName, setMealName] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [fats, setFats] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fiber, setFiber] = useState("");
    const [sugar, setSugar] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const mealData = {
            email: "s.a.sami359359@gmail.com",
            mealName,
            calories,
            protein,
            fats,
            fiber,
            carbs,
            sugar
        }
        dispatch(addCustomMeal(mealData));
    }
    return (
        <div>
            <Heading title={"Your Custom Meals"} logo={<BiSolidDish />} desc={"If you are unable to find your meal, add your meal with macro nutrients detail per 100g to track your food in take."} />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                <label htmlFor='mealName' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        MealName
                    </p>
                    <input type='text' name='mealName' value={mealName} onChange={e => setMealName(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Meal Name' />
                </label>
                <label htmlFor='calories' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        Calories
                    </p>
                    <input type='text' name='calories' value={calories} onChange={e => setCalories(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Calories' />
                </label>
                <label htmlFor='calories' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        Protein
                    </p>
                    <input type='text' name='protein' value={protein} onChange={e => setProtein(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Protein' />
                </label>
                <label htmlFor='calories' className='flex flex-col items-center'>
                    <p className='text-lg'>

                        Fats
                    </p>
                    <input type='text' name='fats' value={fats} onChange={e => setFats(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Fats' />
                </label>
                <label htmlFor='calories' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        Carbs
                    </p>
                    <input type='text' name='carbs' value={carbs} onChange={e => setCarbs(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Carbs' />
                </label>
                <label htmlFor='calories' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        Fiber
                    </p>
                    <input type='text' name='fiber' value={fiber} onChange={e => setFiber(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Fiber' />
                </label>
                <label htmlFor='calories' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        Sugar
                    </p>
                    <input type='text' name='sugar' value={sugar} onChange={e => setSugar(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Sugar' />
                </label>
                <div className='text-center'>
                    <button type='submit'>
                        <Button textColor="white" fontSize={""} text={"Add Custom Meal"} width={"40"} icon={<IoIosAddCircle className='text-xl' />} />
                    </button>
                </div>
            </form>
        </div>

    )
}
