import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RemoveCourse } from '../Redux/Slices/CoursesSlice';
import { useDispatch, useSelector } from 'react-redux';

function DescriptionPage() {
    const { state } = useLocation();
    const Role = useSelector((state) => state?.auth?.data?.role);
    const id = state._id; // Extracted INDIVIDUAL course ID
    console.log(id)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removeCourse = async () => {
        const result = await dispatch(RemoveCourse(state._id));

        if (result?.payload?.success) {
            navigate("/");
        }
    };

    useEffect(() => {
        console.log("Course Data in DescriptionPage:", state);
    }, [state]);

    return (
        <div className='h-[80vh] justify-center items-center flex w-full'>
            <div className='flex p-4 gap-3 px-44 border w-1/2 shadow-xl shadow-white rounded-lg'>
                {/* Image and Details */}
                <div className='w-1/2'>
                    
                    <img className='rounded-md cursor-pointer' src={state.thumbnail?.secure_url} alt="CourseImage" />
                    <br />
                    <h1 className='text-xl'>Course Title</h1>
                    <h1 className='text-xl border p-2 shadow-lg shadow-white rounded-md'>{state.title}</h1>
                    <br />
                    <h1 className='text-xl'>Number of Lectures</h1>
                    <h1>{state._id}</h1> here i will check the course ID
                    <h1 className='text-xl border p-2 shadow-lg shadow-white rounded-md'>{state.numberOfLecture}</h1>
                    <button className='p-4 border w-full mt-3 rounded-md bg-yellow-600 text-white font-bold hover:bg-gray-600 transition-all ease-out'>Subscribe</button>
                    
                    {Role === "ADMIN" && (
                        <div className='flex justify-evenly items-center pb-3'>
                            <button className='p-4 border w-full mt-3 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-400 transition-all ease-out' onClick={removeCourse}>Remove Course</button>
                            {/* Navigate and pass the ID */}
                            <button
                                className='p-4 border w-full mt-3 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-400 transition-all ease-out'
                                // onClick={() => navigate("/course/leacture", { state: { state } })}
                                onClick={() => navigate("/course/leacture", { state: { myData: state._id } })}

                                
                            >
                                Add Course Lectures
                            </button>

                            <button
                                className='p-4 border w-full mt-3 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-400 transition-all ease-out'
                                // onClick={() => navigate("/course/leacture", { state: { state } })}
                                onClick={() => navigate("/course/leactures", { state: { myData: state._id } })}

                                
                            >
                                See The Course Leacures
                            </button>
                        </div>
                    )}
                </div>

                {/* Additional Details */}
                <div className='w-1/2 flex flex-col'>
                    <h1 className='font-semibold text-xl'>Course Instructor</h1>
                    <h1 className='border p-2 shadow-lg shadow-white rounded-md'>{state.createdBy}</h1>
                    <br />
                    <h1 className='text-xl'>Course Category</h1>
                    <h1 className='text-xl border p-2 shadow-lg shadow-white rounded-md'>{state.category}</h1>
                    <br />
                    <h1 className='text-xl'>Course Description</h1>
                    <h1 className='text-sm border p-2 shadow-lg shadow-white rounded-md'>{state.description}</h1>
                </div>
            </div>
        </div>
    );
}

export default DescriptionPage;
