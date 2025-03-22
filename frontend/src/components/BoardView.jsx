import React from 'react'
import {
    MdAdminPanelSettings,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
    MdOutlineMessage,
    MdOutlineSubject
  } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GoPaperclip } from "react-icons/go";
import { PRIORITY_TYPE, TASK_TYPE,BGS } from '../utils';
import clsx from 'clsx';
import moment from 'moment';
import TaskDialog from './Task/TaskDialog';
import {useSelector} from 'react-redux'
import UserInfo from './userInfo'

const BoardView = ({tasks}) => {
  const ICONS = {
        high:<MdKeyboardArrowUp />,
        medium:<MdKeyboardDoubleArrowUp/>,
        normal:<MdKeyboardArrowDown/>
    } 

  const {user} = useSelector((state) => state.auth)

  return (
    <div className='w-full !p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
    {tasks.map((task,index)=>(
    <div key={index} className='shadow-2xl shadow-amber-500 !p-4' >
    <div className={clsx(" flex items-center",PRIORITY_TYPE[task.stage])}>
     <span>{ICONS[task.priority]}</span>
    <span>{task.priority}</span>   
    </div>
    <div className="">
        {user.isAdmin && <TaskDialog/>}
    </div>
    

    <div className="flex items-center">
    <span className={clsx("block h-4 w-4 rounded-full !m-1",TASK_TYPE[task.stage])}></span>
    <span className='line-clamp-1 text-black'>{task.title} </span>
    </div>

    <div className='block text-gray-500'>
    Created - {Math.floor(moment().diff(moment(task.date),'days'))} days ago 
    <p className='text-smf'>{moment(task.date).format('DD MMMM YYYY')}</p>
    </div>

    <div className="w-[96%] border-b-1 border-t-1 border-gray-300 !mx-2 flex justify-between">
    <div className="flex ">
       <span className='flex items-center !mx-2 text-gray-600 text-sm'><MdOutlineMessage/>{task.activities.length}</span>
       <span className='flex items-center !mx-2 text-gray-600 text-sm'><GoPaperclip/>{task.assets.length}</span>
       <span className='flex items-center !mx-2 text-gray-600 text-sm'><MdOutlineSubject/>{task.subTasks.length}</span>
       <span className='flex items-center'></span>
    </div>

    <div className="flex">
        {task.team.map((member,id)=>(<div key={id} className={clsx("w-8 h-8 2xl:w-8 2xl:h-8 items-center justify-center rounded-full",BGS[index%BGS.length])}>
        <UserInfo NAME={member}/>
    </div>))}</div>
    
    </div>

    {task.subTasks.length > 0 ? (
        <div>
            <span className='font-semibold !pt-2'>{task.subTasks[0].title}</span>
            
            <div className="!pt-2">
                <span className='text-gray-500 !mr-4'>{moment(task.subTasks[0].date).format("DD MMMM YYYY")}</span>
                <span className='bg-blue-200 text-blue-600 rounded-md !p-1'>{task.subTasks[0].tag}</span>
            </div>
        </div>
    ):(<div>
        No sub task
    </div>)}
    
    <div className="flex">
        <button
        disabled={user.isAdmin?false:true}
        className='flex items-center !mt-2 text-gray-500 disabled::text-gray-300'
        >
        <IoMdAdd className='!mr-2'/>
        <span className='text-sm font-semibold'>ADD SUBTASK</span>
        </button>
    </div>
    
    </div>
     ))}

    
    </div>
  )
}

export default BoardView
