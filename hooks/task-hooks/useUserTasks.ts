import { ITaskStatus } from "../../interfaces/task-interfaces/taskStatus.interface";
import { useEffect } from "react";
import {
  IFetchedTasks,
  ITaskRecord,
  ITaskStatusData,
  IUseUserTaskProps,
} from "@/interfaces/task-interfaces/userTask.interfaces";
import { useTaskOperations } from "./useTaskOperations";
import { useSelector,useDispatch } from "react-redux";
import { setAllTasks, setTasksByStatus, updateTasksByStatus } from "@/redux/task/tasksSlice";
import { useGetTasksMutation } from "@/redux/todoApi";

export interface IUserTask {
  [key: string]: ITaskRecord;
}

export const useUserTasks = (props: IUseUserTaskProps) => {
  const userTasks : IUserTask = useSelector((state:any) => state.tasks.value);
  const dispatch = useDispatch()
  const [ getUserTasks ] = useGetTasksMutation()
  const { updateTaskPosition, updateTaskStatusMutation } = useTaskOperations();
  const limit = 2;
  const getTaskUrl = "http://localhost:9000/task";

  useEffect(() => {
    dispatch(setAllTasks({}));
    props.statusList.forEach(async (status: ITaskStatus) => {
      await getTasks(status.id);
    });
  }, [props.statusList]);

  const updateTaskStatus = (obj: ITaskStatusData) => {
    let { from_status, to_status , tasks } = obj;
    tasks = balanceTaskCount(tasks,to_status, from_status);
    dispatch(setAllTasks(tasks))
    updateTaskStatusMutation.mutate(obj, {
      onSuccess: (data) => {
        if (!areAllTasksFetched(tasks,from_status)) {
          getTasks(from_status, tasks[from_status].page * limit, 1, 0,tasks);
        }
        if (isPaginationDisturbed(tasks,to_status)) {
          let tasksToDispatch = JSON.parse(JSON.stringify(tasks))
          tasksToDispatch[to_status].tasks.pop();
          dispatch(setAllTasks(tasksToDispatch))
        }
      },
      onError: () => {
        balanceTaskCount(tasks,from_status,to_status);
      },
    });
  };

  const areAllTasksFetched = (userTasks:IUserTask,statusId: number) => {
    return userTasks[statusId].total <= userTasks[statusId].tasks.length;
  };
  const isPaginationDisturbed = (userTasks:IUserTask,statusId: number) => {
    return userTasks[statusId].page * limit < userTasks[statusId].tasks.length;
  };
  const balanceTaskCount = (
    userTasks:IUserTask,
    addedToStatusId: number,
    removedFromStatusId: number
  ) => {
    userTasks[addedToStatusId].total += 1;
    userTasks[removedFromStatusId].total -= 1;
    return userTasks
  };

  const addTasks = (tasks: IFetchedTasks) => {
    let obj: ITaskRecord = {
      tasks: tasks.tasks,
      page: 1,
      total: tasks.total,
    };
    return obj;
  };

  const appendTasks = (
    tasksClone: any,
    statusId: number,
    tasks: IFetchedTasks,
    page_increment_after_fetching: number
  ) => {
    let obj: ITaskRecord = {
      tasks: tasksClone[statusId].tasks.concat(tasks.tasks),
      page: tasksClone[statusId].page+page_increment_after_fetching,
      total: tasks.total,
    };
    return obj;
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
    page_increment_after_fetching = 1,
    userTasksRef : IUserTask = userTasks
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
    const data = await getUserTasks(url) as any
    const tasks = data.data
    if (statusId in userTasks) {
      let taskObj = appendTasks(userTasksRef,statusId,tasks,page_increment_after_fetching)
      dispatch(updateTasksByStatus({'status':statusId,'tasks':taskObj}))
    } else {
      let taskObj = addTasks(tasks);
      dispatch(setTasksByStatus({'status':statusId,'tasks':taskObj}))
    }
  };

  return {
    userTasks,

    getTasks,
    updateTaskStatus,
    updateTaskPosition,
    areAllTasksFetched,
  };
};
