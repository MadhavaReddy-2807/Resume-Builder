import React from 'react'

const Skills = ({resumeinfo}) => {
  
  return (
    resumeinfo?.skills&&
    <div>
        <h2 className='text-center font-semibold text-xl' style={{
        color: resumeinfo?.themeColor
      }} >Skills</h2>    
      <hr className='border-[1px] mt-2 mb-3' style={{
      borderColor: resumeinfo?.themeColor}}></hr>
       <div className='grid grid-cols-2 gap-3'>
          {resumeinfo.skills.map((item,index)=>(
            <div className='flex flex-row  gap-4' key={index}>
              <h2>{item?.name}</h2>  {item?.rating>0&&<div className='bg-gray-500 skill mt-2 w-[120px] h-2'  >  
                <div className='h-2' style={{
                backgroundColor:resumeinfo.themeColor,
                width: (item.rating+'%')
              }}>
                </div></div>}
               
            </div>
          ))}
       </div>
    </div>
  ) 
}

export default Skills