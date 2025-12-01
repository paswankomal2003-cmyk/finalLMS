import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (

    <div className=' w-full flex-row justify-evenly items-center p-4  shadow-2xl shadow-white text-white h-[10vh]'>

      <div className='flex flex-row justify-between items-center gap-2 px-4 py-4'>
        <div>
          <h1 className='font-bold hover:text-blue-600'> @CopyRight </h1>

        </div>

        <div className='flex gap-2 text-2xl  '>
          <h1> <FaInstagram className='font-bold hover:text-pink-600 ' /> </h1>
          <h1> <FaFacebook  className='font-bold hover:text-red-600'/> </h1>
          <h1> <FaFacebookMessenger className='font-bold hover:text-yellow-600' /> </h1>
          <h1> <FaLinkedin className='font-bold hover:text-blue-600' /> </h1>
        </div>


      </div>

    </div>
  )
}

export default Footer
