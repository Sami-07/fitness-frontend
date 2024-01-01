import React, { useEffect, useState } from 'react'
import Heading from '../ReusableComponents/Heading'
import { FaGlassWater } from "react-icons/fa6";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci"
import Button from '../ReusableComponents/Button';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addWater, fetchWaterIntake } from '../features/dashboard/dashboardSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function WaterIntake() {
    const dashboard = useSelector(state => state.app)
    const waterIntake = useSelector(state => state.app.waterQty)
    useEffect(() => {
        dispatch(fetchWaterIntake());
    }, [])
    
    useEffect(() => {
        if (dashboard && dashboard.addStatus) {
            setTimeout(() => {
                window.location.href = "/mydashboard"
            }, 2000)
            toast.success("Logged Water Intake", {
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
    }, [dashboard.addStatus])
    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();
    function increase() {
        setQty(prevQty => prevQty += 100)
    }
    function decrease() {
        setQty(prevQty => prevQty -= 100)
    }
    function increase() {
        setQty(prevQty => prevQty += 100)
    }
    function handleAdd() {
        dispatch(addWater(qty));
    }
    return (
        <div>
            <ToastContainer
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
            <Heading title="Water Intake" logo={<FaGlassWater />} desc={"Track your daily water intake. Stay Hydrated."} />
            {(dashboard && waterIntake > 0) && <div className='flex justify-center items-center flex-col text-2xl'>

                Water Consumed today:
                <p className=' font-semibold '>{waterIntake} L</p>
            </div>}
            <div className='flex justify-center items-center gap-5 text-8xl mt-20'>
                <CiSquareMinus onClick={decrease} />

                <p className='text-4xl'><span className='font-semibold'>
                    {qty}
                </span> ML</p>
                <CiSquarePlus onClick={increase} />
            </div>
            <div onClick={handleAdd} className='cursor-pointer'>

                <Button textColor="white" text={"Log"} width={"52"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />

            </div>



        </div>
    )
}
