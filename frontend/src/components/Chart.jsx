import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { chartData } from '../assets/data'; 

const Chart = () => {

  return (
    <ResponsiveContainer width={"100%"} height={500} >
        <BarChart height={40} width={150} data={chartData}>
        <XAxis dataKey="name" stroke='#8884d8'/>
        <YAxis/>
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Bar dataKey="total" fill="#8884d8" barSize={30} />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart

