import React from 'react'
import { useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { ToastContainer, toast } from 'react-toastify';
// import { SignedIn } from '@clerk/clerk-react'
import Header from '@/components/ui/custom/header'
const Home = () => {
  const {isLoaded,isSignedIn}=useUser();
  const {user}=useUser();
  if(isSignedIn)
    {
    useEffect(()=>{
     toast.success(`Logged in as ${user.primaryEmailAddress?.emailAddress}`);
    },[user.primaryEmailAddress?.emailAddress])}
  return (
    <>
     <div className='h-screen overflow-hidden w-full '>
     <Header />
      {/* <span className='flex  justify-center font-semibold text-2xl'>Build Your Resume With AI</span> */}
      <ToastContainer />
      <Spline
          scene="https://prod.spline.design/UlThdMSAAnJw9kvW/scene.splinecode"
          aria-label="3D interactive scene showing personal work"
        />

      </div>
    </>
  )
}

export default Home