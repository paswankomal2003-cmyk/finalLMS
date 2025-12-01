import { useNavigate } from "react-router-dom"


const NotFoundPage = ()=>{
    const navigate = useNavigate()
    return(
       <div className="flex justify-center items-center h-[80vh] flex-col ">

        <h1 className="font-bold text-8xl "> 404 </h1>

        <div className="bg-black text-white test-sm absolute p-[0.4px] rounded-md rotate-12 ">
            Page Not FOund
        </div>

        <div>
            
        </div>
        <button onClick={(e)=>{navigate(-1)}} className="p-2 border my-3 rounded-md bg-yellow-400 text-black font-semibold hover:bg-gray-600 hover:text-white">
            Go Back
        </button>
       </div>
    )
}

export default NotFoundPage