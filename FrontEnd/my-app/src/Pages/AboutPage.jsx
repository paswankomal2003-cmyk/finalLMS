import React from 'react'
import aboutPageImage from '../Assets/Images/aboutMainImage.png'
import Crousel from '../Components/Crousel'

function AboutPage() {
  return (
    <div className='w-full h-[80vh] '>

      <div className='flex flex-row justify-center h-[80vh] gap-5 items-center p-7 '>

        <div className='flex gap-4'>

          {/* simple texts */}
          <div className=' flex justify items-center w-1/2  p-6'>

            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui a sed officia quidem, voluptatem fuga. Adipisci numquam, quisquam dolores quia ad blanditiis cum vitae ipsam ullam officiis. Necessitatibus, labore incidunt.

          </div>

          {/* About page image   */}
          <div className=' flex justify-center w-1/2 items-center p-4 '>

            <img src={aboutPageImage} alt="homePageImage" className='rounded-full ' />

          </div>

         

        </div>
      </div>






    </div>
  )
}

export default AboutPage
