import Heading from "../ReusableComponents/Heading";
import { MdOutlineFitbit } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { FaDumbbell } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import MyRadialBar from '../ReusableComponents/MyRadialBar';
import { useEffect, useState } from "react";
import { calcPercentage, fetchMeals } from "../features/dashboard/dashboardSlice";

import { useDispatch, useSelector } from "react-redux";
export default function Dashboard() {
    const dispatch = useDispatch();
    const [maxCaloriesIntake, setMaxCaloriesIntake] = useState(2400);
    const result = useSelector((state) => state.app.totalCalories);
    const totalPer = useSelector((state) => state.app.totalPercentageCal);
    const [tempCal, setTempCal] = useState(result);
    const today = new Date();
    const date = today.getDate();
    const [per, setPer] = useState((tempCal / maxCaloriesIntake) * 100);
    const month = today.toLocaleString('default', { month: 'short' });
    useEffect(() => {
        async function X() {


            await dispatch(fetchMeals());
            // dispatch(calcPercentage(maxCaloriesIntake))
            console.log("this is state percentage", totalPer);

        }
        X();

    }, [])
    useEffect(() => {


        setPer((result / maxCaloriesIntake) * 100);
        console.log("percentage", per)
        setTempCal(result);
    }, [result, maxCaloriesIntake, tempCal])
    return (
        <div> <Heading title={"Fitness Tracker"} logo={<MdOutlineFitbit />} />
            <div onClick={() => window.location.href = "/foodtracker"} className="bg-myprimecolor h-[20vh] mx-4 border-2  shadow-xl rounded-3xl">

                {result > 0 && per > 0 && <div className="flex justify-center items-center  border-2 px-2 bg-white rounded-3xl -mt-1">
                    <MyRadialBar percentage={per} title={"Calories"} labelFontSize={"10px"} valueFontSize={"16px"} />
                    <div className="font-medium">
                        <p className="font-">Hit your daily Calorie Goal</p>
                        <p className="text-xs">Remaining <span className="font-semibold">
                            {(maxCaloriesIntake - result).toPrecision(6)} Cal out of 2400 Cal
                        </span></p>
                    </div>
                </div>}
                <div className="flex justify-center items-center gap-5 mt-2 text-white">
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
                    <div className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                        <h3 className='text-center font-semibold'>Water Intake</h3>
                        <MyRadialBar percentage={70} title={"Water"} labelFontSize={"10px"} valueFontSize={"16px"} />
                        <p className="text-xs">1.5 L of 5 L remaining</p>
                    </div>
                    <div className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                        <h3 className='text-center font-semibold'>Cal. Burnt</h3>
                        <MyRadialBar percentage={70} title={"Cal. burnt"} labelFontSize={"10px"} valueFontSize={"16px"} />
                        <p className="text-xs">432 of 570 Cal burnt </p>
                    </div>
                    <div className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                        <h3 className='text-center font-semibold'>Protein Intake</h3>
                        <MyRadialBar percentage={70} title={"Protein"} labelFontSize={"10px"} valueFontSize={"16px"} />
                        <p className="text-xs">70g of 120g remaining</p>
                    </div>
                    <div className={`shadow-xl border-2 flex flex-col justify-center items-center gap-0 p-4  rounded-2xl `} >
                        <h3 className='text-center font-semibold'>Weight Tracker</h3>
                        <MyRadialBar percentage={70} title={"Weight"} labelFontSize={"10px"} valueFontSize={"16px"} />
                        <p className="text-xs">12kg of 42kg lost</p>
                    </div>


                </div>
            </div>
            <div className="border-2 shadow-xl mx-4 px-4 rounded-3xl py-2 mt-8 flex  justify-between items-center ">
                <div className="flex flex-col gap-1">

                    <div className="flex gap-2 items-center">  <FaDumbbell className="rotate-[-45deg]" />  <p>Training Tracker</p>
                    </div>
                    <p className="text-xl pl-2">Push Day</p>
                    <a className="bg-myprimecolor flex justify-center px-2  rounded-full py-1 items-center text-white" href="/">
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
        </div>
    )
}
