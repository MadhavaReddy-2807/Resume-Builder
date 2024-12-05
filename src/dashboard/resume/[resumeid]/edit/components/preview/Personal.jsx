import React from 'react'

const Personal = ({resumeinfo}) => {
  return (
    <div>
      <h2 className='font-bold text-xl text-center' style={{
        color:resumeinfo?.themeColor
      }}>{resumeinfo?.firstName} {resumeinfo?.lastName}</h2>
       <h2 className='text-center font-semibold'>{resumeinfo?.jobTitle}</h2>
       <h2 className='text-center font-normal  text-xs '
       style={
        {
          color:resumeinfo?.themeColor
        }
       }>{resumeinfo?.address}</h2>
       <div className='flex justify-between text-xs'>
          <h2 style={{
            color:resumeinfo?.themeColor
          }}>{resumeinfo?.phone}</h2>
          <h2 style={{
            color:resumeinfo?.themeColor
          }}>{resumeinfo?.useremail}</h2>
       </div>
          <hr className='border-[1px] mt-5 mb-3'style={{
            borderColor:resumeinfo?.themeColor
          }} />
    </div>

  )
}

export default Personal