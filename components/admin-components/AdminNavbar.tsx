'use client'

import { useRouter } from "next/navigation"

function AdminNavbar ( ) {
    const router = useRouter()
    return (
    <ul key="adminNavbar" className='flex flex-col mt-10 p-4 shadow-md col-span-1'>
        <li key="adminUsers" onClick={()=>{router.push('/users')}} className='text-gray-500 shadow-sm hover:text-blue-500 cursor-pointer p-5 text-lg'>Users</li>
        <li key="adminStatus" onClick={()=>{router.push('/task_status')}} className='text-gray-500 shadow-sm hover:text-blue-500 cursor-pointer p-5 text-lg'>Status List</li>     
    </ul>
    )
}
export default AdminNavbar