import { ITaskRecord } from "./userTask.interfaces"

export interface ITask{
    id:number,
    title:string,
    desc:number,
    status:string
}

export interface ITaskOperationsProps {
    userTasks : {[key: string]: ITaskRecord},
    fetchUserTasks : Function
}
