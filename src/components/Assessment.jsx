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
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAssessmentDetails } from '../api';
import fastloss from "../images/fastloss.png";
import moderateloss from "../images/moderateloss.png";
import slowloss from "../images/slowloss.png";
import maintain from "../images/maintain.png";
import moderategain from "../images/moderategain.png";
import musclegain from "../images/musclegain.png";
import { getUserAssessment } from '../features/Assessment/assessmentSlice';
import { TiTick } from "react-icons/ti";
// TODO: check if the assessment is given by the user in useEffect.
// If yes, then render all the filled details, and give an option to update details similar to weight tracking.
// Dont allow users to update weight later from assessment page.

export default function Assessment() {
  const dispatch = useDispatch();
  const [assessmentDone, setAssessmentDone] = useState(false);
  useEffect(() => {
    dispatch(getUserAssessment());
  }, [])
  const assessmentData = useSelector(state => state.assessment.data)
  const isLoading = useSelector(state => state.assessment.isLoading)
  useEffect(() => {
    console.log("assessment data", assessmentData);
    if (assessmentData) {
      if (assessmentData.age) {
        setAssessmentDone(true);
      }
    }
    console.log("loading check", isLoading);
  }, [assessmentData])



  const [ageOptions, setAgeOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [heightOptions, setHeightOptions] = useState([]);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [approach, setApproach] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const activityOptions =
    [{ value: "sedentary", label: "Sedentary/Inactive" },
    { value: "lightly active", label: "Lightly Active" },
    { value: "moderately active", label: "Moderately Active" },
    { value: "very active", label: "Very Active" },
    { value: "extremely active", label: "Extremely Active" }
    ]
  const approachOptions =
    [{ value: "fast-loss", label: "Fast Fat Loss", logo: fastloss },
    { value: "moderate-loss", label: "Moderate Fat Loss", logo: moderateloss },
    { value: "slow-loss", label: "Slow Fat Loss", logo: slowloss },
    { value: "maintain", label: "Maintain", logo: maintain },
    { value: "moderate-gain", label: "Moderate Gain", logo: moderategain },
    { value: "muscle-gain", label: "Muscle Gain", logo: musclegain },
    ]

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
        weightOptions.push({ value: i, label: `${i} KG` })
      }
      setWeightOptions(weightOptions);
    }
    function generateHeightOptions() {
      let heightOptions = [];
      for (let i = 20; i <= 200; i++) {
        heightOptions.push({ value: i, label: `${i} CM` })
      }
      setHeightOptions(heightOptions);
    }
    generateOptions();
    generateWeightOptions();
    generateHeightOptions();
  }, [])


  async function handleSubmit(e) {
    e.preventDefault();
    if (!age) {

    }
    else if (!gender) {

    }
    else if (!height) {

    }

    else if (!weight) {

    }
    else if (!approach) {

    }
    else if (!goalWeight) {

    }
    else if (!activityLevel) {

    }
    else {
      const res = await addAssessmentDetails({ age, gender, height, weight, approach, goalWeight, activityLevel })
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

  return (
    <div>
      {isLoading && <p className='text-4xl text-center mt-20'>LOADING...</p>}
      {(assessmentDone && !isLoading) &&
        <div className='  mt-20 text-center'>
          <div className='flex justify-center items-center mx-auto'>
            <div className='flex flex-col items-center justify-center text-center'>
              <TiTick className='text-5xl bg-myprimecolor rounded-full text-white mb-4' />
              <p className='text-xl'>
                You have already completed the Assessment.
              </p>
            </div>

          </div>

          {assessmentData && Object.keys(assessmentData).map(item => {
            let unit = ""
            let label = item;
            if (item == "weight" || item === "goalWeight") {
              unit = " Kg";
            }
            else if (item === "height") {
              unit = "Cm";
            }

            else if (item == "calorieIntake") {
              unit = "Cal"
            }
            else if (item === "proteinIntake") {
              unit = "g"
            }
            else {
              unit = "";
            }
            if (item === "goalWeight") {
              label = "Goal Weight";
            }
            else if (item === "activityLevel") {
              label = "Activity Level";
            }
            else if (item === "calorieIntake") {
              label = "Calorie Intake";
            }
            else if (item === "proteinIntake") {
              label = "Protein Intake";
            }
            return (
              <div className='grid grid-cols-2 text-xl mt-4'>
                <p className='capitalize  font-semibold'>{label}</p>
                <p className=''>{assessmentData[item]} {unit}</p>
              </div>
            )
          })}
          <div className='text-center mb-5'>
            <button type='submit'>
              <Button textColor="white" text={"Edit Assessment"} width={"60"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
            </button>
          </div>
        </div>}

      {(!assessmentDone && !isLoading) && <form onSubmit={handleSubmit}>
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
          <p className='text-lg font-semibold'>Select your Age</p>
          <Select
            placeholder="Select your Age"
            className='mt-2'
            defaultValue={age}
            onChange={option => setAge(option.value)}
            options={ageOptions}
          />
        </div>
        <div className='text-center mt-5'>
          <p className='text-lg font-semibold'>Select your Gender</p>
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
          <p className='text-lg font-semibold'>Select your Height (in cm)</p>
          <Select
            placeholder="Select your Height"
            className='mt-2'
            defaultValue={height}
            onChange={option => setHeight(option.value)}
            options={heightOptions}
          />
        </div>
        <div className='text-center w-[55vw] mx-auto mt-5'>
          <p className='text-lg font-semibold'>Select your Weight</p>
          <Select
            placeholder="Select your Weight"
            className='mt-2'
            defaultValue={weight}
            onChange={option => setWeight(option.value)}
            options={weightOptions}
          />
        </div>

        <div className='flex flex-col gap-2 mt-5'>
          <p className='text-lg font-semibold text-center'>Select your Approach</p>
          <div onClick={() => setApproach("fast-loss")} className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer ${approach === "fast-loss" ? 'bg-green-500 text-white' : 'bg-white'}`}>
            <img src={fastloss} className='w-12' alt='icon' />
            <p className='ml-10'>Fast Fat Loss</p>
          </div>

          <div onClick={() => setApproach("moderate-loss")} className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer ${approach === "moderate-loss" ? 'bg-green-500 text-white' : 'bg-white'}`}>
            <img src={moderateloss} className='w-12' alt='icon' />
            <p className='ml-10'>Moderate Fat Loss</p>
          </div>

          <div onClick={() => setApproach("slow-loss")} className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer ${approach === "slow-loss" ? 'bg-green-500 text-white' : 'bg-white'}`}>
            <img src={slowloss} className='w-12' alt='icon' />
            <p className='ml-10'>Slow Fat Loss</p>
          </div>

          <div onClick={() => setApproach("maintain")} className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer ${approach === "maintain" ? 'bg-green-500 text-white' : 'bg-white'}`}>
            <img src={maintain} className='w-12' alt='icon' />
            <p className='ml-10'>Maintain Weight</p>
          </div>

          <div onClick={() => setApproach("moderate-gain")} className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer ${approach === "moderate-gain" ? 'bg-green-500 text-white' : 'bg-white'}`}>
            <img src={moderategain} className='w-12' alt='icon' />
            <p className='ml-10'>Moderate Gain</p>
          </div>

          <div onClick={() => setApproach("muscle-gain")} className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer ${approach === "muscle-gain" ? 'bg-green-500 text-white' : 'bg-white'}`}>
            <img src={musclegain} className='w-12' alt='icon' />
            <p className='ml-10'>Muscle Gain</p>
          </div>
          {/* {approachOptions.map(eachApproach => {
    return (
      <div
        key={eachApproach.label}
        onClick={() => setApproach(eachApproach)}
        className={`flex items-center gap-2 px-2 border-2 py-1 mx-24 rounded-xl cursor-pointer
          ${approach === eachApproach ? 'bg-green-500 text-white' : 'bg-white'}
        `}
      >
        <img src={eachApproach.logo} className='w-12' alt='icon' />
        <p className='ml-10'>{eachApproach.label}</p>
      </div>
    );
  })} */}
        </div>


        <div className='text-center w-[55vw] mx-auto mt-5'>
          <p className='text-lg font-semibold'>Select your Goal Weight</p>
          <Select
            placeholder="Select Goal Weight"
            className='mt-2'
            defaultValue={goalWeight}
            onChange={option => setGoalWeight(option.value)}
            options={weightOptions}
          />
        </div>
        <div className='text-center w-[55vw] mx-auto mt-5'>
          <p className='text-lg font-semibold'>How Active you are</p>
          <Select
            placeholder="Select Activity Level"
            className='mt-2'
            defaultValue={activityLevel}
            onChange={option => setActivityLevel(option.value)}
            options={activityOptions}
          />
        </div>

        <div className='text-center mb-5'>
          <button type='submit'>
            <Button textColor="white" text={"Go"} width={"52"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
          </button>
        </div>
      </form>}
    </div>
  )
} 
