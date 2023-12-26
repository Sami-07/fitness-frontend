import React, { useState } from 'react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai"
import FFlogo from "../images/FFlogo.png"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/Auth/authSlice';
export default function Navbar() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const links = {
    "Home": "/",
    "About": "/about",
    "My Account": "/account",
    "My Tracker": "/dashboard",
    "Workout History": "/workouthistory",
    "Contact": "/contact"
  }
  function handleLogout() {
    dispatch(logout());
  }
  const entries = Object.entries(links)
  return (
    <div>
      <nav className='flex bg-myprimecolor px-3 fixed top-0  h-[6vh] w-full  justify-between items-center z-10'>
        <img className='w-9 h-9 rounded-full' src={FFlogo} alt='logo' />
        <div className='hidden md:flex gap-10 justify-center items-center'>

          {entries.map(([key, value]) => {
            return (
              <a className='text-xl' href={value} >{key}</a>
            )
          })}
          <p className='text-xl  cursor-pointer' onClick={handleLogout} >Logout</p>
        </div>
        {!toggle && <HiOutlineMenuAlt3 onClick={() => setToggle(!toggle)} className='text-3xl md:hidden' />}
        {toggle && <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-3xl md:hidden' />}
      </nav>
      {toggle && <div className='bg-fadedgreen z-20  w-full h-[94vh] flex flex-col justify-center  items-center gap-5 fixed top-[6vh]'>
        {entries.map(([key, value]) => {
          return (
            <a className='text-xl font-semibold  ' href={value} >{key}</a>
          )
        })}
        {isLoggedIn && <p className='text-xl font-semibold cursor-pointer' onClick={handleLogout} >Logout</p>}
        {!isLoggedIn && <p className='text-xl font-semibold cursor-pointer' onClick={() => window.location.href = "/register"} >Login</p>}
      </div>}
    </div>
  )
}
