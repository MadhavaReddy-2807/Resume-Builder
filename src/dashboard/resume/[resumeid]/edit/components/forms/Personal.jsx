import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext, useState } from 'react'
import React from 'react'
import { Resumeinfo } from '@/context/resumeinfo'
import { Loader } from 'lucide-react'
const Personal = ({enableNext}) => {
   const handlechange=(e)=>{
      setSaving(true)
      setResumeinfo({...resumeinfo,[e.target.name]:e.target.value})
   }
 const [saving,setSaving]=useState(false);
 const[loading,setLoading]=useState(false);
   const{resumeinfo,setResumeinfo}=useContext(Resumeinfo)
    const submit=async (e)=>{
       setLoading(true);
      // setSaving(false);
       e.preventDefault();
       enableNext(true);
       const res = await fetch(import.meta.env.VITE_SERVER_URL+"resumes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: resumeinfo.id, 
        resumeinfo 
        })
      });
      setLoading(false);
        
        
      }
  return (
    <div className='p-5 shadow-lg rounded border-t-sky-400 border-t-[5px]'>
       <h2 className='font-bold font'>Personal detail</h2>
       <p className='font-semibold text-md'>
        Get Started with the basic information
       </p>
            <form action="" onSubmit={submit} >
        <div className=' grid-cols-2  gap-3 font-semibold text-sm m-5'>
               <div>
               <label htmlFor="">First Name</label>
               <Input required name='firstName' value={resumeinfo?.firstName} onChange={(e)=>{handlechange(e)}}/></div>
               <div>
                <label htmlFor="">Last Name</label>
                <Input required name='lastName' value={resumeinfo?.lastName} onChange={(e)=>{handlechange(e)}} />
               </div>
                <div className='col-span-1 md:col-span-2'>
                  <label>Job Title</label>
                  <Input required value={resumeinfo?.jobTitle} name='jobTitle' onChange={(e)=>{handlechange(e)}} />
                </div>
                <div className='col-span-2'>
                  <label>Address</label>
                  <Input required value={resumeinfo?.address} name='address' onChange={(e)=>{handlechange(e)}} />
                </div>
                <div>
                  <label htmlFor="">Phone</label>
                  <Input value={resumeinfo?.phone} required name='phone' onChange={(e)=>{handlechange(e)}} />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <Input required value={resumeinfo?.useremail} name='useremail' onChange={(e)=>{handlechange(e)}} />
                </div>
               <div className='flex justify-end col-span-2 mt-5'>
                  <Button type="submit" disabled={!saving}>{loading?<Loader/>:"Save"}</Button>
               </div>
        </div>
            </form>
    </div>
  )
}

export default Personal