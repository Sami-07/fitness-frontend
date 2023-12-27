import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { CgNotes } from "react-icons/cg";
import Heading from '../ReusableComponents/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutForADay, getAllExercises, getExercises } from '../features/Workout/workoutSlice';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import EachDayAnalysis from './EachDayAnalysis';
import Select from 'react-select';
export default function WorkoutHistory() {
    const dispatch = useDispatch();
    const allMuscles =
        ["chest", "shoulders", "triceps",
            "biceps", "lats", "middle_back", "lower_back", "traps",
            "quadriceps", "hamstrings", "calves", "abductors", "adductors", "glutes",
            "abdominals", "forearms", "neck"]

    const tempMuscleOptions = allMuscles.map(muscle => ({
        label: muscle,
        value: muscle
    }));
    // setMuscleOptions(tempMuscleOptions);
    const [value, setValue] = useState();
    const [formattedDate, setFormattedDate] = useState("");
    const [selectedExercise, setSelectedExercise] = useState("");
    const [muscle, setMuscle] = useState("");
    const [exerciseOptions, setExerciseOptions] = useState("");
    const [exercise, setExercise] = useState("");
    const workout = useSelector(state => state.workout);
    useEffect(() => {
        dispatch(getAllExercises());

        dispatch(getExercises(muscle));
    }, [muscle])
    useEffect(() => {
        if (workout && workout.exercises) {

            console.log("component data", workout.exercises);
            const ExercisesNames = workout.exercises.map(each => { return ({ label: each.name, value: each.name }) })
            console.log(ExercisesNames);
            setExerciseOptions(ExercisesNames);
        }
    }, [workout, muscle])
    function handleFetch(newValue) {
        setSelectedExercise("");
        setValue(newValue);
        const selectedDate = `${newValue.$D}/${newValue.$M + 1}/${newValue.$y}`
        setFormattedDate(selectedDate);
        dispatch(fetchWorkoutForADay(selectedDate))
    }
    return (
        <div>
            <Heading title="Workout History" logo={<CgNotes />} desc={"Analyze your workout with your past workout data for each exercise."} />
            <div className='border-b-2 mx-20 mb-5'>
            <p className='text-center font-semibold'>Analyze an exercise during </p>
                <div className='flex justify-center items-center gap-5 my-2 mb-5'>

                    <p className='bg-mypink text-white px-3 text-sm py-2 rounded-xl'>Past 7 days</p>
                    <p className='bg-mypink text-white px-3 text-sm py-2 rounded-xl'>Past 30 days</p>
                </div>
                <div className='my-2'>

                    <p className=''>Muscle Group</p>
                    <Select
                        placeholder="Select Muscle Group"
                        className='text-center'
                        defaultValue={muscle}
                        onChange={option => setMuscle(option.value)}
                        options={tempMuscleOptions}
                    />
                </div>
                {(muscle && exerciseOptions) && <div>
                    <p className=''>Exercise</p>
                    <Select
                        placeholder="Select Exercise"
                        className='text-center'
                        defaultValue={exercise}
                        onChange={option => setExercise(option.value)}
                        options={exerciseOptions}
                    />
                </div>}
                <div className='flex justify-center gap-3 items-center my-5'>
                    <span className='border-b-2 w-full'></span>
                    <p>OR</p>
                    <span className='border-b-2 w-full'></span>
                </div>

                <p className='text-center font-semibold text-xl my-4'>Select a Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={value} onChange={(newValue) => handleFetch(newValue)} />
                </LocalizationProvider>
            </div>
            {workout && workout.workoutDataForADay && !workout.workoutDataForADay.status &&
                <p className='text-center'>You did not track your workout on<br /> <span className='text-xl'>{formattedDate}</span></p>}
            {workout && workout.workoutDataForADay && workout.workoutDataForADay.status && <div>
                <p className='text-center'>You did the following workouts on <br />  <span className='text-xl'>{formattedDate} </span>  </p>
                {selectedExercise && <p className='font-semibold mx-10 text-center my-2 border-t-2 border-b-2 py-2'>Scroll down for Graphical Analysis.</p>}
                <div className='flex flex-col justify-center gap-2  items-center mt-5'>
                    {Object.keys(workout.workoutDataForADay.workoutDetails).map(each => {
                        return (
                            <div onClick={() => setSelectedExercise(each)} className={`${each === selectedExercise ? `bg-myprimecolor border-none text-white` : ``} cursor-pointer border-2 border-[#4942E4] p-3 rounded-xl flex  justify-center  items-center gap-2 hover:scale-105 transition-all`}>{each} <MdKeyboardDoubleArrowRight /></div>
                        )
                    })}
                </div>
            </div>}

            {(selectedExercise && (workout && workout.workoutDataForADay && workout.workoutDataForADay.status)) && <EachDayAnalysis exerciseName={selectedExercise} data={workout.workoutDataForADay.workoutDetails[selectedExercise]} />}
            {/* <WeekAnalysis data={ } />
            <MonthAnalysis data={ } /> */}
        </div>
    )
}
