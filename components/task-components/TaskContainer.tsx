'use client'
import {  Droppable } from "react-beautiful-dnd"
import TaskItem from "./TaskItem"
import { IStatusContainerProps } from "@/interfaces/task-interfaces/tastContainerProps.interface"
import { useUserTasks } from "@/hooks/task-hooks/UserTasks"


const TaskContainer = (props:IStatusContainerProps) => {
    return (
        <Droppable isDropDisabled={localStorage.getItem('isAdmin')==='true'} droppableId={props.status}>
        {
          (provided)=>(
            <div ref={provided.innerRef} {...provided.droppableProps} className="bg-slate-100 flex py-3 px-4 gap-3 flex-col items-center font-sans">
           <h2 className='text-gray-500 text-lg'>{props.status.toUpperCase()}</h2>
           {
            props.tasks.map((task:any,index:number) => (
              <TaskItem key={task.id} id={task.id} index={index} title={task.title}/>
            ))
            } 
           {provided.placeholder}
          </div>
        )
        }
       
      </Droppable>
    )
}
export default TaskContainer