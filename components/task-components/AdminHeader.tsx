'use client'

import { useRouter } from "next/navigation"
interface IAdminTaskPageHeaderProps{
    name:string|null
}
function AdminTaskPageHeader(props:IAdminTaskPageHeaderProps){
    let isAdmin =(localStorage.getItem("isAdmin")==='true')
    const router = useRouter()
    return (
        <>
        {
            isAdmin && <div className="p-5 w-full flex justify-center gap-4">
            <h1>{props.name} task view</h1>
            <button onClick={()=>{router.push('/users')}} className="text-red-300 hover:text-red-500">Close View</button>
            </div>
        }
        </>
    )
}
export default AdminTaskPageHeader