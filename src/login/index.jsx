import React from 'react'
import { SignIn } from '@clerk/clerk-react'
const Login = () => {
  return (
    <>
      <div className='flex justify-items-center justify-center my-auto mt-16 h-full '><SignIn/></div>
    </>
)
}

export default Login