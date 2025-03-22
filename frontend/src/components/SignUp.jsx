import React, { useEffect,useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { toast } from 'sonner';
import { useLoginMutation } from '../redux/slice/api/authApiSlice.js';
import ToggleUser from './Task/ToggleUser';
import { useDispatch,useSelector } from 'react-redux';
import { registerUser } from '../redux/slice/authSlice.js';

const SignUp = ({setNewUser}) => {
    const dispatch = useDispatch();
    const {status,error} = useSelector((state) => state.auth)

    const [formatData,setFormatData] = useState({
      name:"",
      email:"",
      password:""
    })


    const {user} = useSelector((state)=>state.auth.user) || {}
           
           const { register, handleSubmit, watch, formState: { errors } } = useForm();
           const onSubmit = data => console.log(data);
           
           const navigate = useNavigate();
           const [login,{isLoading}] = useLoginMutation()
       
           const userExist = () =>{
            setNewUser(true)
           }
           
       
           useEffect(()=>{
               user && navigate("/dashboard")
           },[user])
       
           function submitHandler(data){
             dispatch(registerUser(data))
           }

   return(
    <>
    <div className='con w-[90vw] md:w-[40vw] p-4 md:p-1 flex flex-col justify-center items-center shadow-xl bg-red-500 relative top-5'>
                <form action="" className='form-container justify-center items-center w-full md:w-[40vw] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14' onSubmit={handleSubmit(submitHandler)}>
                <div className="">
                  <p className="text-center text-blue-600 text-3xl font-bold">Hi, Welcome To Task Manager</p>
                  <p className="text-center text-gray-600 text-sm font-bold">Enter your credential</p>
                </div>
                {/* <div className="con w-[90vw] md:w-full p-4 md:mb-4 flex flex-col relative left-6 "> */}
                <Textbox
                name='title'
                type='title'
                placeholder='Enter your title'
                label='Name'
                className='w-[80vw] md:w-[36vw] rounded-full'
                register={register("title",{required:"title required"})}
                error={errors.title?errors.title.message:""} />
                <Textbox
                name='name'
                type='name'
                placeholder='Enter your full name'
                label='Name'
                className='w-[80vw] md:w-[36vw] rounded-full'
                register={register("name",{required:"name required"})}
                error={errors.name?errors.name.message:""} />
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
                <Textbox
                name='role'
                type='role'
                placeholder='Enter your full role'
                label='Role'
                className='w-[80vw] md:w-[36vw] rounded-full'
                register={register("role",{required:"role required"})}
                error={errors.role?errors.role.message:""} />
    
                <ToggleUser setNewUser={setNewUser} text="Already have an account? SignIn" newState={false}/>
    
                <button type="submit" className="outline-none rounded bg-blue-600 w-1/5 text-white mb-4" disabled={status === "loading"}>
                  <span>Submit </span>               
                </button>
                {/* </div> */}
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            </>
   )
}

export default SignUp