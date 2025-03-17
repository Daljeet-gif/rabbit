import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className='min-h-screen flex flex-col md:flex-row relative '>
            <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
                <button onClick={toggleSidebar} className=''>
                    <FaBars size={24} ></FaBars>

                </button>
                <h1 className='ml-4 text-xl font-medium '>Admin Dashboard</h1>
            </div>

            {isSidebarOpen && (
                <div className='fixed inset-0 z-10 bg-black bg-opacity md:hidden' onClick={toggleSidebar}></div>
            )}

            <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 z-20 md:block md:static`}>
                <AdminSidebar></AdminSidebar>
            </div>

            <div className='flex-grow p-6 overflow-auto'>
                <Outlet></Outlet>
            </div>

        </div>
    )
}

export default AdminLayout