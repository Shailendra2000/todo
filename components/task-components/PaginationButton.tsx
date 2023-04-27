"use client";

import { ITaskRecord } from "@/interfaces/task-interfaces/userTask.interfaces";



export interface IPaginationBtnProps{
    id:number,
    userTasks : {[key: string]: ITaskRecord}
    fetchUserTasks : Function
}
const PaginationButton = (props:IPaginationBtnProps) => {

  return (
    <button
      onClick={() => {
        props.fetchUserTasks(props.id, props.userTasks[props.id].page + 1);
      }}
      className="px-3 rounded border-none bg-gray-400 disabled:bg-gray-300 py-2 text-white hover:opacity-50"
    >
      Show more
    </button>
  );
};
export default PaginationButton;
