import React from 'react'
import moment from 'moment'
import { Fragment,useState } from 'react'
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { MenuButton,Menu,MenuItem,MenuItems,Transition } from '@headlessui/react';

const data = [
    {
      _id: "65c5bbf3787832cf99f28e6d",
      team: [
        "65c202d4aa62f32ffd1303cc",
        "65c27a0e18c0a1b750ad5cad",
        "65c30b96e639681a13def0b5",
      ],
      text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
      task: null,
      notiType: "alert",
      isRead: [],
      createdAt: "2024-02-09T05:45:23.353Z",
      updatedAt: "2024-02-09T05:45:23.353Z",
      __v: 0,
    },
    {
      _id: "65c5f12ab5204a81bde866ab",
      team: [
        "65c202d4aa62f32ffd1303cc",
        "65c30b96e639681a13def0b5",
        "65c317360fd860f958baa08e",
      ],
      text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
      task: {
        _id: "65c5f12ab5204a81bde866a9",
        title: "Test task",
      },
      notiType: "alert",
      isRead: [],
      createdAt: "2024-02-09T09:32:26.810Z",
      updatedAt: "2024-02-09T09:32:26.810Z",
      __v: 0,
    },
  ];

const ICONS = {
    alert:(
        <HiBellAlert className='h-5 w-5 text-gray-500 group-hover:text-indigo-600' />
    ),
    message:(
        <BiSolidMessageRounded className='h-5 w-5 text-gray-500 group-hover:text-indigo-600'  />
    )
}

const NotificationPanel = () => {
    const[open,setOpen] = useState(false)
    const[selected,setSelected] = useState(null)

    const readHandler = () => {

    }

    const callsToAction = [
        {name:'Cancel',href:"#",icon:""},
        {name:"Mark All Read",
        href:"#",
        icon:"",
        onclick: ()=> readHandler("all",""),}
    ]

  return (
    <div>
      <Menu as='div' className='relative' >
        <MenuButton className='inline-flex items-center outline-none'>
            <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
                <IoIosNotificationsOutline className="text-2xl" />
               {data?.length > 0 &&(
                <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                    {data?.length}
                </span>
               )}
            </div>

        </MenuButton>

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
  )
}

export default NotificationPanel
