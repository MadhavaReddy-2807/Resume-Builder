import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Resumeform from './components/resumeform'
import Resumepreview from './components/resumepreview'
import { Resumeinfo } from '@/context/resumeinfo'
import dummy from './data/dummy'
import Header from '@/components/ui/custom/header'
const EditResume = () => {
     const params=useParams()
    useEffect(() => {    
       console.log(params);
    }, [])
    useEffect(() => {
      const fetchResume = async () => {
        const res = await fetch(`http://localhost:3000/resumes?id=${params.resumeid}`);
        const data = await res.json();
        console.log(data);
        setResumeinfo(data); // Update the state here
      };
      
      fetchResume();      
    }, [params.resumeid]); // Added the correct dependency for `params.resumeid`
    
const [resumeinfo,setResumeinfo]=useState();
  return (
    //now resume info can be accesed in both resume form and resume preview
  <Resumeinfo.Provider value={{resumeinfo,setResumeinfo}}>
     <Header/>
    <div className='grid grid-cols-1 md:grid-cols-2  p-10 gap-10'>
       <Resumeform/>
       <Resumepreview/>
    </div>
    </Resumeinfo.Provider>
  )
}

export default EditResume