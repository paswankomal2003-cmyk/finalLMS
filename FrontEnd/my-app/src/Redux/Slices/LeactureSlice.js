import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

const initialState = {
    leacture:[]
}


// get all the course leactures with the help of course ID. -> cid --> (course ID)
export const getCourseLectures = createAsyncThunk("/course/leactures/get",async(cid)=>{
    try{

        const responce = axios.get(`http://localhost:5555/course/${cid}`)
        toast.promise(responce,{
            loading:"Fetching Course Lectures",
            success:"Lectures fetched successfully",
            error:"fail to Load the leactures"
        });

        return (await responce).data

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})


// add course leactures with the help of Course Id.  cid --> (course ID)
export const addCourseLeacture = createAsyncThunk("/course/leactures/post",async(data)=>{
    try{

        // creating a form data that form data is send to backend as a form data and backEnd handle that form data.

        const formData = new FormData();
        formData.append("lecture",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)


        const responce = axios.post(`http://localhost:5555/course/${data.id}`,formData)  //here we are send the form data to that api.
        toast.promise(responce,{
            loading:"wait adding course leactures",
            success:"Added Course Lectures sucessufully",
            error:"fail to ADD the leactures into Course"
        });

        return (await responce).data

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

// delete the course lecture.
// Remember that u don`t have to delete the whole course u have to delete tthe leactures inside that particular course okokokok.
export const deleteCourseLecture = createAsyncThunk("/course/leactures/delete",async(data)=>{
    try{

        const responce = axios.delete(`http://localhost:5555/course/${data.id}`)  // delete api is not present so u have to create api then u can delete the leacuters from DB.
        toast.promise(responce,{
            loading:"wait deleting course leactures",
            success:"Course Lectures delete sucessufully",
            error:"fail to Delete the leactures from Course"
        });

        return (await responce).data

    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})




const leactureSlice = createSlice({
    name:"leacture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled,(state,action)=>{
            state.leacture = action?.payload?.leacture;

        })

        .addCase(addCourseLeacture.fulfilled,(state,action)=>{
            state.leacture = action?.payload?.course?.leacture;

        })

    }
})

export default leactureSlice.reducer;
