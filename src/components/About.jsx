import React from 'react'
import FFlogo from "../images/FFlogo.png"
import { about } from '../Constants'
import { features } from '../Constants'
import { useSelector } from 'react-redux'
export default function About() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <div>
      <div>

        <div className='flex justify-center mt-16 gap-3'>
          <img className=' h-14 w-14  rounded-lg' src={FFlogo} alt='logo' />
          <h1 className='text-center text-3xl'> Fitness Freak<span className='text-mypink text-5xl ml-1 font-semibold'>.</span></h1>
        </div>
        <p className='text-center px-5 mt-5'>{about} </p>
      </div>
      <div>
        <h2 className='text-center mt-4 text-3xl'>Features<span className='text-mypink text-5xl ml-1 font-semibold'>.</span></h2>
        <div className='flex flex-col justify-center items-center gap-4 mt-4'>

          {features.map(feature => {
            return (
              <div className='shadow-xl border-2 flex flex-col justify-center items-center gap-4 p-4 w-1/2 rounded-2xl' key={feature.featureTitle}>
                <h3 className='text-center font-semibold'>{feature.featureTitle}</h3>
                <img className='w-24 h-24' src={feature.img} alt='feature img' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
