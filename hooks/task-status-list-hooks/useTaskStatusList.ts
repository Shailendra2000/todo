import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import axiosInstance from "../../intercepters/defaultIntercepter";
import { ITaskStatusPositionRequest } from "@/interfaces/task-status-interfaces/task-status.interfaces";
export const useTaskStatusList = () => {
  const router = useRouter();
  const { isError, data } = useQuery(
    ["statusList"],
    async () =>
      (await axiosInstance.get("http://localhost:9000/task-status")).data
  );

  const [statusList, setStatusList] = useState<ITaskStatus[]>([]);

  useEffect(() => {
    if (isError) {
      router.push("/tasks");
      router.refresh();
    }
    if (data) {
      setStatusList([...data]);
    }
  }, [data, isError]);

  const updateTaskStatusMutation = useMutation(
    (param: ITaskStatusPositionRequest) =>
      axiosInstance
        .put("http://localhost:9000/task-status", param)
        .then((res) => res.data)
  );

  const deleteStatusMution = useMutation(
    (param: { statusId: number }) =>
      axiosInstance
        .delete(`http://localhost:9000/task-status?statusId=${param.statusId}`)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        alert("status deleted!");
        router.refresh();
      },
      onError: (error) => {
        alert("Bad Request");
      },
    }
  );

  const updateTaskStatusPriority = (statusId: number, priority: number) => {
    const obj: ITaskStatusPositionRequest = {
      statusId: statusId,
      priority: priority,
    };
    updateTaskStatusMutation.mutate(obj);
  };

  function deleteStatus(statusId: number) {
    let obj = { statusId: statusId };
    deleteStatusMution.mutate(obj);
  }

  return { statusList, updateTaskStatusPriority, deleteStatus };
};
