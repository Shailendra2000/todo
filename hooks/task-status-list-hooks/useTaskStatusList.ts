import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ITaskStatusPositionRequest } from "@/interfaces/task-status-interfaces/task-status.interfaces";
import { useSelector,useDispatch } from "react-redux";
import {  setStatusList } from "@/redux/admin/statusList/statusListSlice";
import {   useDeleteStatusMutation, useGetStatusListQuery, useUpdateStatusPriorityMutation } from "@/redux/todoApi";
export const useTaskStatusList = () => {
  
  const router = useRouter();
  const { isError, data } = useGetStatusListQuery("okay");
  const [ updateStatusPriority ] = useUpdateStatusPriorityMutation()
  const [ deletStatus ] = useDeleteStatusMutation()
  const statusList = useSelector((state:any) => state.statusList.value);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      router.push("/tasks");
      router.refresh();
    }
    if (data) {
      dispatch(setStatusList([...data as any]));
    }
  }, [data, isError]);

  const updateTaskStatusPriority = (statusId: number, priority: number) => {
    const obj: ITaskStatusPositionRequest = {
      statusId: statusId,
      priority: priority,
    };
    updateStatusPriority(obj)
  };

  function deleteStatus(statusId: number) {
    deletStatus(statusId)
  }

  return { statusList, updateTaskStatusPriority, deleteStatus };
};
