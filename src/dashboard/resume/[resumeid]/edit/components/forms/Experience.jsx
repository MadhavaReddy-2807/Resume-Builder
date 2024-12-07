import React, { useEffect } from 'react'
import { Resumeinfo } from '@/context/resumeinfo'
import { useState } from 'react'
import { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle, PlusSquare } from 'lucide-react'
import Richtexteditot from '@/components/ui/Richtexteditot'
import { Loader } from 'lucide-react'
import { Brain } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { AIchatSession } from '@/gemini/gemini'
const Experience = () => {
  const form = {
    title: "",
    companyName: "",
    city: "",
    state: '',
    startDate: "",
    endDate: "",
    workSummery: ""
  }
  //  const[save,setSave]=useState(false);
  const submit = async (e) => {
    setsaveLoading(true)
    e.preventDefault()
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
    setsaveLoading(false)
    toast('Saved')

  }
  const [loading, setLoading] = useState(false)
  const [saveloading, setsaveLoading] = useState(false)
  const handlechange = (e, index) => {
    const { name, value } = e.target;
    setSave(true)
    const updatedExperience = [...experience];
    updatedExperience[index][name] = value;
    setExperience(updatedExperience);
    //  console.log(experience)
  }
  // const
  const summarychange = (e, field, index) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = e.target.value; // Update the specific field
    setSave(true)
    setExperience(updatedExperience);
  };

  const addexperence = () => {
    setExperience([...experience, {...form}])
  }
  const generatesummary = async (index) => {
    setLoading(true)
    const updateexperience = [...experience];
    const result = await AIchatSession.sendMessage(`I have worked as PositionTitle:${resumeinfo?.experience[index].title},Depends on position title give me 2-3 Bullet points for my resume in html format gice only bullet points dont give additonal info just give bullet points and no square brackets`)
    //  console.log(result.response.text());
    const x = result.response.text();
    const sanitizedResponse = x.replace(/```html|```/g, '').trim();

    //  setSave(true)
    //  resumeinfo?.summary=result.response.text();
    //  setResumeinfo({...resumeinfo,experience[index].workSummery:x})
    updateexperience[index].workSummery = sanitizedResponse;
    setExperience(updateexperience);
    setLoading(false)
  }
  const removeexperence = () => {
    setExperience(experience => experience.slice(0, -1))
  }
  const { resumeinfo, setResumeinfo } = useContext(Resumeinfo)
  const [experience, setExperience] = useState(resumeinfo?.experience ? resumeinfo?.experience : form)
  useEffect(() => {
    setResumeinfo({ ...resumeinfo, experience: experience })
    //  setSave(true)
  }, [experience])
   const[save,setSave]=useState(false);
  return (
    <>   <div className='p-5 shadow-lg rounded border-t-sky-400 border-t-[5px]'>
                    <ToastContainer />

      <h2 className='font-bold font'>Professional Experience</h2>
      <p className='font-semibold text-md mb-3'>Add Your previous Job experience
      </p>
      <div className='border p-3 rounded  '>
        <form action="" onSubmit={submit} >
          <div className=''>
            {experience.map((item, index) => (
              <div key={index} className='mb-5 border p-3 rounded' >
                <div className='grid grid-cols-2 gap-4  '>
                  <div className='col-span-2 md:col-span-1'>
                    <label className='text-sm font-semibold' htmlFor="">Position Title</label>
                    <Input name="title" onChange={(e) => { handlechange(e, index) }} value={item.title} />
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label className='text-sm font-semibold' htmlFor="">Company Name</label>
                    <Input name="companyName" onChange={(e) => { handlechange(e, index) }} value={item.companyName} />
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label className='text-sm font-semibold' htmlFor=""> City</label>
                    <Input name="city" onChange={(e) => { handlechange(e, index) }} value={item.city} />
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label className='text-sm font-semibold' htmlFor=""> State</label>
                    <Input name="state" onChange={(e) => { handlechange(e, index) }} value={item.state} />
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label htmlFor="" className='text-sm font-semibold' >Start Date</label>
                    <Input name="startDate" type="date" onChange={(e) => { handlechange(e, index) }} value={item.startDate} />
                  </div>
                  <div className='col-span-2 md:col-span-1'>
                    <label htmlFor="" className='text-sm font-semibold' >End Date</label>
                    <Input name="endDate" type="date" onChange={(e) => { handlechange(e, index) }} value={item.endDate} />
                    {/* rich text editior is used add bold italic and styles to text area  npm install react-simple-wysiwyg

*/}
                  </div>
                  <div className='flex flex-col gap-2 md:flex-row justify-between col-span-2'>               <label htmlFor="" className='text-sm font-semibold'>Summary</label>
                    <Button variant="outline" className="border-blue-400" onClick={() => { generatesummary(index) }}>{loading ? <Loader className='animate-spin' /> : <Brain className='h-4 w-4' />}{!loading ? "Generate from AI" : "Generating"}</Button>
                  </div>

                  <div className='col-span-2'>
                    <Richtexteditot
                      intial={experience[index].workSummery} // Pass the current summary
                      oneditorchange={(value) => {
                        summarychange({ target: { value } }, 'workSummery', index); // Dynamically update 'workSummery'
                      }}
                    />
                  </div>

                </div>
              </div>
            ))}</div>
          <div className='mt-6 flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='text-blue-600'>
                <Button variant="outline" onClick={addexperence} className><PlusCircle />Add more Experience </Button></div>
              <div className='text-blue-600'>
                <Button variant="outline" onClick={removeexperence} className>Remove </Button></div>
            </div>
            <div className='text-blue-600 mt-3'>
              <Button className type="submit" disabled={!save}  >{saveloading?<Loader className='animate-spin'/>:"Save"}</Button></div>
          </div></form>
      </div>
    </div></>

  )
}

export default Experience