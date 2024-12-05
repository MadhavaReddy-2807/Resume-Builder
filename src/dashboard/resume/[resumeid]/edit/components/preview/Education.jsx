
const Education = ({ resumeinfo }) => {
  return (
    resumeinfo?.education && <div>
      <h2 className='text-center font-semibold text-xl' style={{
        color: resumeinfo?.themeColor
      }} >Education</h2>
      <hr className='border-[1px] mt-2 mb-3' style={{
        borderColor: resumeinfo?.themeColor
      }} />
      <div>
        {resumeinfo.education.map((item, index) => (
          <div className='mb-4' key={index}>
            <h2 className='font-bold  ' style={{
              color: resumeinfo?.themeColor
            }} >{item?.universityName}</h2>
            <h2 className='flex justify-between'>{item?.degree&&item?.degree+' in' }  {item?.major ? item?.major:""} <span className='font-thin'>{item?.startDate}{item?.endDate && '-'+item?.endDate}</span></h2>
            <div className='mt-3'>{item?.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Education


