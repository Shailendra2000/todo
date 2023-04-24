import { ITask } from "@/interfaces/task-interfaces/task.interface";
import { ITaskStatus } from "../../interfaces/task-interfaces/taskStatus.interface"

import { fetchTasks } from "@/services/fetchTasks";
import { useCallback, useState } from "react"

export const useUserTasks = () => {
  const [userTasks,setUserTasks] = useState<{[key: string]: [ITask[],number,number]}>({})
  const limit = 2
  const fetchUserTasks = useCallback(async(status:ITaskStatus,page:number=1) => {

    const searchParams = new URLSearchParams(window.location.search);
    
        const tasks=await fetchTasks({statusId:status.id,page:page,token:localStorage.getItem("todo_token") as string,userId:Number(searchParams.get('userId'))})
        const obj= userTasks
        if (status.status in obj){
            obj[status.status]=[obj[status.status][0].concat(tasks.tasks),obj[status.status][1]+1,tasks.total]
        }
        else{
            obj[status.status]=[tasks.tasks,1,tasks.total]
        }
        setUserTasks({...userTasks,...obj});
        console.log(userTasks)
  }, []);

  return { userTasks , setUserTasks , fetchUserTasks }
} 