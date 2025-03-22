import React from 'react'
import { FiPlusSquare } from "react-icons/fi";
import { TASK_TYPE } from '../utils';
import clsx from 'clsx';

const TaskTitle = ({label,index}) => {
    console.log(TASK_TYPE[index])
  return (
    <div className='flex w-35 items-center justify-between bg-gray-200 rounded-md !mt-4'>
      <div className="flex items-center">
        <span className={clsx("block h-4 w-4 rounded-full !mrd-1",TASK_TYPE[index])}></span>
        <span>{label}</span>
      </div>
      <div className="">
        <FiPlusSquare/>
      </div>
    </div>
  )
}

export default TaskTitle
