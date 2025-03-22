import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:8800/api/user/"

export const fetchUser = createAsyncThunk(
    'users/fetchUsers',async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")

            if (!token) {
                console.log("token expired")
                return rejectWithValue("No token found, please log in");
            }
            
            
            const res = await axios.get(URL + "get-team",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            // console.log(res.data)
            return res.data
        } catch (error) {
            console.log("error",error)
            return rejectWithValue(error.response?.data?.message)
        }
    }
)



export const updateUser = createAsyncThunk(
    'user/updateProfile',async(_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            console.log(token)
            if(!token){
                throw new Error("token not available")
            }

            const res = await axios.put(URL + "profile",formatData,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
            })
             console.log(res.data)
            return res.data
        } catch (error) {
            rejectWithValue(error.response?.data?.error)
        }
    }
)

const userSlice = createSlice({
    name:"user",
    initialState:{
        users:[],
        user:null,
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder

       .addCase(fetchUser.pending,(state)=>{
        state.status = "loading";
       })
       .addCase(fetchUser.fulfilled,(state,action)=>{
        state.status = "fulfilled";
        state.users = action.payload.user;
       })
       .addCase(fetchUser.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error.message;
       })

       .addCase(updateUser.pending,(state)=>{
        state.status = "loading";
       })
       .addCase(updateUser.fulfilled,(state,action)=>{
        state.status = "fulfilled";
        state.user = action.payload;
       })
       .addCase(updateUser.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.error.message;
       })
    }
})

export default userSlice.reducer