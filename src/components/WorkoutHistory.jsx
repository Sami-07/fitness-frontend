import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { CgNotes } from "react-icons/cg";
import Heading from '../ReusableComponents/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutForADay } from '../features/Workout/workoutSlice';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
export default function WorkoutHistory() {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const [formattedDate, setFormattedDate] = useState("");
    const workout = useSelector(state => state.workout);
    useEffect(() => {
        console.log("component data", workout);
    }, [workout])
    function handleFetch(newValue) {
        setValue(newValue);
        const selectedDate = `${newValue.$D}/${newValue.$M + 1}/${newValue.$y}`
        setFormattedDate(selectedDate);
        dispatch(fetchWorkoutForADay(selectedDate))
    }
    return (
        <div>
            <Heading title="Workout History" logo={<CgNotes />} desc={"Analyze your workout with your past workout data for each exercise."} />
            <div className='border-b-2 mx-20 mb-5'>
                <p className='text-center font-semibold text-xl my-4'>Select a Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={value} onChange={(newValue) => handleFetch(newValue)} />
                </LocalizationProvider>
            </div>
            {workout && workout.workoutDataForADay && !workout.workoutDataForADay.status &&
                <p className='text-center'>You did not track your workout on<br /> <span className='text-xl'>{formattedDate}</span></p>}
            {workout && workout.workoutDataForADay && workout.workoutDataForADay.status && <div>
                <p className='text-center'>You did the following workouts on <br />  <span className='text-xl'>{formattedDate} </span>  </p>
                <div className='flex flex-col justify-center gap-2  items-center mt-5'>
                    {Object.keys(workout.workoutDataForADay.workoutDetails).map(each => {
                        return (
                            <div className='cursor-pointer border-2 border-pink-400 p-3 rounded-xl flex  justify-center  items-center gap-2 hover:bg-mypink hover: hover:text-white transition-all'>{each} <MdKeyboardDoubleArrowRight /></div>
                        )
                    })}
                </div>
            </div>}
            {/* <EachDayAnalysis data={ } />
            <WeekAnalysis data={ } />
            <MonthAnalysis data={ } /> */}
        </div>
    )
}
