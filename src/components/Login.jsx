// import React, { useEffect, useState } from 'react'
// import Heading from '../ReusableComponents/Heading';
// import Button from '../ReusableComponents/Button';
// import FFlogo from "../images/FFlogo.png"
// import { FcGoogle } from "react-icons/fc";
// import { FiLogIn } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from '../features/Auth/authSlice';


// export default function Login() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
//   useEffect(() => {
//     if (isLoggedIn) {
//       window.location.href = "/mydashboard";
//     }
//   }, [isLoggedIn])
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {

//       dispatch(login({   email, password  }));
//     }
//     catch (err) {

//     }

//   }
//   return (
//     <div className='mt-40'>
//       <img className=' h-14 w-14 mx-auto mt-20 -mb-5 rounded-lg' src={FFlogo} alt='logo' />
//       <Heading title={"Login to Fitness Freak"} />
//       <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-2 rounded-xl p-4 py-10 mx-4 gradientbg md:w-1/2 md:mx-auto'>


//         <label htmlFor='email' className='flex flex-col items-center'>
//           <p className='text-lg  text-white'>
//             Email
//           </p>
//           <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-xl shadow-xl border-2 px-4 md:w-1/2' placeholder='example@gmail.com' />
//         </label>
//         <label htmlFor='password' className='flex flex-col items-center'>
//           <p className='text-lg text-white'>
//             Password
//           </p>
//           <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} className='mx-10 w-[80vw] h-16 rounded-xl shadow-xl border-2 px-4 md:w-1/2' placeholder={`******`} />
//         </label>

//         <div className='text-center'>
//           <button type='submit'>
//             <Button textColor="white" fontSize={""} text={"Login"} width={"52"} icon={<FiLogIn className='text-3xl' />} />
//           </button>
//         </div>
//         <p className='px-4 text-gray-100'>new user?<a href='/register' className='font-semibold underline underline-offset-4'> Create an account</a></p>
//       </form>





//     </div>
//   )
// }

// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

// export default function Login() {
//   return (
//     <header className='mt-20'>
//       <SignedOut>
//         <SignInButton   />
//       </SignedOut>
//       <SignedIn> 
//         <UserButton />
//       </SignedIn>
//     </header>
//   )
// }



import * as React from 'react'
import { SignIn, useSignIn, useUser } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { saveUser } from '../api'

export default function OauthSignIn() {
  const { signIn } = useSignIn()
  const { user } = useUser()

  // Function to send user data to backend
  const saveUserInfoToBackend = async (userData) => {
    // try {
    //   const response = await fetch('/your-backend-api/save-user', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    //   })

    //   if (!response.ok) {
    //     throw new Error('Failed to save user info')
    //   }

    //   console.log('User info saved successfully')
    // } catch (error) {
    //   console.error('Error saving user info:', error)
    // }
    console.log('User info saved successfully', userData)
  }


  React.useEffect(() => {
    // If the user is signed in, send their info to the backend
    async function saveUserToBackend() {
      if (user) {
        const { emailAddress } = user.primaryEmailAddress
        const fullName = user.fullName
        const id = user.id
        const res = await saveUser({id, email: emailAddress, name: fullName })
        if (res.status === true) {
          console.log('User info saved successfully')
        }
        else {
          console.log('User info not saved')

        }
      }
    }

    saveUserToBackend()
  }, [user])



  const signInWith = async (strategy) => {
    try {
      const data = await signIn.authenticateWithRedirect({ provider: strategy })

      console.log('Signed in:', data)
    } catch (error) {
      console.error('Failed to sign in:', error)


    }

  }

  return (
    <div className='mt-20'>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
