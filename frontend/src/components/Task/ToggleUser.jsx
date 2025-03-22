import React,{useState} from 'react'

const ToggleUser = ({setNewUser,text,newState}) =>{
    return(
    <div className='text-sm text-gray-500 relative left-[-7rem] md:left-[-11rem] cursor-pointer' onClick={()=>{setNewUser(newState) }}>
         {text}
    </div>
    )
}

export default ToggleUser