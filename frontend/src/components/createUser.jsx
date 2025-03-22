import React, { useEffect } from 'react'
import Textbox from './Textbox'
import {registerUser} from '../redux/slice/authSlice.js'
import { useDispatch,useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {updateUser} from '../redux/slice/userSlice.js'

const Modal = ({isOpen,isClose,selectedUser}) => {
    const dispatch = useDispatch();
    const {data} = useSelector((state)=>state.auth)

    const { register, handleSubmit, watch,setValue, formState: { errors } } = useForm();

    useEffect(()=>{
        data
    },[data])


    // console.log(selectedUser)

    useEffect(() => {
        if (selectedUser) {
            setValue("name", selectedUser.name);
            setValue("title", selectedUser.title);
            setValue("email", selectedUser.email);
            setValue("role", selectedUser.role);
        }
    }, [selectedUser, setValue]);

    const submitHandler =(data)=>{
        if(selectedUser){
            dispatch(updateUser({...updateUser,id:selectedUser._id}))
        }else{
            dispatch(registerUser(data))
        }
    }

    return isOpen ? (
        <div className="h-screen w-full fixed z-50 justify-center items-center flex bg-[#0e0d0d82] inset-0">
            <div cassName='h-100 w-75 shadow-xl bg-white rounded-xl'>
           <div className="flex flex-col !mx-6 !my-4">
            <span className='font-semibold text-sm'>ADD NEW USER</span>
            <span className='!mt-2 w-20'>
                <span className='text-sm  text-gray-600'>Full name</span>
                <span>
                <Textbox name='name'
                type='name'
                placeholder='xyz@gmail.com'
                label='Name Address'
                register={register("name",{required:"name required"})}
                error={errors.name?errors.name.message:""} 
                className='w-60' /></span>
            </span>
            <span className='!mt-2'>
                <span className='text-sm  text-gray-600'>Title</span>
                <span>
                <Textbox
                 name='title'
                 type='title'
                 placeholder='xyz@gmail.com'
                 label='Title'
                 className='w-60'
                 register={register("title",{required:"title required"})}
                 error={errors.title?errors.title.message:""} /></span>
            </span>
            <span className='!mt-2'>
                <span className='text-sm  text-gray-600'>Email Address</span>
                <span>
                <Textbox 
                name='email'
                 type='email'
                 placeholder='xyz@gmail.com'
                label='Email Address'
                register={register("email",{required:"email required"})}
                error={errors.email?errors.email.message:""} 
                className='w-60'/></span>
            </span>
            <span className='!mt-2'>
                
                {!selectedUser && (
                    <div className="">
                        <span className='text-sm  text-gray-600'>Password</span>
                <span>
                <Textbox name='password'
                type='password'
                placeholder='password'
                label='password'
                className='w-60'
                register={register("password",{required:"password required"})}
                error={errors.password?errors.password.message:""} /></span>
                    </div>
                )}
            </span>
            <span className='!mt-2'>
                <span className='text-sm  text-gray-600'>Role</span>
                <span>
                <Textbox 
                name='role'
                type='role'
                placeholder='xyz@gmail.com'
                label='role'
                className='w-60'
                register={register("role",{required:"role required"})}
                error={errors.role?errors.role.message:""} /></span>
            </span>
            <div className="!mt-6 relative left-[6.2rem] ">
                <button className='!mx-4 text-red-600' onClick={isClose} >cancel</button>
                <button className='bg-blue-600 !px-2 text-white' onClick={handleSubmit(submitHandler) && isClose}>Submit</button>
            </div>
           </div>
        </div>
        </div>
    ):(null)
}

export default Modal