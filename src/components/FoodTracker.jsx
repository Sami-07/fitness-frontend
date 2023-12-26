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
import { getUserAssessment } from "../features/Assessment/assessmentSlice";

export default function FoodTracker() {

  const dispatch = useDispatch();
  const assessmentData = useSelector(state => state.assessment.data);
  const dashboardApp = useSelector(state => state.app);

  const result = useSelector((state) => state.app.totalCalories);


  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(getUserAssessment())
  }, [])
  return (
    <div>
      {(assessmentData && Object.keys(assessmentData).length > 0 && dashboardApp && Object.keys(dashboardApp).length > 0) && <div>


        <Heading title={"Food Tracker"} logo={<IoFastFoodOutline />} desc={"Track your food Intake."} />

        <div className="flex justify-center items-center  border-2 mx-0 px-2 bg-white rounded-3xl -mt-1">
          {(dashboardApp && assessmentData && Object.keys(dashboardApp).length > 0) &&
            <MyRadialBar percentage={((dashboardApp.totalCalories / assessmentData.calorieIntake) * 100)} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />}

          <div className="font-medium">
            <p className="font-">Hit your daily Calorie Goal</p>
            {(dashboardApp && assessmentData) && <p className="text-xs">Remaining {" "}


              {(dashboardApp && assessmentData) && <span className="font-semibold">
                {(assessmentData.calorieIntake - dashboardApp.totalCalories).toPrecision(6)} Cal out of {assessmentData.calorieIntake} Cal
              </span>}


            </p>}
          </div>
        </div>
        <div className='bg-slate-300 px-2 pb-4 rounded-lg mx-1'>
          <Breakfast />
          <MorningSnacks />
          <Lunch />
          <EveningSnacks />
          <Dinner />
        </div>
      </div>}
    </div>
  )
}
