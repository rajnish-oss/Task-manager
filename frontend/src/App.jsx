import { useState } from 'react'
import {Routes,Route,Navigate,Outlet,useLocation} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Task from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Trash from './pages/Trash'
import Users from './pages/Users'
import Login from './pages/Login'
import { Toaster } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { setOpenSidebar } from './redux/slice/authSlice'


function Layout(){
  const {user} = useSelector((state)=>state.auth)
  const isSidebarOpen = useSelector((state)=>state.auth.isSidebarOpen)

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className={`w-1/4 md:w-[20vw] h-screen bg-white sticky top-0 border shadow-blue-600 md:block ${isSidebarOpen?'block':'hidden'}`} >
        <Sidebar />
      </div>

      {/* <MobileSidebar /> */}

      <div className='flex-1 overflow-y-auto '>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{from:location}} replace/>
    
  )
}

function App() {

  return (
    <>
    <Routes>
      <Route element={<Layout/>}> 
      <Route path='/' element={<Navigate to='/dashboard'/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/Tasks' element={<Task/>} />
      <Route path='/Compeleted/:status' element={<Task/>} />
      <Route path='/in-progress/:status' element={<Task/>} />
      <Route path='/todo/:status' element={<Task/>} />
      <Route path='/team' element={<Users/>} />
      <Route path='/Trash' element={<Trash/>} />
      <Route path='/task/:id' element={<TaskDetails/>} />
      </Route>
      <Route path='/log-in' element={<Login/>} />
    </Routes>
    <Toaster richColors></Toaster>
    </>
  )
}

export default App
