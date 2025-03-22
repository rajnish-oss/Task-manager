import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import apiSlice from './slice/apiSlice.js';
import userReducer from './slice/userSlice.js'

const store = configureStore({
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authReducer,
    user:userReducer 
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;