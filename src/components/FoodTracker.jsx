import Heading from "../ReusableComponents/Heading";
import { IoFastFoodOutline } from "react-icons/io5";

import ReactApexChart from 'react-apexcharts';

import MyRadialBar from '../ReusableComponents/MyRadialBar';

//import this from dashboardSlice

import { calcPer, fetchMeals } from '../features/dashboard/dashboardSlice';
import Breakfast from './Breakfast';
import MorningSnacks from "./MorningSnacks";
import Lunch from "./Lunch";
import EveningSnacks from "./EveningSnacks";
import Dinner from "./Dinner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function FoodTracker() {

  const dispatch = useDispatch();
  const [maxCaloriesIntake, setMaxCaloriesIntake] = useState(2400);
  const result = useSelector((state) => state.app.totalCalories);
  const [totalCalories, setTotalCalories] = useState(result);
  const [remainingCalories, setRemainingCalories] = useState(maxCaloriesIntake - result)
  const [per, setPer] = useState((result / maxCaloriesIntake) * 100);

  useEffect(() => {
    dispatch(fetchMeals());
    

  }, [per])
  useEffect(() => {
    setPer((result / maxCaloriesIntake) * 100);


  }, [result, maxCaloriesIntake, per])
  return (
    <div>
      <Heading title={"Food Tracker"} logo={<IoFastFoodOutline />} desc={"Track your food Intake."} />

      {result >= 0 &&
        <div className="flex justify-center items-center  border-2 mx-4 px-2 bg-white rounded-3xl -mt-1">
          {per > 0 && <MyRadialBar percentage={(result / maxCaloriesIntake) * 100} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />}

          <div className="font-medium">
            <p className="font-">Hit your daily Calorie Goal</p>
            <p className="text-xs">Remaining <span className="font-semibold">
              {(maxCaloriesIntake - result).toPrecision(6)} Cal out of 2400 Cal
            </span></p>
          </div>
        </div>}
      <div className='bg-slate-300 px-2 pb-4'>
        <Breakfast />
        <MorningSnacks />
        <Lunch />
        <EveningSnacks />
        <Dinner />
      </div>
    </div>
  )
}
