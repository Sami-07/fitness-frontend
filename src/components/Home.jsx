import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import About from './About';
import Button from '../ReusableComponents/Button';
export default function Home() {
  return (
    <div>

      <div className='gradientbg h-[65vh] md:h-[70vh]'>
        <div className='hidden md:flex flex-col justify-center h-[80vh] items-center text-7xl text-white px-5 py-8'>
        <p>

          It&#39;s

          either

          One Day
          or
          Day One<span className='text-mypink font-semibold ml-1'>.</span>
        </p>
          <Button text={"Get Started"} link={"/assessment"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
        </div>
        <div className='md:hidden text-7xl text-white px-5 py-8'>
          It&#39;s
          <br />
          either
          <br />
          One Day
          <br /> or
          <br /> Day One<span className='text-mypink font-semibold ml-1'>.</span>
          <Button text={"Get Started"} link={"/assessment"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
        </div>
     
      </div>
      <About />
    </div>
  )
}
