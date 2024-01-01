import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import Button from './Button'

export default function NotLoggedIn() {
    return (
        <div><div>

            <p className="text-2xl mt-20 px-5 text-center">
                Please Sign up to Fitness Freak to access all its features.
            </p>
            <div className='text-center mb-5'>
                <button type='submit' onClick={() => window.location.href = "/login"}>
                    <Button textColor="white" text={"Login"} width={"52"} icon={<MdOutlineKeyboardDoubleArrowRight className='text-3xl' />} />
                </button>
            </div>


        </div></div>
    )
}
