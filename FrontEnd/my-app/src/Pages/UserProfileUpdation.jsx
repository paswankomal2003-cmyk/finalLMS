import axios from 'axios';
import React, { useState } from 'react'
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom';


function UserProfileUpdation() {

    const [fullName, setFullName] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const UserData = useSelector((state) => state?.auth?.data)
    // console.log(UserData)

    const id = UserData._id;

    const handleInout = async(e)=>{
        e.preventDefault()
       try{
        const result = await axios.put(`http://localhost:5555/user/userprofileUpdate/${id}`,{
            fullName,
        }) 

        if(!result){
            toast.error("Fail to update profile")
        }else{
            toast.success("successfully profile updated")
            navigate("/")
        }
    
       }
       catch(error){
        toast.error(error?.response?.data?.message);
       }


    }

    return (
        <div className='h-[80vh] flex flex-col justify-center items-center border'>
            <h1 className='text-2xl font-bold p-3 '> welcome to UserProfile Updation process </h1>
            <div className='border p-4 w-1/2 flex flex-col justify-center items-center gap-3 shadow-2xl shadow-white rounded-xl'>

                <FaUserGraduate className='size-16' />
                <pre>OldName : <input type="text" placeholder={UserData.fullName} disabled className='rounded-md p-2'/></pre>
                <input type="text" name="name" id="name" value={fullName} onChange={(e) => {
                    setFullName(e.target.value)
                }} placeholder='Enter New Fullname' className='rounded-md p-2' />

                <button className='border p-2 rounded-lg font-bold text-white hover:bg-white hover:text-black' onClick={handleInout}> Submit</button>



            </div>
        </div>
    )
}

export default UserProfileUpdation
