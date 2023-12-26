import React, { useEffect, useState } from 'react'
import Heading from '../ReusableComponents/Heading'
import { IoIosBody } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Button from '../ReusableComponents/Button';
import { addBodyWeight, updateBodyWeight } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import scale from "../images/scale.png";
import 'react-toastify/dist/ReactToastify.css';
import { getTodayBodyWeight } from '../features/BodyWeight/bodyWeightSlice';
export default function WeightTracker() {
    const [updateToggle, setUpdateToggle] = useState(false);
    useEffect(() => {
        dispatch(getTodayBodyWeight());
    }, [])
    const dispatch = useDispatch();

    const weightTracking = useSelector(state => state.bodyWeight)
    useEffect(() => {
        

        
    }, [weightTracking])
    const [weightData, setWeightData] = useState("");
    const [weight, setWeight] = useState(null);
    const today = new Date();
    const date = today.getDate();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    async function handleSubmit(e) {
        e.preventDefault();
        if (weight) {
            const res = await addBodyWeight({ weight });
            if (res.parsedRes.status) {
                setTimeout(() => {
                    window.location.href = "/weighttracker"
                }, 2000)
                toast.success('Weight tracked successfully!', {
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
                toast.error('Could not add weight.', {
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



        }
        else {
            toast.error('Enter a Valid Weight Value.', {
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

    }
    async function updateWeight(e) {
        e.preventDefault();
        
        if (weight) {
            const res = await updateBodyWeight({ weight });
            if (res.parsedRes.status) {
                setTimeout(() => {
                    window.location.href = "/weighttracker"
                }, 2000)
                toast.success('Weight Updated successfully!', {
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
                toast.error('Could not update weight.', {
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


        }
        else {
            toast.error('Enter a Valid Weight Value.', {
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

    }
    return (
        <div>  <Heading title={"Track Body Weight"} logo={<IoIosBody />} desc={"Track your body weight every day and analyze your progress."} />
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
            <img src={scale} className='w-1/4 mx-auto mb-10' alt='' />
            {weightTracking.trackedWeightToday && <div>

                <div className=" text-2xl text-center flex justify-center items-center gap-3 my-2">

                    <p>
                        {date}
                    </p>
                    <p >{month}</p>
                    <p >{year}</p>
                </div>

                <p className='text-center text-xl'>
                    You have already tracked your weight today as
                    <br></br><p className='text-2xl font-semibold'>
                        {weightTracking.todayWeight} KG.
                    </p>

                </p>




                <div onClick={() => setUpdateToggle(!updateToggle)} className='text-center mb-5'>
                    {!updateToggle && <button type='submit'>
                        <Button textColor="white" text={"Edit Weight"} width={"52"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
                    </button>}
                </div>

                {updateToggle && <div className='text-center mt-5'>
                    <div>Update your weight:

                        <form onSubmit={updateWeight}>

                            <input type='text' name='weight' value={weight} onChange={e => setWeight(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-lg border-2 px-4' placeholder='Current Weight (in kg)' />
                            <div className='text-center mb-5'>
                                <button type='submit'>
                                    <Button textColor="white" text={"Update"} width={"52"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
                                </button>
                            </div>
                        </form>

                    </div>

                </div>}




            </div>}

            {!weightTracking.trackedWeightToday && <div className='text-center mt-5'>
                <div>Enter your Weight as on:
                    <div className=" text-2xl text-center flex justify-center items-center gap-3 my-2">

                        <p>
                            {date}
                        </p>
                        <p >{month}</p>
                        <p >{year}</p>
                    </div>


                </div>
                <form onSubmit={handleSubmit}>

                    <input type='text' name='weight' value={weight} onChange={e => setWeight(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-lg border-2 px-4' placeholder='Current Weight (in kg)' />
                    <div className='text-center mb-5'>
                        <button type='submit'>
                            <Button textColor="white" text={"Add to Track"} width={"52"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
                        </button>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}
