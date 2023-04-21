'use client'
import { useRouter } from "next/navigation"
interface IUserContainerProps {
    users:any,
}
const UserList = (props:IUserContainerProps) => {
    const router= useRouter()
    const redirectToTaskPage = (userId:number,userName:string) => {
        console.log(userId)
        router.push(`/tasks?userId=${userId}&name=${userName}`);
    }
    return (
        <div className="flex flex-col justify-center m-auto shadow-md gap-4  p-6 items-center mt-8 mx-2">
            <div key={'none'} className="flex justify-between g-20 w-full p-4 shadow-md"> 
                <h1>User Id</h1>
                <h1 >Name</h1>
                <h1>Email</h1>
                <h1>User Link</h1>
            </div>
       { 
       props.users.map( ( user:any ) => (
            <div key={user.id} className="flex justify-between gap-20 w-full p-4 shadow-md"> 
            <h1>{user.id}</h1>
            <h1 >{user.name}</h1>
            <h1>{user.email}</h1>
            <button onClick={()=>{redirectToTaskPage(user.id,user.name)}} className="px-6 rounded border-none bg-gray-500 py-2 text-white opacity-50 hover:opacity-100" id={user.id}>Tasks</button>
            </div>
        ))
        }
        </div>
    )
}
export default UserList