import React, { useState } from 'react'
import { FaUserGraduate } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { UserLogin } from '../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';

function LoginPage() {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmitData = async(e)=>{
        e.preventDefault()

        if (!email || !password) {
            toast.error("Both email and password are required");
            return; // Stop execution if fields are missing
        }

        const Result = await dispatch(UserLogin({email, password}))
        if(Result?.payload?.success){
            navigate("/")
        }   
    }


    return (
        <div className='w-full h-[80vh] flex justify-center items-center '>
            <div className='border flex flex-col justify-center items-center p-10 w-[40%] shadow-white shadow-xl rounded-lg '>
                <FaUserGraduate className='size-16' />
                <br />
                <h1> Email</h1>
                <input
                        type="email"
                        name="email"
                        id="email"
                        className='rounded-md p-2'
                        placeholder='Enter Your Name '
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                <br />

                <h1> PassWord</h1>
                <input
                        type="password"
                        name="password"
                        id="password"
                        className='rounded-md p-2'
                        placeholder='Enter Your Name '
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />


                <br />
                {/* Buttons Submit and navigate to signup page  */}
                <div className='flex item-center flex-col'>

                    <button 
                    className='border p-2 rounded-md font-semibold bg-blue-700 text-white hover:text-black hover:bg-white'
                     onClick={handleSubmitData}
                    
                    >Submit</button>
                    <br />
                    {/* <link to="/signup" >SignUp</link> */}

                  <pre> create new Account <Link to="/signup" className='text-blue-600 underline cursor-pointer'>signup</Link> </pre>

                </div>



            </div>
        </div>
    )
}

export default LoginPage
