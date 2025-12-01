import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { deleteCourseLecture, getCourseLectures } from '../Redux/Slices/LeactureSlice';

function DisplayLeacture() {

  const navigete = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation(); // it means that navigate karne pe jo data send karna chahte hai vo kar sakte hai.

  // below code all the leacture are collected from the backEnd, now u just have display all the data on your page.
  const { leacture } = useSelector((state) => state.leacture)
  const { role } = useSelector((state) => state.auth)

  const [currentVideo, setCUrrentVideo] = useState(0)

   const onLeactureDelete = async(courseId, leactureId)=>{
    console.log(courseId,leactureId)
    await dispatch(deleteCourseLecture(courseId, leactureId))
    await dispatch(getCourseLectures(courseId));

  }


  useEffect(() => {
    console.log(state);
    if (!state) navigete("/courses");
    dispatch(getCourseLectures(state._id));

  }, [])
  return (
    <>

      <div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white '>

        <div className='text-center text-2xl font-semibold text-yellow-500'>
          course Name: {state?.title}
        </div>

        {leacture && leacture.length >0 && <div className='flex justify-center gap-10 w-full'>

          {/* left section for playing video and displaying course details to admin */}
          <div className='space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] '>
            <video
              src={leacture && leacture[currentVideo]?.leacture?.secure_url}
              className='object-fill rounded-tl-lg rounded-tr-lg w-full' controls disablePictureInPicture muted controlsList='nodownload'>

            </video>

            <div>
              <h1>
                <span className='text-yellow-500'> Title: {" "}
                  {leacture && leacture[currentVideo]?.title}
                </span>
              </h1>

              <p>
                <span className='text-yellow-500'> Description: {" "}
                  {leacture && leacture[currentVideo]?.description}
                </span>

              </p>
            </div>
          </div>

          {/* Right Section  for displaying list of leactures*/}
          <ul className='w-[28re] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4' >
            <li className='font-semibold text-xl text-yellow-500 flex items-center justify-between'>
              <p>Leacture list</p>
              {role === "ADMIN" && (
                <button onClick={()=>{navigete("/course/addNewLeacture",{state:{...state}})}} className='btn-primary px-2 py-1 rounded-lg font-semibold text-sm'> Add new Leacture</button>
              )}
            </li>

            {leacture && leacture.map((leacture, idx) => {
              return (
                <li className='space-y-2' key={leacture._id}>
                  <p className='cursor-pointer' onClick={() => setCUrrentVideo(idx)}>
                    <span>{" "} Leacture {idx + 1} : {" "}</span>
                    {leacture.title}
                  </p>

                  {role === "ADMIN" && (
                    <button onClick={()=>{onLeactureDelete(state._id,leacture._id )}} className='btn-accent px-2 py-1 rounded-lg font-semibold text-sm'> Delete Leacture</button>
                  )}

                </li>
              )
            })}
          </ul>

        </div>}


      </div>

    </>
  )
}

export default DisplayLeacture
