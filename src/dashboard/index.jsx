import React, { useEffect, useState } from 'react'
import Addresume from './components/Addresume'
import { useUser } from '@clerk/clerk-react'
import ResumeCard from './components/ResumeCard'
import Header from '@/components/ui/custom/header'
const Dashboard = () => {
  const {user}=useUser();
  const [resumelist,setResumelist]=useState([]);
  useEffect(() => {
      getresumes();
  }, [])
  const getresumes=async()=>{
     const res=await fetch(`http://localhost:3000/resumelist?email=${user.primaryEmailAddress?.emailAddress}`);
     const data=await res.json();
     console.log(data);
     setResumelist(data);
  }
  
  return (
    <>
        {/* <Header/> */}
        <div className='p-10 md:px-20 lg:px-32 flex flex-col items-center md:block'>
           <h2 className='font-bold text-3xl'>My Resume</h2>
           <p>Start Creating AI resume to your next Job role</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mdl:grid-cols-4  gap-y-2 gap-x-10 '>
              <Addresume/>
               {resumelist.length>0&&resumelist.map((resume,index)=>(
                 <ResumeCard resume={resume} key={index} />
               ))}
            </div>
        </div>
    </>
  )
}

export default Dashboard