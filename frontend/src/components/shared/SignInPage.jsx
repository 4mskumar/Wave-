import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='w-[100%] h-screen flex justify-center items-center'><SignIn path='/sign-in' routing='path' signInUrl='/sign-in'/></div>
  )
}

export default SignInPage