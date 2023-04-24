import { DeleteTaskStatusMutation } from "@/mutations/task-status-mutations/removeStatus"
import { UpdateTaskStatusPriorityMutation } from "@/mutations/task-status-mutations/updatePriority"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFetchTask } from "./useFetchStatusList"

export const useTaskStatusList = () => {
    const statusList = useFetchTask()
    const updateTaskStatusMutation = useMutation(UpdateTaskStatusPriorityMutation) 
    const router = useRouter()
    const deleteStatusMutation = useMutation(DeleteTaskStatusMutation)
    const updateTaskPriority = (statusId:number,priority:number) => {
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

    return {statusList,updateTaskPriority,deleteStatus}
}