'use client'
import { useQuery } from "@tanstack/react-query"
import UserList from "./UserList"
import { fetchUserList } from "../../../services/fetchUserList"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
const AdminPageContainer = () => {
    const result = useQuery(["tasks",localStorage.getItem("todo_token")],fetchUserList)
    const router = useRouter()
    const [userList,setUserList] = useState([]) 
    useEffect(() => {
        if (result.isError) {
          router.push('/tasks')
        }
        if (result.data) {
          setUserList(result.data.users);
        }
      },[result.data,result.isError]);
    return (
        <div className="flex flex-col items-center gap-4">
          <UserList users={userList} />
        </div>
    )
}
export default AdminPageContainer