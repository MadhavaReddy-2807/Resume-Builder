import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Resumeinfo } from '@/context/resumeinfo'
import { AIchatSession } from '@/gemini/gemini'
import { Brain, Loader } from 'lucide-react'
const Summary = ({enableNext}) => {
  const handlechange=(e)=>{
      setSave(true)
     setResumeinfo({...resumeinfo,[e.target.name]:e.target.value})
  }
  const[loading,setLoading]=useState(false)
  const handlesubmit=async (e)=>{
    // enableNext(true)
    setLoader(true)
    e.preventDefault();
    const res = await fetch("http://localhost:3000/resumes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: resumeinfo.id, 
      resumeinfo 
      })
    });
    // setSaving(false)
    setLoader(false)
  }
  const[loader,setLoader]=useState(false)
   const[save,setSave]=useState(false);
  const  generatesummary=async ()=>{
     setLoading(true)
     const result=await AIchatSession.sendMessage(`JobTitle:${resumeinfo?.jobTitle}.Depending on job title give me a summary in 4-5 lines `)
    //  console.log(result.response.text());
    const x=result.response.text();
    setSave(true)
    //  resumeinfo?.summary=result.response.text();
    setResumeinfo({...resumeinfo,["summary"]:x})
     setLoading(false)
  }
   const [saving,setSaving]=useState(false);
  const{resumeinfo,setResumeinfo}=useContext(Resumeinfo)
  return (
    <div className='p-5 shadow-lg rounded border-t-sky-400 border-t-[5px]'><h2 className='font-bold font'>Summary</h2>
  <form action="" onSubmit={handlesubmit}>
      <p className='font-semibold text-md'>
        Add summary to your job title     </p>  <div className='flex flex-col md:flex-row   mt-5 justify-between'> <span className='font-semi bold text-lg '>Add summary </span> <Button variant="outline" className="border-blue-400" onClick={generatesummary}>{loading?<Loader className='animate-spin'/>: <Brain className='h-4 w-4'/>}{!loading?"Generate from AI":"Generating"}</Button></div>
      <Textarea className="mt-5 h-40  border-blue-400" name="summary" value={resumeinfo?.summary} onChange={(e)=>handlechange(e)} />
       <div className='flex justify-end'>    <Button  type="submit"disabled={!save} onClick={enableNext(true)} className="mt-3 flex">{loader?<Loader/>:"Save"} </Button></div></form>

    </div>

  )
}

export default Summary