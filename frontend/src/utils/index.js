import moment from "moment";
import React from 'react'


export const getInitials = (username)=>{
   const name  = username.trim().split(" ")
   const a = name.slice(0,2).map((name)=>name[0].toUpperCase());
   const result = a.join("")
   return result
}

export const formatDate = (date)=>{
    const formatedDate = moment(date).format("DD-MM-YYYY")
    return formatedDate
}

export const TASK_TYPE ={
    todo:'bg-[#be185d]',
    "in progress":"bg-[#f59e0b]",
    completed:"bg-[#0f766e]"
}

export const PRIORITY_TYPE ={
    todo:'text-[#be185d]',
    "in progress":"text-[#f59e0b]",
    completed:"text-[#0f766e]"
}

export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
  ];
 