import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Loader } from 'lucide-react';
import { Resumeinfo } from '@/context/resumeinfo';
import { useContext } from 'react';
// import e from 'express';
const form= {
  name:'',
  rating:80,
}
const Skills = () => {
  const handlechange=(e,index)=>{
    const { name, value } = e.target;
    // setSave(true)
    const updatedskill = [...skill];
    setSave(true);
    updatedskill[index][name] = value;
    setSkill(updatedskill);
  }
  const addskill=()=>{
    //  e.preventDefault();
    setSkill([...skill,{
      name:'',
      rating:80,
    }])
  }
  const removeskill=()=>{
    setSkill(skill=>skill.slice(0,-1))
  }
  const submit=async(e)=>{
    setLoading(false);
    e.preventDefault();
    console.log(skill)
    const res = await fetch("http://localhost:3000/resumes", {
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
  }
  const { resumeinfo, setResumeinfo } = useContext(Resumeinfo)
  const[loading,setLoading]=useState(true);
  const [save,setSave]=useState(false);
  const[skill,setSkill]=useState(resumeinfo?.education||[form]);
  const handleRatingChange=(value,index)=>{
    const updatedSkills = [...skill];
      updatedSkills[index].rating = value*20;
      setSkill(updatedSkills);
      setSave(true)

  }
  //  const[loading,setLoading]=useState(false)
  useEffect(()=>{
    setResumeinfo({ ...resumeinfo, skills: skill })
    console.log(resumeinfo?.education)
  },[skill])
  return (
    <div className='p-5 shadow-lg rounded border-t-sky-400 border-t-[5px]'>
       <h2 className='font-bold font-serif' >Skill</h2>
       <div className='mb-3'> Add your skills</div>
       <form action="" type="submit">
        {
          skill.map((item,index)=>(
             <div className='flex justify-between items-center border p-3 gap-3 mb-4 rounded  ' key={index}>
               <div>
               <label htmlFor="" className='font-semibold text-sm' >Skill</label> 
               <Input value={item?.name} name="name" onChange={(e)=>{handlechange(e,index)}} />
               </div>
               <div>
               <Rating style={{ maxWidth: 150 }} value={item?.rating/20} name="rating" onChange={(value) => handleRatingChange(value, index)} />
               </div>
             </div>
          ))
        }
        <div className='mt-6 flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='text-blue-600'>
                <Button variant="outline" type="button" onClick={addskill} className><PlusCircle />Add Skill </Button></div>
              <div className='text-blue-600'>
                <Button variant="outline" type="button"  onClick={removeskill} className>Remove </Button></div>
            </div>
            <div className='text-blue-600 mt-3'>
              <Button className type="button" disabled={!save} onClick={submit}>{!loading?<Loader/>:"Save"}</Button></div>
              
          </div>
        </form>
    </div>)
}

export default Skills