import React,{useState} from 'react'
import {Routes,Route, useParams} from'react-router-dom'
import { MdGridView } from "react-icons/md";
import { RiListView } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { TASK_TYPE } from '../utils';
import Loading from '../components/Loading';
import { Button } from '@headlessui/react';
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import { summary } from '../assets/data';
import BoardView from '../components/BoardView';
import ListView from '../components/ListView';


const Tasks = () =>{
   const TABS =[
      {
         title:"board view",
         icon:<MdGridView />
      },
      {
         title:"list view",
         icon: <RiListView/>
      }
   ]
   
   const total = summary.last10Task
   const params = useParams()
   const [selected,setSelected] = useState(0);
   const [open,setOpen] = useState(false)
   const [loading,setLoading] = useState(false)

   const status = params.status

   return loading ? (
      <>
      <div className="w-full flex justify-center">
         <Loading/>
      </div>
      </>
   ) : (
      <div className='mt-4 h-screen'>
      <div className="!mt-4 flex flex-col justify-center">
         <div className="w-[98%] flex items-center justify-between">
            
            {status ? `${status}Tasks`:'Tasks'}

            {!status && (
               <Button className="bg-blue-600 w-32 text-white rounded-md p-4 flex items-center justify-center">
               <FiPlusSquare className='!mr-2'/>Create Task
            </Button>
            )}
            
         </div>

         <div className="">
            <Tabs tabs={TABS} setSelected={setSelected} />
         </div>

        {!status && ( <div className="flex w-full justify-between">
            <TaskTitle label="To Do" index='todo' />
            <TaskTitle label="In Progress" index='in progress' />
            <TaskTitle label="Completed" index='completed' />
         </div>)}

         {!selected ? 
         <div className="h-screen grid grid-cols-1 !p-4">
            <BoardView tasks={total}/>
         </div> 
          : <ListView/>}
      </div>
      </div>
   )
}

export default Tasks 