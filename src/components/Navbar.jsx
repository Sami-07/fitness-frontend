import React, { useState, useRef, useEffect } from 'react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai"
import FFlogo from "../images/FFlogo.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/Auth/authSlice';
import { MdHome } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineFitbit } from "react-icons/md";
import { LiaRunningSolid } from "react-icons/lia";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { FaDumbbell } from "react-icons/fa6";
import { useParams } from "react-router-dom";
export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [clicked, setClicked] = useState("");
  const user = useSelector(state => state.auth)
  let params = useParams();
  // useEffect(() => {
  //   
  // }, [user])
  useEffect(() => {
    if (!isLoggedIn) {
      // window.location.href = "/";
    }
  }, [isLoggedIn])
  const links = {
    "Home": "/",
    "My Tracker": "/mydashboard",
    "Workout History": "/workouthistory",
    "Track Workout": "/trackworkout"
  }
  const navNames = {
    "/": "Home",
    "/mydashboard": "My Tracker",
    "/workouthistory": "Workout History",
    "/trackworkout": "Track Workout"
  }
  const logos = {
    "Home": <MdHome className='text-2xl' />,
    "My Tracker": <MdOutlineFitbit className='text-2xl' />,
    "Workout History": <FaDumbbell className='text-2xl' />,
    "Track Workout": <LiaRunningSolid className='text-2xl' />
  }
  const ref = useRef()
  function toggleHamburger() {
    setOpen(false);
    ref.current.classList.remove("translate-x-0")
    ref.current.classList.add("translate-x-full")
  }
  function openNavbar() {
    setOpen(true);
    ref.current.classList.remove("translate-x-full")
    ref.current.classList.add("translate-x-0")
  }
  function handleLogout() {
    dispatch(logout());
    window.location.href = "/";
  }
  const entries = Object.entries(links)
  return (
    <div>
      <nav className='flex bg-myprimecolor px-3 fixed top-0  h-[6vh] md:h-[8vh] w-full  justify-between items-center z-10'>

        <img className='w-9 h-9 rounded-full' src={FFlogo} alt='logo' />
        <div className='hidden md:flex gap-10 justify-center   items-center'>

          {entries.map(([key, value]) => {
            return (
              <a className='text-xl' href={value} >{key}</a>
            )
          })}
          {isLoggedIn && <p className='text-xl cursor-pointer' onClick={handleLogout} >Logout</p>}
          {!isLoggedIn && <p className='text-xl cursor-pointer' onClick={() => window.location.href = "/register"} >
            Login</p>}
        </div>
        {!open && <HiOutlineMenuAlt3 onClick={openNavbar} className='text-3xl md:hidden' />}
        {open && <AiOutlineClose onClick={toggleHamburger} className='text-3xl md:hidden' />}
      </nav>
      <div className='flex justify-center items-center'>

        <div ref={ref} className='gradientbg2 z-20 flex flex-col items-center justify-center transform transition-transform translate-x-full   w-full h-[94vh]  gap-3 fixed top-[6vh]'>
          {(isLoggedIn && (user && user.user && user.user.displayName)) &&
            <div className='flex gap-2 text-center text-white font-semibold text-2xl'>

              {user.user.photoURL &&
                <img className='rounded-md w-14 h-14' src={user.user.photoURL} alt='profile picture' />}
              <div className='flex flex-col '>

                <span className='text-white '>
                  Hello,
                </span>
                <p className=' text-mypink'>

                  {user.user.displayName}
                </p>
              </div>
            </div>
          }
          {entries.map(([key, value]) => {
            return (
              <a onClick={() => setClicked(key)} className={`${key === navNames[window.location.pathname] ? `gradientbg  ` : ``} text-lg p-2 rounded-xl px-4 flex items-center gap-4 font-semibold text-white`} href={value} >
                {logos[key]}
                {key}
              </a>
            )
          })}
          {isLoggedIn && <p className='flex bg-transparent border-2 p-2 rounded-xl px-4 items-center gap-4 text-white text-xl font-semibold cursor-pointer' onClick={handleLogout} ><LuLogOut className='text-2xl' />Logout</p>}
          {!isLoggedIn && <p className='flex bg-transparent border-2 p-2 rounded-xl px-4 items-center gap-4 text-white text-xl font-semibold cursor-pointer' onClick={() => window.location.href = "/register"} >
            <LuLogIn />Login</p>}
        </div>
      </div>
    </div>
  )
}
