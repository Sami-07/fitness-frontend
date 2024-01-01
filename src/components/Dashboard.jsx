import Heading from "../ReusableComponents/Heading";
import { MdOutlineFitbit, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { FaDumbbell } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import MyRadialBar from '../ReusableComponents/MyRadialBar';
import { useEffect, useState } from "react";
import { calcPercentage, fetchMeals, fetchWaterIntake } from "../features/dashboard/dashboardSlice";

import { useDispatch, useSelector } from "react-redux";
import { getUserAssessment } from "../features/Assessment/assessmentSlice";
import Button from "../ReusableComponents/Button";
import NotLoggedIn from "../ReusableComponents/NotLoggedIn";


import { getGoogleFitSteps } from "../api";
export default function Dashboard() {
    const dispatch = useDispatch();
    const [maxCaloriesIntake, setMaxCaloriesIntake] = useState(2400);


    const today = new Date();
    const date = today.getDate();

    const month = today.toLocaleString('default', { month: 'short' });
    const [per, setPer] = useState("");
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const assessmentData = useSelector(state => state.assessment.data);
    const dashboardApp = useSelector(state => state.app);
    useEffect(() => {
        dispatch(fetchMeals());
        dispatch(getUserAssessment())
        
        dispatch(fetchWaterIntake());
    }, [])
    // useEffect(() => {


    //     // IF SOMETHING breaks, shift the fetchMeals() to here from the above useEffect();

    //     // dispatch(fetchMeals());
    //     //  if(!isLoggedIn){
    //     //     window.location.href = "/register"
    //     //  }

    // }, [per])
    useEffect(() => {
        //  const steps =    getGoogleFitSteps();
        //  
    }, [])
    const waterIntake = useSelector(state => state.app.waterQty)
    useEffect(() => {
        dispatch(fetchWaterIntake());
    }, [])
    useEffect(() => {
        if (dashboardApp && dashboardApp.totalCalories && assessmentData && assessmentData.calorieIntake) {
            const x = (dashboardApp.totalCalories / assessmentData.calorieIntake) * 100
            
            setPer(x);
        }
    }, [dashboardApp, assessmentData])
    useEffect(() => {
        

    }, [assessmentData, dashboardApp])

    return (
        <div>

            {(assessmentData && Object.keys(assessmentData).length === 0) && <div>

                <p className="text-2xl mt-20 px-5 text-center">
                    Please Complete your assessment to use the fitness tracker.
                </p>
                <div className='text-center mb-5'>
                    <button type='submit' onClick={() => window.location.href = "/assessment"}>
                        <Button textColor="white" text={"Assessment"} width={"52"} icon={<MdOutlineKeyboardDoubleArrowRight className='text-3xl' />} />
                    </button>
                </div>


            </div>}

            {(!isLoggedIn) && <NotLoggedIn />}



            {(assessmentData && Object.keys(assessmentData).length > 0 && dashboardApp && Object.keys(dashboardApp).length > 0) && <div>


                <Heading title={"Fitness Tracker"} logo={<MdOutlineFitbit />} />
                <div onClick={() => window.location.href = "/foodtracker"} className="cursor-pointer bg-myprimecolor h-44 mx-4 border-2  shadow-xl rounded-3xl">


                    <div className="flex justify-center items-center  border-2 mx-0 px-2 bg-white rounded-3xl -mt-1">

                        {!per && <MyRadialBar percentage={0} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                        {(dashboardApp && assessmentData && Object.keys(dashboardApp).length > 0 && per) &&
                            <div>
                                <MyRadialBar percentage={per} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />
                            </div>}
                        <div className="font-medium">
                            <p className="font-">Hit your daily Calorie Goal</p>
                            {(dashboardApp && assessmentData) && <p className="text-xs">Remaining {" "}


                                {(dashboardApp && assessmentData) && <span className="font-semibold">
                                    {(assessmentData.calorieIntake - dashboardApp.totalCalories).toPrecision(6)} Cal out of {assessmentData.calorieIntake} Cal
                                </span>}


                            </p>}
                        </div>
                    </div>
                    <div className="cursor-pointer flex justify-center items-center gap-5 mt-2 text-white">
                        <div className="text-2xl">
                            <ImSpoonKnife />
                        </div>
                        <p>Add your meal to track</p>
                        <div className="text-2xl">
                            <IoMdAddCircle />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-2 px-5 gap-5 mt-8'>
                        <div onClick={() => window.location.href = "/waterintake"} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                            <h3 className='text-center font-semibold'>Water Intake</h3>
                            {(dashboardApp && !waterIntake) && <MyRadialBar percentage={0} title={"Water"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                            {(dashboardApp && waterIntake > 0) && <MyRadialBar percentage={(waterIntake / 5) * 100} title={"Water"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                            {(dashboardApp && waterIntake > 0) && <p className="text-xs">{waterIntake}L of 5 L remaining</p>}
                            {(dashboardApp && !waterIntake) && <p className="text-xs">0L of 5 L remaining</p>}
                        </div>
                        <div onClick={() => window.location.href = "/foodtracker"} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                            <h3 className='text-center font-semibold'>Calories Intake</h3>
                            {!per && <MyRadialBar percentage={0} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                            {(dashboardApp && assessmentData && Object.keys(dashboardApp).length > 0 && per) && <MyRadialBar percentage={per} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                            {(dashboardApp && assessmentData) && <p className="text-xs">
                                    {(assessmentData.calorieIntake - dashboardApp.totalCalories).toPrecision(4)}   of {assessmentData.calorieIntake} Cal  remaining
                                </p>}
                        </div>
                        <div className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                            <h3 className='text-center font-semibold'>Protein Intake</h3>
                            {(assessmentData && dashboardApp) && <MyRadialBar percentage={(dashboardApp.totalProtein / assessmentData.proteinIntake) * 100} title={"Protein"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                            {(assessmentData && dashboardApp) && <p className="text-xs">{assessmentData.proteinIntake - dashboardApp.totalProtein}g of {assessmentData.proteinIntake}g remaining</p>}
                        </div>
                        <div onClick={() => window.location.href = "/weighttracker"} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                            <h3 className='text-center font-semibold'>Weight Tracker</h3>
                            {assessmentData && <MyRadialBar percentage={((assessmentData.initialWeight - assessmentData.weight) / (assessmentData.initialWeight - assessmentData.goalWeight)) * 100} title={"Weight"} labelFontSize={"10px"} valueFontSize={"16px"} />}
                            {assessmentData && <p className="text-xs">{assessmentData.initialWeight - assessmentData.weight}kg of {assessmentData.initialWeight - assessmentData.goalWeight}kg lost</p>}
                        </div>


                    </div>
                </div>
                <div className="border-2 shadow-xl mx-4 px-4 rounded-3xl py-2 mt-8 flex  justify-between items-center ">
                    <div className="flex flex-col gap-1">

                        <div className="flex gap-2 items-center">  <FaDumbbell className="rotate-[-45deg]" />  <p>Training Tracker</p>
                        </div>
                        <p className="text-xl pl-2">Push Day</p>
                        <a className="bg-myprimecolor flex justify-center px-2  rounded-full py-1 items-center text-white" href="/trackworkout">
                            Track Workout
                            <MdKeyboardDoubleArrowRight className="text-2xl" />
                        </a>
                    </div>





                    <div className="text-center">

                        <p className="text-4xl">
                            {date}
                        </p>
                        <p className="text-xl">{month}</p>
                    </div>
                </div>
            </div>}
        </div >
    )
}
