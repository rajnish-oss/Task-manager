import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { setOpenSidebar } from "../redux/slice/authSlice";
import { RxCross1 } from "react-icons/rx";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar =()=>{
   const {user} = useSelector((state)=>state.auth);

   const dispatch = useDispatch();
   const location = useLocation();
   const path = location.pathname.split("/")[1]
   const sidebarLinks = user?.isAdmin?linkData:linkData.slice(0,5);

   const closeSidebar = () =>{
    dispatch(setOpenSidebar(false));
   }

   const Navlink = ({e}) =>{
      return(
        <Link to={e.link} onClick={closeSidebar}  className={clsx("w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
        path=== e.link.split("/")[0]?"bg-blue-700 text-white":"")}>
           {e.icon}
           <span className='hover:text-[#2564ed]'>{e.label}</span>
        </Link>
      )
   }

   return(
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-blue-600 p-2 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-black'>TaskMe</span>
      </h1>

      <div className="absolute top-1 right-0 hover:bg-gray-300 rounded-full p-2">
        <RxCross1 onClick={()=>{closeSidebar()}} className="text-xl font-bold block md:hidden"/>
      </div>

      <div className="">
        {sidebarLinks.map((link)=>(
            <Navlink e={link} key={link.label}/>
        ))}
      </div>
     
      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>

    </div>
   )
}

export default Sidebar