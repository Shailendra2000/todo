import axiosInstance from "@/intercepters/defaultIntercepter";
import { ITaskOperationsProps } from "@/interfaces/task-interfaces/task.interface";
import { ITaskPositionData, ITaskRecord, ITaskStatusData } from "@/interfaces/task-interfaces/userTask.interfaces";
import { useMutation } from "@tanstack/react-query";

export const useTaskOperations = () => {


    const updateTaskStatusMutation = useMutation(
        (params: ITaskStatusData) =>
          axiosInstance
            .patch("http://localhost:9000/task", params)
            .then((res) => res.data),
        {
          onError: (error) => {
            console.log(`error in status updating`);
          },
        }
      );

    const updateTaskPositionMutation = useMutation(
        (params: ITaskPositionData) =>
          axiosInstance.patch("http://localhost:9000/task", params).then((res) => res.data),
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