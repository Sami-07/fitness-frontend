import React, { useEffect, useState } from 'react'
import Heading from '../ReusableComponents/Heading';
import Button from '../ReusableComponents/Button';
import FFlogo from "../images/FFlogo.png"
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '../firebase/config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginWithGoogle } from '../features/Auth/authSlice';
import { register } from '../features/Auth/authSlice';
export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const authError = useSelector(state => state.auth.error)
    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = "/dashboard";
        }
    }, [isLoggedIn])
    console.log("check log in", isLoggedIn);
    console.log("error auth", authError)
    async function handleGoogleLogin() {

        dispatch(loginWithGoogle())
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if (!(userName.length >= 3)) {
            toast.error('Please enter a 3 characters username', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else if (!(email.length >= 3)) {
            toast.error('Please enter a valid email', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
        else if (!(password.length >= 8)) {
            toast.error('Please enter a 8 characters password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }

        else {
            dispatch(register({ auth, email, password, userName }));
        }



    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {authError && toast.error(authError, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })}
            <img className=' h-14 w-14 mx-auto mt-20 -mb-5 rounded-lg' src={FFlogo} alt='logo' />
            <Heading title={"Create an Account"} />
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                <label htmlFor='username' className='flex flex-col items-center'>
                    <p className='text-lg'>
                        Your Name
                    </p>
                    <input type='text' name='username' value={userName} onChange={e => setUserName(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-3xl shadow-xl border-2 px-4' placeholder='Enter your name' />
                </label>
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

            <div onClick={() => handleGoogleLogin()}>
                <button className='flex justify-center items-center mx-auto gap-5 text-xl border-2 py-3 px-10 rounded-3xl shadow-lg'><FcGoogle className='text-4xl' />
                    Sign in with Google</button>

            </div>


        </div>
    )
}
