import React, { useEffect,useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slice/api/authApiSlice.js';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'


const Login = () =>{
    const {user} = useSelector((state)=>state.auth)
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    
    const navigate = useNavigate();
    const [login,{isLoading}] = useLoginMutation()

    const [newUser, setNewUser] = useState(true);

    useEffect(()=>{
        user && navigate("/dashboard")
    },[user])

    async function submitHandler(data){
      try {
        const result = await login(data).unwrap();
      console.log(result);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error.message)
      }
    }
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>
        {/* right side */}
        {newUser ? (
          <SignUp setNewUser={setNewUser} />
          // <SignIn setNewUser={setNewUser} /> 
        ) : (
          <SignIn setNewUser={setNewUser} /> 
        )}
      </div>
      </div>
    );
}

export default Login 