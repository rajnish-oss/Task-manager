import React from 'react'
import { summary } from '../assets/data'
import moment from 'moment'
import UserInfo from './userInfo'
import { BGS } from '../utils'
import clsx from 'clsx'

const ListView = () => {
  const task = summary.last10Task

  const Tablerow = ({task,id}) =>{
   return ( <tr key={id} className='!mt-2 border-gray-500 border-t-1'>
      <td className='flex'>
        <span>{task.title}</span>
        </td>
      <td>
        <span>{task.priority}</span>
      </td>
      <td>
        <span>
          {moment(task.createdAt).format("DD MMMM YYYY")}
        </span>
      </td>
      <td className='flex'>
        {task.team.map((member,id)=>(
            <div className={clsx("flex rounded-full w-8 md:w-12 md:h-12",BGS[id%BGS.length])} key={id}><UserInfo NAME={member}/></div>
        ))}
      </td>
    </tr>)

  }

  return (
    <table className="">
        <thead>
          <tr >
            <th className='text-left'>Task Title</th>
          <th className='text-left'>Priority</th>
          <th className='text-left'>Created At</th>
          <th className='text-left'>Assets Team</th>
          </tr>
        </thead>
        <tbody>
            {task.map((task,id) => (
             <Tablerow key={id} task={task}/>
          ))}
          
        </tbody>
    </table>
  )
}

export default ListView
