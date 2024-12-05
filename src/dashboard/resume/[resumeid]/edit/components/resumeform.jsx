import React, { useContext, useEffect } from 'react'
import Personal from './forms/Personal'
import Summary from './forms/Summary'
import { useState } from 'react'
import Experience from './forms/Experience'
import Educational from './forms/Educational'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import Skills from './forms/Skills'
import { Resumeinfo } from '@/context/resumeinfo'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowLeftSquare, ArrowRight, HomeIcon, Layout, LayoutGrid } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Resumeform = () => {
  const navigate = useNavigate();
  const { resumeinfo, setResumeinfo } = useContext(Resumeinfo)
  const [active, setActive] = useState(1);
  const [enablenext, setEnablenext] = useState(true);
  const handleprev = () => {
    setActive(active - 1);
  }
  // useEffect(()=>{setEnablenext(false)},[active])
  const next = () => {
    setActive(active + 1);
  }
  const saved = (v) => {
    // setEnablenext(v)
    // setEnablenext(false)
    // setActive(active+1);
  }
  const colors=[
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
]

  const gohome = () => {
    navigate('/')
  }
  const [selectedColor,setSelectedColor]=useState();
  const onColorSelect=(color)=>{
    setSelectedColor(color)
    setResumeinfo({...resumeinfo,themeColor:color})
  }
  return (
    <div>
      <header className='flex justify-between mb-5'>
        <div className='flex '>
          <div>
          <Button onClick={gohome}><HomeIcon /></Button></div>
          <Popover>
            <PopoverTrigger className='ml-1' ><Button variant="outline" className="ml-1"><LayoutGrid />Theme </Button></PopoverTrigger>
            <PopoverContent><div className='grid grid-cols-5 gap-3'>
        {colors.map((item,index)=>(
            <div 
            onClick={()=>onColorSelect(item)}
            className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor==item&&'border border-black'}
             `}
            style={{
                background:item
            }}>

            </div>
        ))}
    </div></PopoverContent>
          </Popover>
          </div>
        <div className='flex gap-1 ml-3'>
          {active > 1 && <Button onClick={handleprev}><ArrowLeft /></Button>}
          {active < 6 && <Button onClick={next} disabled={!enablenext}>Next<ArrowRight /></Button>}
        </div>
      </header>
      {active == 1 && <Personal enableNext={(v) => { saved(v) }} />}
      {active == 2 && <Summary enableNext={(v) => { saved(v) }} />}
      {active == 3 && <Experience enableNext={(v) => { saved(v) }} />}
      {active == 4 &&
        <Educational />}
      {active == 5 &&
        <Skills />}
      {active == 6 && navigate(`/dashboard/resume/${resumeinfo?.id}/view`)}
    </div>
  )
}

export default Resumeform