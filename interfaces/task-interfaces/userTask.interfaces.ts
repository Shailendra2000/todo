import { ITask } from "./task.interface";
import { ITaskStatus } from "./taskStatus.interface";

export interface IUseUserTaskProps {
    statusList: ITaskStatus[];
  }
  
  export interface ITaskRecord {
    tasks: ITask[];
    page: number;
    total: number;
  }
  
  export interface IFetchedTasks {
    tasks: ITask[];
    total: number;
  }
  
  export interface ITaskPositionData {
    taskId: number;
    position: number;
  }
  export interface ITaskStatusData {
    taskId: number;
    to_status: number;
    from_status: number;
  }