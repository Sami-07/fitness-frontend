import React, { useEffect, useState } from 'react'
import Heading from '../ReusableComponents/Heading'
import { LiaRunningSolid } from "react-icons/lia";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, deleteSet, editSet, changeWorkoutDay, getExercises, getWorkoutDetails } from '../features/Workout/workoutSlice';
import Button from '../ReusableComponents/Button';
import { MdKeyboardDoubleArrowRight, MdModeEditOutline } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEditNote } from 'react-icons/md';
import MyModal from '../ReusableComponents/MyModal';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import NotLoggedIn from '../ReusableComponents/NotLoggedIn';

// const workoutDetails = {
//   chestPress: [{ weight: 10, reps: 12 }, { weight: 10, reps: 12 }, { weight: 10, reps: 12 }],

//   dumbbellPress: [{ weight: 10, reps: 12 }, { weight: 10, reps: 12 }, { weight: 10, reps: 12 }]
// }

export default function TrackWorkout() {
  const [value, setValue] = useState("");
  //CONSTANTS
  const workoutDayOptions = [{
    label: "Push Day", value: "push"
  }, {
    label: "Pull Day", value: "pull"
  }, {
    label: "Leg Day", value: "legs"
  }, {
    label: "Others", value: "others"
  }]


  const categorizedMuscles = {
    push: ["chest", "shoulders", "triceps"],
    pull: ["biceps", "lats", "middle_back", "lower_back", "traps"],
    legs: ["quadriceps", "hamstrings", "calves", "abductors", "adductors", "glutes"],
    others: ["abdominals", "forearms", "neck"]
  }

  //useEffect to generate reps and weight options
  useEffect(() => {
    function generateReps() {
      const options = []
      for (let i = 0; i <= 40; i++) {
        options.push({ label: i, value: i })
      }
      setRepsOptions(options);
    }
    function generateWeightOptions() {
      let options = []
      for (let i = 0; i <= 300; i += 0.5) {
        options.push({ value: i, label: `${i} KG` })

      }
      setWeightOptions(options);
    }
    generateReps();
    generateWeightOptions();
  }, [])

  //redux states
  const dispatch = useDispatch();
  const allExerciseOptions = useSelector(state => state.workout.exercises);
  const workouts = useSelector(state => state.workout)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  //states for generated options
  const [repsOptions, setRepsOptions] = useState("");
  const [weightOptions, setWeightOptions] = useState("");
  const [muscleOptions, setMuscleOptions] = useState("");
  const [exerciseOptions, setExerciseOptions] = useState("");

  //states for adding new workout set
  const [workoutDay, setWorkoutDay] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [muscle, setMuscle] = useState("");
  const [exercise, setExercise] = useState("");

  const [editWorkout, setEditWorkout] = useState(false);

  //state to track the opening or closing of react-modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //states for editing workout set values
  const [editExercise, setEditExercise] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editReps, setEditReps] = useState("");
  const [prevWeight, setPrevWeight] = useState("");
  const [prevReps, setPrevReps] = useState("");

  //functions to open or close the react-modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //function to dispatch edit event of a set
  function handleEditSet() {

    const data = { editExercise, editWeight, editReps, prevWeight, prevReps }
    dispatch(editSet(data))
  }

  //function to dispatch delete event of a set
  function handleDelete() {

    const data = { editExercise, prevWeight, prevReps }
    dispatch(deleteSet(data))
  }

  //Generating Date with String Type of month and week
  const date = new Date()
  const todayDate = date.getDate();
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.getFullYear();
  const day = date.toLocaleString("en-US", { weekday: "long" });



  useEffect(() => {
    let selectedMuscles = categorizedMuscles[workoutDay] || [];
    if (workouts) {

      if (workouts.workoutDayInState) {
        
        selectedMuscles = categorizedMuscles[workouts.workoutDayInState]
      }
    }
    const tempMuscleOptions = selectedMuscles.map(muscle => ({
      label: muscle,
      value: muscle
    }));
    setMuscleOptions(tempMuscleOptions);
  }, [workoutDay, workouts]);

  useEffect(() => {
    dispatch(getWorkoutDetails());

  }, [])
  useEffect(() => {
    if (allExerciseOptions) {
      const x = allExerciseOptions.map(each => {
        return {
          label: each.name,
          value: each.name
        }
      })
      setExerciseOptions(x);
    }
  },
    [allExerciseOptions])

  useEffect(() => {
    if (muscle.length > 0) {
      dispatch(getExercises(muscle))
    }
  }, [muscle])


  //function to dispatch addWorkout event
  function handleSubmit(e) {
    e.preventDefault();
    const data = { workoutDay, muscle, exercise, weight, reps };
    if ((!workouts.workoutDayInState && !workoutDay) || !muscle || !exercise || !weight || !reps) {
      toast.error("Please Enter all details", {
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
      dispatch(addWorkout(data));
    }

  }

  //function to edit workoutDay
  function handleEdit(e) {
    e.preventDefault();
    dispatch(changeWorkoutDay(workoutDay));
  }

  //useEffect to display pop up message for every event
  useEffect(() => {
    if (workouts.msg) {
      toast.success(workouts.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {

        window.location.href = "/trackworkout"
      }, [2000])
    }
  }, [workouts.msg])


  return (
    <div>
      {(!isLoggedIn) ? <NotLoggedIn /> :
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


          <Heading title={"Add Workout"} desc={"Add all the workouts you performed during the day."} logo={<LiaRunningSolid />} />

          <p className='text-center font-semibold text-xl'>{todayDate} {month} {year} {day}</p>
          {editWorkout && <form onSubmit={handleEdit} className='mx-20 my-10'>
            <div>
              <p className='font-semibold'>
                Change Your Workout Day
              </p>
              <Select
                placeholder="Select your Workout Day"
                className='text-center'
                defaultValue={workoutDay}
                onChange={option => setWorkoutDay(option.value)}
                options={workoutDayOptions}
              /><hr></hr>
            </div>
            <div className='text-center mb-5'>
              <button type='submit'>
                <Button textColor="white" text={"Change"} width={"40"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
              </button>
            </div>
          </form>}
          {!editWorkout && <form onSubmit={handleSubmit} className='mx-20 mt-10 flex flex-col gap-5'>

            {(workouts && workouts.workoutDayInState) ? <div className='flex justify-center items-center gap-4'> <h1 className='underline underline-offset-4 decoration-[#4942E4] decoration-2 text-center text-xl font-semibold uppercase'>{workouts.workoutDayInState} Day</h1>
              <div onClick={() => setEditWorkout(!editWorkout)} className='cursor-pointer flex border-gray-300 border-2 rounded-lg px-2 justify-center items-center'>

                <MdEditNote className='text-mypink text-xl' />
                <p className='text-sm'>Edit</p>
              </div>
            </div> : <div>
              <p className=''>
                Workout Day
              </p>
              <Select
                placeholder="Select your Workout Day"
                className='text-center'
                defaultValue={workoutDay}
                onChange={option => setWorkoutDay(option.value)}
                options={workoutDayOptions}
              /><hr></hr>
            </div>}


            {((workouts && workouts.workoutDayInState) || workoutDay.length > 0) && <div>

              <div>
                <p className=''>Muscle Group</p>
                <Select
                  placeholder="Select Muscle Group"
                  className='text-center'
                  defaultValue={muscle}
                  onChange={option => setMuscle(option.value)}
                  options={muscleOptions}
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
              {exercise && <div className='flex gap-5 mt-10 justify-center '>
                <div>
                  <p className=''></p>
                  <Select
                    placeholder=" Weight"
                    className='text-center'
                    defaultValue={weight}
                    onChange={option => setWeight(option.value)}
                    options={weightOptions}
                  />
                </div>
                <div>
                  <p className=''>

                  </p>
                  <Select
                    placeholder=" Repetitions"
                    className='text-center'
                    defaultValue={reps}
                    onChange={option => setReps(option.value)}
                    options={repsOptions}
                  />
                </div>
              </div>}
            </div>}
            <div className='text-center mb-5'>
              <button type='submit'>
                <Button textColor="white" text={"Add"} width={"40"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
              </button>
            </div>
          </form>}
          {(workouts.todayWorkouts && workouts.todayWorkouts.parsedRes && workouts.todayWorkouts.parsedRes.workoutDetails) && <div className='border-2 rounded-2xl mx-5  py-2 shadow-xl'>

            <div className='flex justify-center  border-b-2 items-center gap-4 '>
              <h1 className='text-2xl text-center py-2 font-semibold'>Added Workout Sets</h1>

            </div>
            <div className=''>
              <div>
                {Object.keys(workouts.todayWorkouts.parsedRes.workoutDetails).map((each, index) => {
                  const todayWorkout = workouts.todayWorkouts.parsedRes.workoutDetails
                  const noOfWorkouts = Object.keys(todayWorkout).length
                  return (
                    <div className={`grid grid-cols-2 my-2 gap-4 py-3 px-5 ${index != noOfWorkouts - 1 ? `border-b-2` : ``}`}>
                      <div>
                        <p className='font-semibold text-lg underline underline-offset-4 decoration-[#4942E4] decoration-2'>{each}</p>
                        <p>Total Sets: {todayWorkout[each].length} </p>
                      </div>
                      <div className='flex flex-col  '>

                        {todayWorkout[each].map(arr => {
                          return (
                            <div className='flex gap-3 my-1'>
                              <p>{arr.weight} KG</p> <p className='font-semibold'>X</p>
                              <p>{arr.reps}</p>
                              {/* onClick={() => openEditModal(each, arr.weight, arr.reps)}  */}
                              <div onClick={() => {
                                openModal()
                                setPrevWeight(arr.weight)
                                setPrevReps(arr.reps)
                                setEditWeight(arr.weight)
                                setEditReps(arr.reps)
                                setEditExercise(each)
                              }} className='cursor-pointer flex justify-center items-center gap-1 px-1 border-2 rounded-lg  text-xs'>
                                <MdModeEditOutline className='text-mypink' />
                                <p>
                                  Edit
                                </p>
                              </div>


                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>}
          <MyModal isOpen={modalIsOpen} onClose={closeModal} content={<div >
            <p className='text-center  font-semibold'>Change Set Details for <br></br></p>
            <p className='text-center  mb-2'>{editExercise}</p>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between gap-2 items-center '>

                <p>
                  Weight
                </p>
                <input className='border-2  rounded-lg p-2' placeholder='Weight' value={editWeight} onChange={(e) => setEditWeight(e.target.value)} />
              </div>
              <div className='flex justify-between gap-2 items-center '>
                <p>Reps</p>
                <input className='border-2  rounded-lg p-2' placeholder='Reps' value={editReps} onChange={(e) => setEditReps(e.target.value)} />
              </div>
            </div>

            <div className='flex justify-center items-center gap-10'>
              <div onClick={() => handleDelete(exercise, weight, reps)} className='cursor-pointer flex justify-center items-center border-2 border-black text-sm rounded-lg px-2 py-1 mt-6'>
                <MdDelete className='text-2xl' />
                <p>Delete</p>
              </div>
              <button onClick={() => handleEditSet()} className='bg-myprimecolor cursor-pointer flex justify-center items-center text-white text-sm rounded-lg px-2 py-2 mt-6'>
                <p>Change</p>
                <MdKeyboardDoubleArrowRight className='text-2xl' />
              </button>

            </div>
          </div>} />
        </div>}
    </div>
  )
}
