import React, { useEffect,useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { toast } from 'sonner';
import { useSelector,useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/slice/api/authApiSlice.js';
import ToggleUser from './Task/ToggleUser';
import {loginUser} from '../redux/slice/authSlice.js';

const SignIn = ({setNewUser}) =>{
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    

        const { register, handleSubmit, watch, formState: { errors } } = useForm();
        const onSubmit = data => console.log(data);
        
        const navigate = useNavigate();
        const [login,{isLoading}] = useLoginMutation()
    
        
    
        useEffect(()=>{
            user && navigate("/dashboard")
        },[user])
    
        function submitHandler(data){
          dispatch(loginUser(data))
        }

    return(
        <>
        <div className='con w-[90vw] md:w-[40vw] p-4 md:p-1 flex flex-col justify-center items-center shadow-xl bg-red-500 relative top-5'>
            <form action="" className='form-container justify-center items-center w-full md:w-[40vw] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14' onSubmit={handleSubmit(submitHandler)}>
            <div className="">
              <p className="text-center text-blue-600 text-3xl font-bold">Welcome back!</p>
              <p className="text-center text-gray-600 text-sm font-bold">Enter your credential</p>
            </div>
            {/* <div className="con w-[90vw] md:w-full p-4 md:mb-4 flex flex-col relative left-6 "> */}
            <Textbox
            name='email'
            type='email'
            placeholder='xyz@gmail.com'
            label='Email Address'
            className='w-[80vw] md:w-[36vw] rounded-full'
            register={register("email",{required:"email required"})}
            error={errors.email?errors.email.message:""} />
            <Textbox
            name='password'
            type='password'
            placeholder='password'
            label='Password'
            className='w-[80vw] rounded-full md:w-[36vw]'
            register={register("password",{required:"password required"})}
            error={errors.password?errors.password.message:""} />

            <ToggleUser setNewUser={setNewUser}  text="New here? SignUp" newState={true}/>

            <Button
            type='submit'
            label='Submit'
            className='bg-blue-600 w-1/5 text-white mb-4'
            />
            {/* </div> */}
            </form>
        </div>
        </>
    )
}

export default SignIn