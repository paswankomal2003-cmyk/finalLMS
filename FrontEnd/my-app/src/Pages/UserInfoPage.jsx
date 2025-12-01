import { useEffect } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserData } from "../Redux/Slices/AuthSlice";


const UserInfoPage = () => {

    const navigate = useNavigate()

    const UserData = useSelector((state) => state?.auth?.data)

    console.log("user Dataaa", UserData)

    return (
        <div className="flex flex-col justify-center items-center h-[100vh]  gap-3 ">

            <h1 className="p-2 rounded-md bg-blue-500 font-bold text-black hover:bg-blue-400 cursor-pointer shadow-2xl shadow-red-700 ">
                USER INFO
            </h1>

            <div className="border p-9 w-[50%] flex flex-col justify-center items-center shadow-2xl shadow-white rounded-xl">
                <FaUserGraduate className='size-16' />
                <br />
                <h1>Name</h1>
                <h1 className=" p-2 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-400 cursor-pointer">
                    {UserData.fullName}
                </h1>
                <h1>Email</h1>
                <h1 className="p-2 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-400 cursor-pointer">{UserData.email}</h1>

                <h1>Role</h1>
                <h1 className="p-2 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-400 cursor-pointer">{UserData.role}</h1>

                <h1>Subscription</h1>
                <h1 className="p-2 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-400 cursor-pointer">NONE</h1>

                <button className="border p-2 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-md mt-2 font-bold text-white"
                    onClick={() => {
                        navigate("/user/profileUpdate")
                    }}>Edit ProFile</button>

            </div>



        </div>
    )
}

export default UserInfoPage