import { useEffect, useState } from 'react'
import { CiMemoPad } from "react-icons/ci";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Heading from '../ReusableComponents/Heading';
import Select from 'react-select';
import male from "../images/male.png";
import female from "../images/female.png";
import loseweight from "../images/loseweight.png";
import gainweight from "../images/gainweight.png";
import Button from '../ReusableComponents/Button';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { addAssessmentDetail } from '../features/Assessment/assessmentSlice';
import { addAssessmentDetails } from '../api';
export default function Assessment() {
  const dispatch = useDispatch();
  useEffect(() => {
    function generateOptions() {
      let ageOptions = [];
      for (let i = 8; i <= 90; i++) {
        ageOptions.push({ value: i, label: i });
      }
      setAgeOptions(ageOptions)
    }
    function generateWeightOptions() {
      let weightOptions = [];
      for (let i = 20; i <= 150; i++) {
        weightOptions.push({ value: i, label: `${i} kgs` })
      }
      setWeightOptions(weightOptions);
    }
    generateOptions();
    generateWeightOptions();
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    if (!age) {

    }
    else if (!gender) {

    }
    else if (!weight) {

    }
    else if (!goal) {

    }
    else if (!goalWeight) {

    }
    else {
      const res = await addAssessmentDetails({ age, gender, weight, goal, goalWeight })
      console.log("res status", res)
      if (res.result) {

        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
        toast.success('Assessment recorded successfully!', {
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
        toast.error('Please try again.', {
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

  }
  const [ageOptions, setAgeOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [goal, setGoal] = useState("");


  return (
    <form onSubmit={handleSubmit}>
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
      <Heading title="Assessment" logo={<CiMemoPad />} desc={"Please answer the next 4 questions to get started using this App."} />
      <div className='text-center w-[50vw] mx-auto'>
        <p className='text-lg font-medium'>Select your Age</p>
        <Select
          placeholder="Select your Age"
          className='mt-2'
          defaultValue={age}
          onChange={option => setAge(option.value)}
          options={ageOptions}
        />
      </div>
      <div className='text-center mt-5'>
        <p className='text-lg font-medium'>Select your Gender</p>
        <div className='flex px-5 gap-5 mt-2'>
          <div onClick={() => {
            setGender("male")

          }} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-4 p-4 w-1/2 rounded-2xl ${gender == "male" ? `bg-myprimecolor  text-white` : "bg-white"}`} >
            <img className='w-24 h-24' src={male} alt='feature img' />
            <h3 className='text-center font-semibold'>Male</h3>
          </div>
          <div onClick={() => {
            setGender("female")
          }} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-4 p-4 w-1/2 rounded-2xl ${gender == "female" ? `bg-myprimecolor  text-white` : "bg-white"}`} >
            <img className='w-24 h-24' src={female} alt='feature img' />
            <h3 className='text-center font-semibold'>Female</h3>
          </div>
        </div>
      </div>
      <div className='text-center w-[55vw] mx-auto mt-5'>
        <p className='text-lg font-medium'>Select your Weight</p>
        <Select
          placeholder="Select your Weight"
          className='mt-2'
          defaultValue={weight}
          onChange={option => setWeight(option.value)}
          options={weightOptions}
        />
      </div>

      <div className='text-center mt-5'>
        <p className='text-lg font-medium'>Select your Goal</p>
        <div className='flex px-5 gap-5 mt-2'>
          <div onClick={() => setGoal("lose weight")} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-4 p-4 w-1/2 rounded-2xl ${goal == "lose weight" ? `bg-myprimecolor  text-white` : "bg-white"}`} >
            <img className='w-20 h-2w-20' src={loseweight} alt='feature img' />
            <h3 className='text-center font-semibold'>Lose Weight</h3>
          </div>
          <div onClick={() => setGoal("gain weight")} className={`shadow-xl border-2 flex flex-col justify-center items-center gap-4 p-4 w-1/2 rounded-2xl ${goal == "gain weight" ? `bg-myprimecolor text-white` : "bg-white"}`} >
            <img className='w-20 h-2w-20' src={gainweight} alt='feature img' />
            <h3 className='text-center font-semibold'>Gain Weight</h3>
          </div>
        </div>
      </div>
      <div className='text-center w-[55vw] mx-auto mt-5'>
        <p className='text-lg font-medium'>Select your Goal Weight</p>
        <Select
          placeholder="Select Goal Weight"
          className='mt-2'
          defaultValue={goalWeight}
          onChange={option => setGoalWeight(option.value)}
          options={weightOptions}
        />
      </div>
      <div className='text-center mb-5'>
        <button type='submit'>
          <Button textColor="white" text={"Go"} width={"40"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
        </button>
      </div>
    </form>
  )
} 
