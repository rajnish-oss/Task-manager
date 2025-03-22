import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

export default function Tabs({tabs,setSelected,children}){
    return(
        <div className="flex w-full !pt-4 px-4">
        <div className="w-full max-w-md">
        <TabGroup>
            <TabList className={"flex gap-4"}>
               {tabs.map((tabs,index)=>(
                <Tab
                key={index + tabs.title}
                onClick={()=>setSelected(index)}
                className={({selected})=>
                clsx(
                    "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
                    selected ? "text-blue-700  border-b-2 border-blue-600" : "text-gray-800  hover:text-blue-800"
                )
            }
                >
               {tabs.icon}
               <span>{tabs.title}</span>
                </Tab>
               ))}
            </TabList>
        
        </TabGroup>
        </div>
        </div>
    )
}