import React from 'react'

export default function Heading({ title, logo, desc }) {
    return (
        <div className='flex flex-col justify-center items-center text-center px-5 py-6'>
            <div className='flex justify-center  items-center gap-3 '>

                <div className='text-3xl text-mypink mt-2'>
                    {logo}
                </div>
                <h2 className='text-center font-semibold text-2xl'>{title}<span className='text-mypink text-5xl ml-1 font-semibold'>.</span></h2>

            </div>
            <p>{desc}</p></div>
    )
}
