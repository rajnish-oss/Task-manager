 import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
 import axios from 'axios'
 const URL = "http://localhost:8800/api/user/"

 export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async(userData,{rejectWithValue}) => {
        try {
            const res  = await axios.post(URL + "register",userData,
            {
              headers: {
                "Content-Type": "application/json", 
              },
            });

            if (!res.data.user || !res.data.token) {
                throw new Error("Invalid registration response");
                
              }
          
              localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            return res.data;
        }catch(error){
            console.log(error.message)
            return rejectWithValue(error.response?.data?.error || "Registration failed");
        }
    }
 )

 export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(Credential,{rejectWithValue}) =>{
        try {
            const res = await axios.post(URL + "login", Credential, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            if(!res.data.user || !res.data.token){
                console("login data",res.data)
                throw new Error("login failed")
            }
      
            return res.data;
          } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
          }
    }
 )


 const initialState = {
    user : localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== "undefined" ? JSON.parse(localStorage.getItem("userInfo")):null,
    isSidebarOpen:false,
    token:localStorage.getItem("token"),
    status:"idle",
    error:null
 }

 const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.user = action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            state.user = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token")
        },
        setOpenSidebar:(state,action)=>{
            console.log("sidebar state",action.payload)
            state.isSidebarOpen = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
       //register
        .addCase(registerUser.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.status = "succeeded";
            const updatedUser = action.payload.user;
            const usersss = action.payload
            console.log(usersss)
            if(state.user && state.user._id !== updatedUser._id){
                state.user = updatedUser
            }

            localStorage.setItem("userInfo", JSON.stringify(updatedUser));
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload;
        })

        //login
        .addCase(loginUser.pending,(state,action)=>{
            state.status = "loading";
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.status = "failed";
            state.error = action.payload
        })
    }
 });

 export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

 export default authSlice.reducer