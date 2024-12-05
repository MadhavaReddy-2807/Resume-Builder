import React from 'react'

const Summary = ({resumeinfo}) => {
  return (
    <div>
       <p className='text-sm '>
        {resumeinfo?.summary}
       </p>
    </div>
  )
}

export default Summary