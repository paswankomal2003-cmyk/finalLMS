import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../Redux/Slices/AuthSlice';

function Header() {

  let isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

  // const[userLoggedIn, setUserLoggedIn] = useState(useSelector((state) => state?.auth?.isLoggedIn))

  const Role = useSelector((state) => state?.auth?.role)
  console.log("kvjndkjfvnkjd", Role)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // window.location.reload();
  // }, [isLoggedIn]);
  
  const logoutFUN = async (e) => {
    e.preventDefault()
    const Res = await dispatch(userLoggedOut())
  }
  // cosn
  return (
    <div className='flex flex-row justify-center items-center py-4 shadow-2xl '>


      <nav className=' w-full flex flex-row justify-around items-center '>

        {/* logo */}
        <div >
          <Link to="/">
            <img src="https://img.freepik.com/premium-vector/online-courses-logo-design-template_145155-3684.jpg?w=1800" alt="image " className='h-[2cm] cursor-pointer rounded-full 
            shadow-xl hover:shadow-red-500'
            />
          </Link>
        </div>

        {/* Links */}
        <div className='flex gap-5 h-[10vh] items-center justify-center '>

          <h1> <Link to="/" className='font-semibold  shadow-white hover:shadow-red-500'>Home</Link> </h1>

          <h1>  <Link to="/about" className='font-semibold cursor-pointer shadow-white hover:shadow-red-500'>About</Link> </h1>

          <h1>  <Link to="/contact" className='font-semibold cursor-pointer  shadow-white hover:shadow-red-500'>Contact</Link> </h1>

          <h1>  <Link to="/review" className='font-semibold cursor-pointer '>Review</Link> </h1>
        </div>

        {/* Profile */}
        <div className='flex gap-3 items-center'>


          {/* if user is not loggedIn then it will show signup and login */}

          {isLoggedIn && (
            <li className="my-2 flex flex-row w-full ">
              <h1> <Link to="/Profile">
                <CgProfile className='size-9 font-bold cursor-pointer shadow-xl shadow-white rounded-full hover:shadow-red-500' />
              </Link></h1>
              <button className=" px-3 py-1 bg-blue-400 rounded-lg font-semibold mx-2 hover:bg-blue-700">
                <Link to="/profile" className="text-white">profile</Link>
              </button>
              <button className="px-3 bg-orange-500 py-1 rounded-lg font-semibold text-white" onClick={logoutFUN}>
                <Link to="/Login">Logout</Link>
              </button>
            </li>
          )
          }

          {!isLoggedIn && (
            <li className="my-2 flex flex-row w-full ">
              <button className=" px-3 py-1 bg-blue-400 rounded-lg font-semibold mx-2 hover:bg-blue-700">
                <Link to="/Login " className="text-white">Login</Link>
              </button>
              <button className="px-3 bg-orange-500 py-1 rounded-lg font-semibold hover:bg-orange-700">
                <Link to="/signup" className="text-white">SignUp</Link>
              </button>
            </li>
          )
          }

          {/* if role is admin then it will show create button */}

          {Role === "ADMIN" && (
            <li className="my-2 flex flex-row w-full">
              <button className="px-3 py-1 bg-blue-400 rounded-lg font-semibold mx-2 hover:bg-blue-700">
                <Link to="/course/create" className="text-white">Create Course</Link>
              </button>
            </li>
          )}


        </div>
      </nav>
    </div>
  )
}

export default Header
