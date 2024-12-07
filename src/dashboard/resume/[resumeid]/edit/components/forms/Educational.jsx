import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader, PlusCircle } from 'lucide-react'
import { Resumeinfo } from '@/context/resumeinfo'
import { useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const form = {
  id: 1,
  universityName: 'Western Illinois University',
  startDate: 'Aug 2018',
  endDate: 'Dec 2019',
  degree: 'Master',
  major: 'Computer Science',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
}

const Educational = () => {
  const { resumeinfo, setResumeinfo } = useContext(Resumeinfo)
   const[save,setSave]=useState(false)
  const [education,setEducation]=useState(resumeinfo?.education||form)
  const addeducation=()=>{
      setEducation([...education,{...form}])
  }
  const removeeducation=()=>{
       setEducation(education=>education.slice(0,-1))
       setSave(true)
  }
  const handlechange=(e,index)=>{
    const { name, value } = e.target;
    setSave(true)
    const updatedExperience = [...education];
    updatedExperience[index][name] = value;
    setEducation(updatedExperience);
  }
  const submit = async (e) => {
    setLoading(false);
    e.preventDefault()
    const res = await fetch(import.meta.env.VITE_SERVER_URL+"resumes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: resumeinfo.id,
        // education:education
        resumeinfo
      })
    });
     setLoading(true)
     toast('Saved')

  }
  const [loading,setLoading]=useState(true);
 useEffect(()=>{
  setResumeinfo({ ...resumeinfo, education: education })
   console.log(resumeinfo?.education)
 },[education])
  return (
    <div className='p-5 shadow-lg rounded border-t-sky-400 border-t-[5px]'>
                      <ToastContainer />

        <h2 className='font-bold font-serif' >Education</h2>
        <div className='mb-3'> Add  education</div>
            <form action="" onSubmit={submit}>
         <div >
             {education.map((item,index)=>(
              <div className='grid grid-cols-2 gap-4 border p-4 rounded mb-4' key={index}>
                  <div className='col-span-2' >
                    <label htmlFor="" className='text-sm font-semibold'>University Name</label>
                    <Input value={item?.universityName} name="universityName" onChange={(e)=>{handlechange(e,index)}} />
                  </div>
                  <div   className='col-span-2 md:col-span-1'>
                    <label htmlFor="" className='text-sm font-semibold'>Degree</label>
                    <Input value={item?.degree} name="degree" onChange={(e)=>{handlechange(e,index)}}/>
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label htmlFor="" className='text-sm font-semibold'>Major</label>
                    <Input value={item?.major} name="major" onChange={(e)=>{handlechange(e,index)}}/>
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label htmlFor="" className='text-sm font-semibold'>Start Date</label>
                    <Input type="date" className="justify-center" value={item?.startDate} name="startDate" onChange={(e)=>{handlechange(e,index)}}/>
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label htmlFor="" className='text-sm font-semibold '>End Date</label>
                    <Input type="date" value={item?.endDate} className='justify-center' name="endDate" onChange={(e)=>{handlechange(e,index)}}/>
                  </div>
                  <div className='col-span-2'>
                    <label htmlFor=""className='text-sm font-semibold'>Description</label>
                    <Textarea className='h-40 'name="description" value={item?.description} onChange={(e)=>{handlechange(e,index)}}/>
                  </div>
              </div>
             ))}
             
         </div>
         <div className='mt-6 flex justify-between'>
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='text-blue-600'>
                <Button variant="outline" onClick={addeducation} className><PlusCircle />Add Education </Button></div>
              <div className='text-blue-600'>
                <Button variant="outline" onClick={removeeducation} className>Remove </Button></div>
            </div>
            <div className='text-blue-600'>
              <Button className type="submit" disabled={!save} onClick={submit}>{!loading?<Loader/>:"Save"}</Button></div>
              
          </div>
          
      <div>
         
      </div>
      </form>
    </div>
  )
}

export default Educational