import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { useSignIn } from "@clerk/clerk-react";

// inside component


const SignInPage = () => {
  const { signIn, setActive } = useSignIn();
  
  const handleGoogleSignIn = async () => {
    const result = await signIn.create({
      strategy: "oauth_google",
    });
    await setActive({ session: result.createdSessionId });
  };
  return (
    <div className='w-[100%] h-screen flex justify-center items-center'><SignIn   localization={{
      signIn: {
        start: {
          title: "Sign in to Wave"
        }
      }
    }} path='/sign-in' routing='path' signInUrl='/sign-in'/></div>
  )
}

export default SignInPage