import React from 'react'
import Spline from '@splinetool/react-spline'
import { UserButton } from '@clerk/clerk-react'
import Header from '@/components/ui/custom/header'
const Home = () => {
  return (
    <>
     <div className='h-screen overflow-hidden w-full '>
     <Header />
      {/* <span className='flex  justify-center font-semibold text-2xl'>Build Your Resume With AI</span> */}
      
      <Spline
          scene="https://prod.spline.design/UlThdMSAAnJw9kvW/scene.splinecode"
          aria-label="3D interactive scene showing personal work"
        />

      </div>
    </>
  )
}

export default Home