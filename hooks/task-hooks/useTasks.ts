import { UpdateTaskStatusMutation } from "@/mutations/task-mutations/UpdateMutation";
import { useMutation } from "@tanstack/react-query";

export const useTask=()=>{
    const updateTaskStatusMutation = useMutation(UpdateTaskStatusMutation)

    const updateTaskStatus = (obj:any) => {
        updateTaskStatusMutation.mutate(obj, {
            onSuccess: (data) => {
            },
            onError: (error) => {
                alert("Bad Request")
            },
        });
    }
    return { updateTaskStatus }
}