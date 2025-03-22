import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { RiProgress3Line } from "react-icons/ri";
import moment from "moment";
import {summary} from "../assets/data"
import clsx from 'clsx'
import Chart from '../components/Chart'
import { BGS, TASK_TYPE,getInitials } from "../utils";
import UserInfo from "../components/userInfo";


const Dashboard = ({label,count,bg,icon}) =>{
   const totals = summary.tasks
   const user = summary.users

const stats = [
   {
      _id:'1',
      label:"TOTAL TASK",
      total:summary?.totalTasks || 0,
      icon:<FaNewspaper/>,
      bg:"bg-[#1d4ed8]"
   },
   {
      _id:'2',
      label:"COMPLETED TASK",
      total: totals["completed"] || 0,
      icon:<MdAdminPanelSettings/>,
      bg:"bg-[#0f766e]"
   },
   {
      _id:'3',
      label:"TASK IN PROGRESS",
      total:totals["in progress"] || 0,
      icon:<RiProgress3Line/>,
      bg:"bg-[#f59e0b]"
   },
   {
      _id:'1',
      label:"TO DO",
      total:totals["todo"] || 0,
      icon:<FaArrowsToDot/>,
      bg:"bg-[#be185d]" 
   }
]



const TaskTable = ({task}) => {

  const ICONS = {
      high:<MdKeyboardArrowUp />,
      medium:<MdKeyboardDoubleArrowUp/>,
      normal:<MdKeyboardArrowDown/>
  } 

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2 w-1/3'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({task}) => {
      return(<tr>
        <td className="flex items-center mx-2 w-90">
           <span className={clsx("flex h-2 w-2 rounded-full ",TASK_TYPE[task.stage])}></span>
            <span className="">{task.title}</span>
        </td>
        <td className="w-30">
         <div className="flex items-center">
         <span className={clsx("inline-flex h-5 w-5 rounded-full items-center justify-center text-white text-2xl",TASK_TYPE[task.stage])}>{ICONS[task.priority]}</span>
         <span className="w-12 relative right-[-8px]">{task.priority}</span>
          </div> 
        </td>
        <td>
          <div className="flex">
            {task.team.map((member,index)=>(
              <span className={clsx("w-8 h-8 2xl:w-12 2xl:h-12 items-center justify-center rounded-full",BGS[index%BGS.length])} key={index}><UserInfo NAME={member} /></span>
            ))}
          </div>
        </td>
        <td>
          <span className="hidden md:block">{moment(totals?.date).fromNow()}</span>
        </td>

      </tr>)
  }

  return(
    <div className="w-full">
      <table className="w-full">
        <TableHeader/>
      <tbody>
        {task.map((task,id)=>(
          <TableRow key={id} task={task}/>
        ))}
      </tbody>
      </table>
    </div>
  )
}



const Card = ({ label, count, bg, icon }) => {
   return (
     <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
       <div className='h-full flex flex-1 flex-col justify-between'>
         <p className='text-base text-gray-600'>{label}</p>
         <span className='text-2xl font-semibold'>{count}</span>
         <span className='text-sm text-gray-400'>{"110 last month"}</span>
       </div>

       <div
         className={clsx(
           "w-10 h-10 rounded-full flex items-center justify-center text-white",
           bg
         )}
       >
         {icon}
       </div>
     </div>
   );
 };

   return(
      <div className="h-full py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {stats.map(({icon,bg,label,total},index)=>(
               <Card
               
               key={index}
               icon={icon}
               bg={bg}
               label={label}
               count={total}
               />
            ))}
          </div>

          <div className="">
            <div className="">Chart by Priority</div>
            <Chart/>
          </div>

      <div className="w-full flex flex-col ">
        <TaskTable task={summary.last10Task}/>
        </div>
      </div>
   )
}

export default Dashboard 