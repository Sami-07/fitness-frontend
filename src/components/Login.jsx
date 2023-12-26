import React, { useEffect, useState } from 'react'
import Heading from '../ReusableComponents/Heading';
import Button from '../ReusableComponents/Button';
import FFlogo from "../images/FFlogo.png"
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '../firebase/config';

import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  useEffect(() => {
         if (isLoggedIn) {
             window.location.href = "/dashboard";
         }
     }, [isLoggedIn])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginWithGoogle() {
    // const authObject = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // 


  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const res = await signInWithEmailAndPassword(auth, email, password);
    

      if (res) {
        window.location.href = "/about"
   
      }
    }
    catch (err) {
      
    }

  }
  return (
    <div>
      <img className=' h-14 w-14 mx-auto mt-20 -mb-5 rounded-lg' src={FFlogo} alt='logo' />
      <Heading title={"Create an Account"} />
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>


        <label htmlFor='email' className='flex flex-col items-center'>
          <p className='text-lg'>
            Email
          </p>
          <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='example@gmail.com' />
        </label>
        <label htmlFor='password' className='flex flex-col items-center'>
          <p className='text-lg'>
            Password
          </p>
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='******' />
        </label>
        <div className='text-center'>
          <button type='submit'>
            <Button textColor="white" fontSize={""} text={"Sign up"} width={"52"} icon={<FiLogIn className='text-3xl' />} />
          </button>
        </div>
      </form>
      <p className='text-center my-10'>OR</p>

      <div onClick={() => loginWithGoogle()}>
        <button className='flex justify-center items-center mx-auto gap-5 text-xl border-2 py-3 px-10 rounded-3xl shadow-lg'><FcGoogle className='text-4xl' />
          Sign in with Google</button>

      </div>


    </div>
  )
}
