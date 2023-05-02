import axiosInstance from "@/intercepters/defaultIntercepter";
import { ITaskPositionData, ITaskStatusData } from "@/interfaces/task-interfaces/userTask.interfaces";
import { useMutation } from "@tanstack/react-query";

export const useTaskOperations = () => {


    const updateTaskStatusMutation = useMutation(
        (params: ITaskStatusData) =>
          axiosInstance
            .put("http://localhost:9000/task", {'id':params.taskId,'statusId':params.to_status})
            .then((res) => res.data),
        {
          onError: (error) => {
            console.log(`error in status updating`);
          },
        }
      );

    const updateTaskPositionMutation = useMutation(
        (params: ITaskPositionData) =>
          axiosInstance.put("http://localhost:9000/task", {'id':params.taskId,'position':params.position}).then((res) => res.data),
        {
          onError: (error) => {
            console.log(`position not updated`);
          },
        }
      );
    
      const updateTaskPosition = (taskId: number, position: number) => {
        const obj: ITaskPositionData = {
          taskId: taskId,
          position: position + 1,
        };
        updateTaskPositionMutation.mutate(obj);
      };


      return {updateTaskPosition,updateTaskStatusMutation}
}