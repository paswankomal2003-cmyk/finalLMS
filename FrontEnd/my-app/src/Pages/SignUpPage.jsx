import React, { useState } from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewAccount } from '../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserData = async (e) => {
        e.preventDefault();
       

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@gmail\.com$/;


        if (!email.match(emailRegex)) {
            toast.error("Please provide a valid email.");
            return;
        }

        try {
            const result = await dispatch(createNewAccount({ fullName, email, password }));
            console.log(result);

            if (result?.payload?.success) {
                toast.success("Account created successfully!");
                navigate("/");
            } else {
                toast.error(result.payload?.message || "Error creating account.");
            }
        } catch (e) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className='w-full h-[80vh] flex justify-center items-center'>
            <div className='border flex flex-col justify-center items-center p-10 w-[40%] shadow-white shadow-xl rounded-lg'>
                <FaUserGraduate className='size-16' />
                <br />

                <h1>FullName</h1>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className='rounded-md p-2'
                    placeholder='Enter Your Name'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <br />

                <h1>Email</h1>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='rounded-md p-2'
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <h1>Password</h1>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className='rounded-md p-2'
                    placeholder='Strong password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <div className='flex item-center flex-col'>
                    <button
                        className='border p-2 rounded-md font-semibold bg-blue-700 text-white hover:text-black hover:bg-white'
                        onClick={handleUserData}
                    >
                        Submit
                    </button>
                    <br />
                    <pre> You have an Account? <Link to="/login" className='text-blue-600 underline cursor-pointer'>Login</Link> </pre>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
