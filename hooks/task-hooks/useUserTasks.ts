import { ITask } from "@/interfaces/task-interfaces/task.interface";
import { ITaskStatus } from "../../interfaces/task-interfaces/taskStatus.interface"

import { fetchTasks } from "@/services/fetchTasks";
import { useEffect, useState } from "react"
import { UpdateTaskPositionMutation, UpdateTaskStatusMutation } from "@/mutations/task-mutations/UpdateMutation";
import { useMutation } from "@tanstack/react-query";

export interface IUseUserTaskProps{
  statusList:ITaskStatus[]
}

export const useUserTasks = (props:IUseUserTaskProps) => {
  const [userTasks,setUserTasks] = useState<{[key: string]: [ITask[],number,number]}>({})
  const limit = 2
  const updateTaskStatusMutation = useMutation(UpdateTaskStatusMutation)
  const updateTaskPositionMutation = useMutation(UpdateTaskPositionMutation)

  
  useEffect(()=>{
    setUserTasks({})
    props.statusList.forEach(async(status:ITaskStatus) => {
        await fetchUserTasks(status.id)
    })
  },[props.statusList])
  
  const updateTaskStatus = (obj:any) => {
      updateTaskStatusMutation.mutate(obj, {
          onSuccess: (data) => {
            if ( userTasks[obj.status_from][2] > userTasks[obj.status_from][1]*2 ) {
              fetchUserTasks(obj.status_from,userTasks[obj.status_from][1]*limit,1,0)
            }
            if ( userTasks[obj.status][2] > userTasks[obj.status][1]*2 ) {
              userTasks[obj.status][0].pop()
              console.log("ok")
            }
          },
          onError: (error) => {
              alert("Bad Request")
          },
      });
  }

  const updateTaskPosition = (taskId:number,position:number) => {
    const obj = {
        "taskId": taskId,
        "position": position
      };
      
      updateTaskPositionMutation.mutate(obj, {
        onSuccess: (data) => {
        },
    });
  }
  
  const fetchUserTasks = async(status:number,page:number=1,page_limit:number=limit,page_increment=1) => {
    const searchParams = new URLSearchParams(window.location.search);
        const tasks=await fetchTasks({statusId:status, page:page, limit:page_limit, token:localStorage.getItem("todo_token") as string, userId:Number(searchParams.get('userId'))})
        const obj= userTasks
        if (status in obj){
            obj[status]=[obj[status][0].concat(tasks.tasks),obj[status][1]+page_increment,tasks.total]
        }
        else{
            obj[status]=[tasks.tasks,1,tasks.total]
        }
        setUserTasks({...userTasks,...obj});
  }

  return { userTasks , setUserTasks , fetchUserTasks , updateTaskStatus ,updateTaskPosition }  
} 