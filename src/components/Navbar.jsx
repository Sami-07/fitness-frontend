import React, { useState } from 'react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai"
import FFlogo from "../images/FFlogo.png"
export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  const links = {
    "Home": "/",
    "About": "/about",
    "My Tracker": "/dashboard",
    "Contact": "/contact"
  }
  const entries = Object.entries(links)
  return (
    <div>
      <nav className='bg-myprimecolor px-3 fixed top-0  h-[6vh] w-full flex justify-between items-center z-10'>
        <img className='w-9 h-9 rounded-full' src={FFlogo} alt='logo' />
        <div className='hidden md:flex gap-10 justify-center items-center'>

          {entries.map(([key, value]) => {
            return (
              <a className='text-xl' href={value} >{key}</a>
            )
          })}
        </div>
        {!toggle && <HiOutlineMenuAlt3 onClick={() => setToggle(!toggle)} className='text-3xl' />}
        {toggle && <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-3xl' />}
      </nav>
      {toggle && <div className='bg-fadedgreen z-20  w-full h-[94vh] flex flex-col justify-center  items-center gap-5 fixed top-[6vh]'>
        {entries.map(([key, value]) => {
          return (
            <a className='text-xl font-semibold  ' href={value} >{key}</a>
          )
        })}

      </div>}
    </div>
  )
}
