import React from 'react'

export default function Heading({ title, logo, desc }) {
    return (
        <div className='flex flex-col justify-center items-center text-center px-5 py-6'>
            <div className='flex justify-center  items-center gap-3 '>

                <div className='text-4xl text-mypink mt-2'>
                    {logo}
                </div>
                <h2 className='text-center text-3xl'>{title}<span className='text-mypink text-5xl ml-1 font-semibold'>.</span></h2>

            </div>
            <p>{desc}</p></div>
    )
}
