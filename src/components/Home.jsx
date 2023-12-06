import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import About from './About';
import Button from '../ReusableComponents/Button';
export default function Home() {
  return (
    <div>

      <div className='gradientbg h-[65vh]'>
        <h1 className='text-7xl text-white px-5 py-8'>
          It&#39;s
          <br />
           either
          <br />
          One Day
          <br /> or
          <br /> Day One<span className='text-mypink font-semibold ml-1'>.</span>
        </h1>
        <Button text={"Get Started"} link={"/assessment"} icon={<MdKeyboardDoubleArrowRight className='text-3xl' />} />
      </div>
      <About />
    </div>
  )
}
