import React, { useEffect, useState } from 'react'
import testfood from "../images/testfood.jpg";
import { FaCirclePlus } from "react-icons/fa6";
import { PiBowlFood } from "react-icons/pi";
import Select from 'react-select';
import Button from '../ReusableComponents/Button';
import { useLocation, useSearchParams } from 'react-router-dom';
import Heading from '../ReusableComponents/Heading';
import { useDispatch } from 'react-redux';
import { addBreakfastData, addMorningSnacksData, addLunch, addEveningSnacks, addDinner } from '../features/dashboard/dashboardSlice';

export default function MacroNutrientsContent() {
  const search = useLocation().search;
  const foodData = new URLSearchParams(search).get('fooddata');
  const mealType = new URLSearchParams(search).get('mealtype');

  const dispatch = useDispatch();
  const [qtyOptions, setQtyOptions] = useState([]);
  const [qty, setQty] = useState("100");
  const [unit, setUnit] = useState("g");
  const [foodInfo, setFoodInfo] = useState({});
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");
  const [carbs, setCarbs] = useState("");

  const unitOptions = [
    { value: "kg", label: "kg" },
    { value: "g", label: "g" },

  ]
  useEffect(() => {
    function generateQuantity() {
      let temp = [];
      for (let i = 1; i < 1000; i++) {
        temp.push({ value: i, label: `${i} ` })
      }
      setQtyOptions(temp);

    }
    generateQuantity();
  }, [])
  useEffect(() => {




    async function setFoodData() {
      const parsedFood = await JSON.parse(foodData);
      setFoodInfo(parsedFood);
      const objKey = Object.keys(parsedFood);
      setFoodName(objKey[0]);
      const { calories, protein, carbs, fats, fiber, sugar } = parsedFood[objKey[0]];
      setCalories(calories)
      setCarbs(carbs)
      setProtein(protein)
      setFats(fats)
      setFiber(fiber)
      setSugar(sugar)
    }


    setFoodData();



  }, [qty, unit,foodData])
  

  function calcNutrientsPerGram(foodInfo, qty){
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
    return newFoodObj;
  }
  function handleSubmit(e) {
    e.preventDefault();

    //TODO: Convert kg in grams or vice versa based on api data

    const newFoodInfo = foodInfo;

    newFoodInfo[foodName]["qty"] = Number(qty);
    const newFoodInfo2 = calcNutrientsPerGram(foodInfo, qty);

    if (mealType == "breakfast") {

     
      dispatch(addBreakfastData(newFoodInfo2));
    }
    else if (mealType == "morningsnacks") {
      dispatch(addMorningSnacksData(newFoodInfo2))
    }
    else if (mealType == "lunch") {
      dispatch(addLunch(newFoodInfo2))
    }
    else if (mealType == "eveningsnacks") {
      dispatch(addEveningSnacks(newFoodInfo2))
    }
    else if (mealType == "dinner") {
      dispatch(addDinner(newFoodInfo2))
    }
    // window.location.href = "/foodtracker"
  }
  return (
    <form onSubmit={handleSubmit} >
      {/* 
      <img className='rounded-xl py-4 w-[90vw] mx-4' src={testfood} alt='Food Image' /> */}

      <div className='mt-10'>
        <Heading title={"Nutrients Info."} logo={<PiBowlFood />} />
        <p className='text-center -mt-3 text-sm px-10'>Note: This data might not be very accurate. There could be slight variation.</p>


        <p className=' text-center text-xl mt-10'>Select Food Item : <span className='font-semibold uppercase'>
          {foodName}
        </span></p>
        <p className='text-center mt-8'>Select Quantity</p>
        <div className='flex justify-center items-center gap-4'>
          <Select
            placeholder="Select Quantity"
            className='mt-2'
            defaultValue={qty}
            onChange={option => setQty(option.value)}
            options={qtyOptions}
            defaultInputValue={qty}
          />
          <div className='w-1/4'>
            <Select
              placeholder="Units"
              className='mt-2'
              defaultValue={unit}
              onChange={option => setUnit(option.value)}
              options={unitOptions}
              defaultInputValue={unit}


            />
          </div>
        </div>
        <div className='flex flex-col   border-2 shadow-xl mx-5 rounded-xl mt-5'>
          <p className='text-2xl text-center border-b-slate-300 pb-4 border-b-2 font-semibold mt-5'>Macro-Nutrients Contents</p>
          <div className='flex flex-col gap-5 mt-10 mb-5'>
            <div className='flex justify-between px-16 '>
              <p className='font-semibold'>Calories</p>
              <p>{calories} Cal</p>
            </div>
            <div className='flex justify-between px-16  '>
              <p className='font-semibold'>Protein</p>
              <p>{protein} g</p>
            </div>

            <div className='flex justify-between px-16  '>
              <p className='font-semibold'>Fats</p>
              <p>{fats} g</p>
            </div>
            <div className='flex justify-between px-16  '>
              <p className='font-semibold'>Carbs</p>
              <p>{carbs} g</p>
            </div>
            <div className='flex justify-between px-16  '>
              <p className='font-semibold'>Fiber</p>
              <p>{fiber} g</p>
            </div>
            <div className='flex justify-between px-16  '>
              <p className='font-semibold'>Sugar</p>
              <p>{sugar} g</p>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button type='submit'>
            <Button textColor="white" fontSize={""} text={"Add Meal"} width={"40"} icon={<FaCirclePlus className='text-xl' />} />
          </button>
        </div>
      </div>
    </form>
  )
}
