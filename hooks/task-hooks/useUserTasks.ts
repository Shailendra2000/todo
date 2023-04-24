import { ITask } from "@/interfaces/task-interfaces/task.interface";
import { ITaskStatus } from "../../interfaces/task-interfaces/taskStatus.interface"

import { fetchTasks } from "@/services/fetchTasks";
import { useEffect, useState } from "react"
import { UpdateTaskStatusMutation } from "@/mutations/task-mutations/UpdateMutation";
import { useMutation } from "@tanstack/react-query";

export interface IUseUserTaskProps{
  statusList:ITaskStatus[]
}


export const useUserTasks = (props:IUseUserTaskProps) => {
  const [userTasks,setUserTasks] = useState<{[key: string]: [ITask[],number,number]}>({})
  const limit = 2
  const updateTaskStatusMutation = useMutation(UpdateTaskStatusMutation)
  
  useEffect(()=>{
    setUserTasks({})
    props.statusList.forEach(async(status:ITaskStatus) => {
        await fetchUserTasks(status)
    })
  },[props.statusList])
  
  const updateTaskStatus = (obj:any) => {
      updateTaskStatusMutation.mutate(obj, {
          onSuccess: (data) => {
          },
          onError: (error) => {
              alert("Bad Request")
          },
      });
  }
  
  const fetchUserTasks = async(status:ITaskStatus,page:number=1) => {
    const searchParams = new URLSearchParams(window.location.search);
        const tasks=await fetchTasks({statusId:status.id, page:page, limit:limit, token:localStorage.getItem("todo_token") as string, userId:Number(searchParams.get('userId'))})
        const obj= userTasks
        if (status.status in obj){
            obj[status.status]=[obj[status.status][0].concat(tasks.tasks),obj[status.status][1]+1,tasks.total]
        }
        else{
            obj[status.status]=[tasks.tasks,1,tasks.total]
        }
        setUserTasks({...userTasks,...obj});
  }

  return { userTasks , setUserTasks , fetchUserTasks , updateTaskStatus }
} 