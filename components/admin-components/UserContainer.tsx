'use client'
import { useQuery } from "@tanstack/react-query"
import UserList from "./UserList"
import { fetchUserList } from "../../services/fetchUserList"
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[result.data,result.isError]);
    return (
        <UserList users={userList} />
    )
}
export default AdminPageContainer