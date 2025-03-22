import React from 'react'
import {Menu,MenuButton,MenuItems,MenuItem, Transition} from '@headlessui/react'
import { Fragment,useState } from 'react'
import {FaUser,FaUserLock} from 'react-icons/fa'
import {IoLogOutOutline} from 'react-icons/io5'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getInitials} from '../utils/index'
import {logout} from '../redux/slice/authSlice.js'

const UserAvatar = ({NAME}) => {
    const [open,setOpen] = useState(false);
    const [openPassword,setOpenPassword] = useState(false)
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate =useNavigate();



    const logoutHandler = () =>{
         dispatch(logout())
    }
    
   
  return (
        <>
          <div>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <MenuButton className='w-8 h-8 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
                  <span className='text-white font-semibold'>
                    
                    {getInitials(NAME)}
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
                <MenuItems className='absolute right-0 mt-2 w-56 transiton origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
                  <div className='p-4'>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setOpen(true)}
                          className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base  hover:bg-blue-600 hover:text-white'
                        >
                          <FaUser className='mr-2' aria-hidden='true' />
                          Profile
                        </button>
                      )}
                    </MenuItem>
    
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => setOpenPassword(true)}
                          className={`tetx-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base  hover:bg-blue-600 hover:text-white`}
                        >
                          <FaUserLock className='mr-2' aria-hidden='true' />
                          Change Password
                        </button>
                      )}
                    </MenuItem>
    
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logoutHandler}
                          className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base  hover:bg-red-600 hover:text-white`}
                        >
                          <IoLogOutOutline className='mr-2' aria-hidden='true' />
                          Logout
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </>
      );
}

export default UserAvatar
