import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role")||'',
  data: JSON.stringify(localStorage.getItem("data"))||{},
  token: localStorage.getItem("token")||'',

};


// Create new use Account function
export const createNewAccount = createAsyncThunk(
  "/auth/signup",
  async ({ fullName, email, password }) => {
    try {
      const Result = axios.post("http://localhost:5555/user/signup", {
        fullName,
        email,
        password,
      });

      toast.promise(Result, {
        loading: "Wait creating your Account",
        success: (Result) => {
          return Result?.data?.message;
        },
        error: "fail to create Account ",
      });

      return (await Result).data;
    } catch (error) {
      //   console.log(e);
      toast.error(error?.response?.data?.message);
    }
  }
);

// login API Call
export const UserLogin = createAsyncThunk(
  "/auth/Login",
  async ({ email, password }) => {
    try {
      const Result = axios.post("http://localhost:5555/user/login", {
        email,
        password,
      });

      toast.promise(Result, {
        loading: "Wait a moment",
        success: (Result) => {
          return Result?.data?.message;
        },
        error: "fail to login ",
      });

      return (await Result).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);


//  User LoggedOut api call.
export const userLoggedOut = createAsyncThunk(
  "/auth/logout",
  async () => {
    try {
      const Result = axios.post("http://localhost:5555/user/logout");

      toast.promise(Result, {
        loading: "Wait a moment",
        success: (Result) => {
          return Result?.data?.message;
        },
        error: "fail to logout ",
      });

      return (await Result).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("/user/data",async()=>{

  const tokenn = useSelector((state) => state?.auth?.token)

  try{

    const Result = axios.get(`http://localhost:5555/user/getUser?cookie=token="${tokenn}"`)

  }catch(error){
    toast.error(error?.response?.data?.message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createNewAccount.fulfilled, (state, action) => {
      console.log("Payload Creations",action?.payload)
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role",action?.payload?.userr?.role)
      localStorage.setItem("data",action?.payload?.userr)

      state.isLoggedIn = true;
      state.role = action?.payload?.userr?.role
      console.log("Roleee",action?.payload?.userr?.role)
      state.data = action?.payload?.user
    })

    .addCase(UserLogin.fulfilled, (state, action) => {
      console.log("Payload Creationssssssssssssssssss",action?.payload)
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role",action?.payload?.userr?.role)
      localStorage.setItem("data",action?.payload?.userr)
      localStorage.setItem("token",action?.payload?.token)

      state.isLoggedIn = true;
      state.role = action?.payload?.userr?.role
      console.log("Roleee",action?.payload?.userr?.role)
      state.data = action?.payload?.userr
      state.token = action?.payload?.token
      console.log("TOKENNN",state.token )

      console.log("state.dataaaaaaa",state.data)
    })

    .addCase(userLoggedOut.fulfilled,(state,action)=>{
      localStorage.clear();
      state.isLoggedIn = false;
    })
  },

});

export const {} = authSlice.actions;
export default authSlice.reducer;
