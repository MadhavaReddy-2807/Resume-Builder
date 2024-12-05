import React from 'react'

const Experience = ({resumeinfo}) => {
  return (
   resumeinfo?.experience&&
    <div className='mt-5  mb-1'>
      <h2 className='text-center font-semibold text-xl' style={{
        color:resumeinfo?.themeColor
      }} >Professional Experience</h2>
       <hr className='border-[1px] mt-2 mb-3'style={{
            borderColor:resumeinfo?.themeColor
          }} />
        <div>
           {resumeinfo?.experience.map((item,index)=>(
              <div key={index} className='mb-4'>
               <h2 className='font-bold text-[17px]' style={{
                color:resumeinfo?.themeColor
               }}>{item?.title}</h2>
               <h2 className='mt-1 text-sm mb-4 flex justify-between'>{item?.companyName&&item?.companyName+','}{item?.city&&item?.city+","}{item?.state} <span className=' font-thin'>{item?.startDate&&item?.startDate+' - '}{item.endDate=="Today"?'Present':item?.endDate}</span></h2>
               {/* <div>{item?.workSummery}</div> */}
               <div dangerouslySetInnerHTML={{ __html: item?.workSummery }}></div>
               </div>
           ))}
        </div>
    </div>
    

  )
}

export default Experience