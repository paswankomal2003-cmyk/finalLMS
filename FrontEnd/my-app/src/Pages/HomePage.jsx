import React from 'react'
import homePageImage from '../Assets/Images/homePageMainImage.png'
import {Link} from 'react-router-dom'

function HomePage() {
    return (
        <div className='flex flex-row justify-center h-[80vh] gap-5 items-center p-7 '>

            <div className='flex gap-4 items-center'>

                <div className='flex w-1/2 p-6 flex-col'>

                Welcome to a journey where learning transforms into empowerment and every challenge brings you closer to success! At our core, we believe that with the right tools, guidance, and dedication, you can build a future filled with possibilities. This isn’t just about mastering skills; it's about building confidence, resilience, and a mindset ready for the world ahead. Remember, every line of code, every concept you master, is a step toward unlocking a potential that’s uniquely yours. Let's dive in, push boundaries, and make your aspirations a reality!

                <div className='flex justify-start my-4 gap-4'>
                    <button className='border p-4 rounded-lg bg-blue-700 text-white font-bold  hover:text-orange-700 hover:bg-gray-700'>
                        <Link to="/courses">Explore Courses</Link>
                    </button>

                    <button className='border p-4 rounded-lg text-black bg-yellow-500  font-bold hover:bg-gray-700 hover:text-white'>
                        <Link to="/contact">Contact US</Link>
                    </button>
                </div>

                


                </div>

                {/* here is the image only*/}
                <div className=' flex justify-center w-1/2  p-4 '>

                    <img src={homePageImage} alt="homePageImage" className='rounded-full ' />

                </div>
            </div>

        </div>
    )
}

export default HomePage
