import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import dummy from '../resume/[resumeid]/edit/data/dummy';
import { v4 as uuidv4 } from 'uuid';
import { Navigate } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  
// import { Navigate } from 'react-router-dom';
const Addresume = () => {
  const navigate=useNavigate();
     const {user}=useUser();
     const [loading,setLoading]=useState(false);
     const [dialog,setDialog]=useState(false);
     const [resumetitle,setResumetitle]=useState("");
     const create=async ()=>{
          const id=uuidv4();
          const email=user.primaryEmailAddress?.emailAddress
          setLoading(true);
          const username=user?.fullName
        //   console.log(email);
        //   console.log(username)
        //   console.log(id);
        // console.log(resumetitle)
         const form={
          id:id,
          email:email,
          username:username,
          resumetitle:resumetitle,
          ...dummy
         }
         const res=await fetch(import.meta.env.VITE_SERVER_URL+"resumes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
        //  const data=await res.json();
         if(res.ok)
         {
            console.log('success');
            setLoading(false);
         }
        setResumetitle("");
        // setDialog(fals e)
       navigate(`/dashboard/resume/${id}/edit`)
     }
  return (
    <div className='mt-5'>
        <div className='py-32 border w-[150px]   rounded align-items-center items-center px-32 shadow-sm bg-secondary hover: scale-200 cursor-pointer h-[280px] border-dashed hover:shadow-2xl ' onClick={()=>{setDialog(true)}}>
            <PlusSquare/>

        </div>
        <Dialog open={dialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a New Resume</DialogTitle>
      <DialogDescription>
        <span>Add title to your resume</span>
        <Input placeholder='Ex.Full Stack resume' className='mt-2 ' value={resumetitle} onChange={(e)=>{setResumetitle(e.target.value)}}/>
      </DialogDescription>
       <div className='flex justify-end gap-4'>
          <Button variant='ghost ' onClick={()=>{setDialog(false)}} className='border'>Cancel</Button>
          <Button disabled={!resumetitle} onClick={()=>{create()}}>{loading?<Loader2/>:"Create"}
            
            </Button>
       </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Addresume