import { ITaskStatus } from "../../interfaces/task-interfaces/taskStatus.interface";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../intercepters/defaultIntercepter";
import { IFetchedTasks, ITaskPositionData, ITaskRecord, ITaskStatusData, IUseUserTaskProps } from "@/interfaces/task-interfaces/userTask.interfaces";
import { useTaskOperations } from "./useTaskOperations";

interface IUserTask{
  [key: string]: ITaskRecord;
}

export const useUserTasks = (props: IUseUserTaskProps) => {

  const [userTasks, setUserTasks] = useState<IUserTask>({});
  const { updateTaskPosition,updateTaskStatusMutation } = useTaskOperations()
  const limit = 2;
  const getTaskUrl = "http://localhost:9000/task";
  
  useEffect(() => {
    setUserTasks({});
    props.statusList.forEach(async (status: ITaskStatus) => {
      await getTasks(status.id);
    });
  }, [props.statusList]);

  const updateTaskStatus = (obj: ITaskStatusData) => {
    const { from_status, to_status } = obj;
    balanceTaskCount(to_status,from_status)
    updateTaskStatusMutation.mutate(obj,
      {
        onSuccess: (data) => {
          if (!areAllTasksFetched(from_status)) {
            getTasks(
              from_status,
              userTasks[from_status].page * limit,
              1,
              0
            );
          }
          if (isPaginationDisturbed(to_status)) {
            userTasks[to_status].tasks.pop();
          }
        },
        onError: () => {
          balanceTaskCount(from_status,to_status)
        }
      }
      )
  };

  const areAllTasksFetched = (statusId: number) => {
    return userTasks[statusId].total <= userTasks[statusId].tasks.length;
  };
  const isPaginationDisturbed = (statusId: number) => {
    return userTasks[statusId].page*limit < userTasks[statusId].tasks.length;
  }
  const balanceTaskCount = ( status_toincrease:number, status_todecrease:number) => {
    userTasks[status_toincrease].total+=1
    userTasks[status_todecrease].total-=1
  }

  const addTasks = (tasks: IFetchedTasks) => {
    let obj_status: ITaskRecord = {
      tasks: tasks.tasks,
      page: 1,
      total: tasks.total,
    };
    return obj_status;
  };

  const appendTasks = (
    tasksClone: any,
    statusId: number,
    tasks: IFetchedTasks,
    page_increment_after_fetching: number
  ) => {
    tasksClone[statusId].tasks = tasksClone[statusId].tasks.concat(tasks.tasks);
    tasksClone[statusId].page += page_increment_after_fetching;
    tasksClone[statusId].total = tasks.total;
    return tasksClone;
  };

  const generateFetchTaskUrl = (
    baseUrl: string,
    statusId: number,
    page: number,
    limit: number,
    userId: string | null
  ) => {
    let url = `${baseUrl}?statusId=${statusId}&page=${page}&limit=${limit}`;
    if (userId) {
      url += `&userId=${userId}`;
    }
    return url;
  };

  const getTasks = async (
    statusId: number,
    page: number = 1,
    page_limit: number = limit,
    page_increment_after_fetching = 1
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get("userId");
    const url = generateFetchTaskUrl(
      getTaskUrl,
      statusId,
      page,
      page_limit,
      userId
    );
    const tasks: IFetchedTasks = await axiosInstance.get(url).then((res) => res.data);

    let userTasksClone = userTasks;
    if (statusId in userTasksClone) {
      userTasksClone = appendTasks(
        userTasksClone,
        statusId,
        tasks,
        page_increment_after_fetching
      );
    } else {
      userTasksClone[statusId] = addTasks(tasks);
    }
    setUserTasks({ ...userTasks, ...userTasksClone });
  };

  return {
    userTasks,
    setUserTasks,
    getTasks,
    updateTaskStatus,
    updateTaskPosition,
    areAllTasksFetched,
  };
};
