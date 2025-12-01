import React from 'react'

function Card({course}) {
  return (
    <div className='h-[80vh] w-full flex flex-col justify-center items-center '>
     {/* <div className=' w-full border flex flex-col justify-center items-center cursor-pointer p-5 gap-4'>
      <img src={course?.thumbnail?.secure_url} alt="Course Image" />
     title : {course?.title}
      <br />
      description: {course.description}

     </div> */}

     <div className='border flex flex-col justify-center items-center p-5'>

      <div>
        <img src={course?.thumbnail?.secure_url} alt="" />
      </div>

      <br />
      Course Title:<h3>{course.title}</h3>
      
     </div>
    </div>
  )
}

export default Card
