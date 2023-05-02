"use client";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { IStatusContainerProps } from "@/interfaces/task-interfaces/tastContainerProps.interface";
import { useSelector } from "react-redux";

const TaskContainer = (props: IStatusContainerProps) => {
  const tasks = useSelector((state:any) => state.tasks.value);
  const tokenKey = "isAdmin";
  return (
    <Droppable
      isDropDisabled={localStorage.getItem(`${tokenKey}`) === "true"}
      droppableId={props.id.toString()}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-slate-100 flex py-3 px-4 gap-3 flex-col items-center font-sans"
        >
          <h2 className="text-gray-500 text-lg">
            {props.status.toUpperCase()}
          </h2>
          {tasks[props.id]
            ? tasks[props.id].tasks.map((task: any, index: number) => {
                return <TaskItem
                  key={task.id}
                  id={task.id}
                  index={index}
                  title={task.title}
                />
            })
            : null}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default TaskContainer;
