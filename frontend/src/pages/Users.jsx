import React, { useEffect, useState } from 'react'
import {fetchUser,updateUser} from '../redux/slice/userSlice.js'
import { useDispatch,useSelector } from 'react-redux'
import Modal from '../components/createUser'

const Users = () =>{
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.users);
//   const updateduser = useSelector((state)=>state.user.user)
//   console.log(user)
  const [isOpen,setIsOpen] = useState(false)
  const [selectUser,setSelectUser] = useState(null)

  useEffect(() => {
   dispatch(fetchUser())
  },[dispatch])

  const active = (isActive) =>{
   return isActive ?
    (<div className='bg-green-300 h-5 w-13 rounded-2xl text-center text-sm text-green-900 font-bold'>Active</div>) :
    (<div className='bg-red-300 h-5 w-13 rounded-2xl text-center text-sm text-red-900 font-bold'>In Active</div>)
  }

  const handleEdit = (user) => {
   console.log(selectUser)
    setSelectUser({
      _id : user._id,
    username : user.name,
    usertitle : user.name,
    useremail : user.email,
    userrole : user.role})
     setIsOpen(true)
     console.log(setSelectUser(user))
     
  }
  
  useEffect(()=>{
   console.log("user after update",selectUser)
  },[selectUser])

   return(
      <div className='bg-gray-200 h-screen'>
       <div className="flex justify-between !px-4 !my-4">
         <div className="text-gray-700 text-xl">Team Member</div>
         <div className="">
            <button className='bg-blue-300 text-blue-700' onClick={()=>setIsOpen(true)}>
               Create User
            </button>
         
         </div>
       </div>

       <Modal isOpen={isOpen} isClose={()=>setIsOpen(false)} selectedUser={selectUser}>
         
       </Modal>
       
       <table className='bg-white w-full'>
         <thead>
            <tr >
               <th className='flex justify-start'>Full Name</th>
               <th className='text-start'>Title</th>
               <th className='text-left'>Email</th>
               <th className='text-left'>Role</th>
               <th className='text-left'>Active</th>
               <th> </th>
            </tr>
         </thead>
         <tbody>
            {user.map((user)=>(
               <tr className='border-y-2 border-gray-300' key={user._id}>
               <td>{user.name}</td>
               <td>{user.title} </td>
               <td>{user.email}</td>
               <td>{user.role}</td>
               <td>{active(user.isActive)}</td>
               <td>
                  <span><button onClick={()=>handleEdit(user)}>Edit</button></span>
               </td>
            </tr>
            ))}
         </tbody>
       </table>
      </div>
   )
}

export default Users 