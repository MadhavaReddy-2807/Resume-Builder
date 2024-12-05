import React, { useContext } from 'react'
import { Resumeinfo } from '@/context/resumeinfo'
import Personal from './preview/Personal'
import Summary from './preview/Summary'
import Education from './preview/Education'
import Experience from './preview/Experience'
import Skills from './preview/Skills'
//this gets resume info from context that paralley changes in both resume preview and also in resume form
const Resumepreview = () => {
  const{resumeinfo,setResumeinfo}=useContext(Resumeinfo)
  return (
    <div className='shadow-xl border p-10 border-t-[20px]  h-full'
    style={{
       borderColor:resumeinfo?.themeColor}
    }>
        <Personal resumeinfo={resumeinfo}/>
        <Summary resumeinfo={resumeinfo}/>
        <Experience resumeinfo={resumeinfo}/>
        <Education resumeinfo={resumeinfo}/>
        <Skills  resumeinfo={resumeinfo}/>
    </div>
  )
}

export default Resumepreview