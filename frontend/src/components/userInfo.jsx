import React from 'react'
import {Menu,MenuButton,MenuItems,MenuItem, Transition} from '@headlessui/react'
import { Fragment,useState } from 'react'
import {FaUser,FaUserLock} from 'react-icons/fa'
import {IoLogOutOutline} from 'react-icons/io5'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getInitials,BGS} from '../utils/index'

const UserInfo = ({NAME}) => {
    const [open,setOpen] = useState(false);
    const [openPassword,setOpenPassword] = useState(false)
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const logoutHandler = () =>{
         console.log("logout")
    }
    
   
  return (
        <>
          <div>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <MenuButton className="w-8 h-8 2xl:w-12 2xl:h-12 items-center 2xl:items-start justify-center 2xl:justify-start rounded-full" >
                  <span className='text-white font-semibold 2xl:text-sm'>
                    {getInitials(NAME.name)}
                  </span>
                </MenuButton>
              </div>
    
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <MenuItems className='absolute z-10 right-0 mt-2 w-56 transiton origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
                  <div className='p-4 flex flex-col justify-center item-center'>
                    <MenuItem>
                      <span className='color-black font-bold flex justify-center'>{NAME.name}</span>
                    </MenuItem>
    
                    <MenuItem>
                    <span className='text-gray-600 flex justify-center'>{NAME.title}</span>
                    </MenuItem>
    
                    <MenuItem>
                    <span className='text-blue-400 flex justify-center'>{NAME.email}</span>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </>
      );
}

export default UserInfo
