import React, { useEffect, useState } from 'react'
import Heading from '../ReusableComponents/Heading';
import Button from '../ReusableComponents/Button';
import FFlogo from "../images/FFlogo.png"
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../features/Auth/authSlice';


export default function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/mydashboard";
    }
  }, [isLoggedIn])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {

      dispatch(login({   email, password  }));
    }
    catch (err) {

    }

  }
  return (
    <div className='mt-40'>
      <img className=' h-14 w-14 mx-auto mt-20 -mb-5 rounded-lg' src={FFlogo} alt='logo' />
      <Heading title={"Login to Fitness Freak"} />
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-2 rounded-xl p-4 py-10 mx-4 gradientbg md:w-1/2 md:mx-auto'>


        <label htmlFor='email' className='flex flex-col items-center'>
          <p className='text-lg  text-white'>
            Email
          </p>
          <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-xl shadow-xl border-2 px-4 md:w-1/2' placeholder='example@gmail.com' />
        </label>
        <label htmlFor='password' className='flex flex-col items-center'>
          <p className='text-lg text-white'>
            Password
          </p>
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-xl shadow-xl border-2 px-4 md:w-1/2' placeholder={`******`} />
        </label>

        <div className='text-center'>
          <button type='submit'>
            <Button textColor="white" fontSize={""} text={"Login"} width={"52"} icon={<FiLogIn className='text-3xl' />} />
          </button>
        </div>
        <p className='px-4 text-gray-100'>new user?<a href='/register' className='font-semibold underline underline-offset-4'> Create an account</a></p>
      </form>
    

     


    </div>
  )
}
