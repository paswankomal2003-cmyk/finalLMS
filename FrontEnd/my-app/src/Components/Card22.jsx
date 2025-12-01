import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { RemoveCourse } from '../Redux/Slices/CoursesSlice'

function Card22({ course }) {
    const navigate = useNavigate()
    return (

        <div className='border shadow-xl shadow-white p-5 w-[22rem] h-[430px] cursor-pointer overflow-hidden rounded-md'
            >

            <div onClick={() => navigate("/course/description", { state: course })}>
                <div className=' border overflow-hidden '>
                    <img src={course?.thumbnail?.secure_url} alt="" className='h-48 w-full rounded-lg group-hover:scale-[1,2] transition-all' />
                </div>

                <br />
                <div className='p-3 space-y-1'>
                    <h1>Title:  {course.title}</h1>
                    <h1>Category: {course?.category}</h1>
                    <h1>Total Leactures: {course?.numberOfLecture}</h1>
                    <h1>Instructor: {course?.createdBy}</h1>
                </div>
            </div>

            {/* <div className='flex justify-evenly items-center pb-3'>
                    <button className=' p-2 bg-blue-600 rounded-md hover:bg-blue-500 text-white font-bold transition-all ease-out' onClick={removeCourse}>Remove Course</button>
                </div> */}

        </div>
        

    )
}

export default Card22
