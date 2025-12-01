import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async () => {
    try {
      const response = await axios.get("http://localhost:5555/course");
      toast.success("Successfully fetched the data!");
      return response?.data?.Courses;
    } catch (error) {
      toast.error("Fail to fetch the Course");
    }
  }
);

// export const CreateCourse = createAsyncThunk(
//   "/course/createCourse",
//   async ({ title, description, createdBy, category}) => {
//     try {

//       const Result = await axios.post(
//         `http://localhost:5555/course/`,
//         {
//           title,
//           description,
//           createdBy,
//           category,
//         },
//         // // {
//         // //   headers: {
//         // //     Authorization: cookies, // Include the token in the Authorization header
//         // //   },
//         // }
//       );

//       toast.promise(Result, {
//         loading: "Wait Creating your course",
//         success: "Successfully created the course",
//         error: "Failed to create your course",
//       });

//       console.log(Result)

//       return (await Result).data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "An error occurred");
//       throw error; // Re-throw the error to handle it in the thunk's rejected action
//     }
//   }
// );


// hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh   


// export const CreateCourse = createAsyncThunk(
//   "/course/createCourse",
//   async ({ title, description, createdBy, category, avatar}) => {
//     try {
//       const Result = axios.post("http://localhost:5555/course/", {
//         title,
//         description,
//         createdBy,
//         category,
//         avatar
//       });

//       toast.promise(Result, {
//         loading: "Wait a moment",
//         success: (Result) => {
//           return Result?.data?.message;
//         },
//         error: "fail to create your course  ",
//       });

//       return (await Result).data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

export const CreateCourse = createAsyncThunk(
  "/course/createCourse",
  async ({ title, description, createdBy, category, avatar }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("createdBy", createdBy);
      formData.append("category", category);
      formData.append("avata", avatar); // must match multer field name

      const Result = axios.post("http://localhost:5555/course/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(Result, {
        loading: "Wait a moment",
        success: (res) => res?.data?.message,
        error: "Fail to create your course",
      });

      return (await Result).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
      throw error;
    }
  }
);

export const RemoveCourse = createAsyncThunk("/courseRemove",async(id)=>{
  try{
    console.log("COURSE IDDDD",id)
    const Result = axios.delete(`http://localhost:5555/course/${id}`)
    toast.promise(Result,{
      loading:"wawit deleting your course",
      success:"successfully Deleted Course",
      error: "fails to remove Course plx try again letter"
    })

    return (await Result)?.data
  }catch(error){

    toast.error(error?.response?.data?.message)

  }
})

const CoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        // console.log("PAYLOAD -->",action.payload) // data received successfully
        state.courseData = [...action.payload];
        console.log("COURSEDATA-->", state.courseData); // here also data receive successfully.
      }
    });
  },
});

export const {} = CoursesSlice.actions;
export default CoursesSlice.reducer;
