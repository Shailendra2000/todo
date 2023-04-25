import { DeleteTaskStatusMutation } from "@/mutations/task-status-mutations/removeStatus"
import { UpdateTaskStatusPriorityMutation } from "@/mutations/task-status-mutations/updatePriority"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface"
import { fetchStatusList } from "@/services/fetchStatusList"

export const useTaskStatusList = () => {
    const updateTaskStatusMutation = useMutation(UpdateTaskStatusPriorityMutation) 
    const router = useRouter()
    const deleteStatusMutation = useMutation(DeleteTaskStatusMutation)
    const result = useQuery(["statusList",localStorage.getItem("todo_token")],fetchStatusList)
    const [statusList,setStatusList]=useState<ITaskStatus[]>([])
  
    useEffect(() => {
        if (result.isError) {
          router.push('/tasks')
          router.refresh()
        }
        if (result.data) {
          setStatusList(result.data);
        }
    },[result.data,result.isError]);

    const updateTaskStatusPriority = (statusId:number,priority:number) => {
        const obj = {
            "statusId": statusId,
            "priority": priority
          };
          
          updateTaskStatusMutation.mutate(obj, {
            onSuccess: (data) => {
                router.refresh()
            },
        });
    }
    function deleteStatus (statusId : number) {
        let obj = { "statusId" : statusId }
        deleteStatusMutation.mutate(obj, {
            onSuccess: (data) => {
              alert('status deleted!')
              router.refresh()
            },
            onError: (error) => {
                alert("Bad Request")
            },
        });
    }

    return {statusList,updateTaskStatusPriority,deleteStatus}
}