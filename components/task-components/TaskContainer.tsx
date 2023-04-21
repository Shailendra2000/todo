'use client'
import { useMutation } from "@tanstack/react-query"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { DeleteTaskMutation } from "../../mutations/task-mutations/DeleteMutaion"
import TaskItem from "./TaskItem"

interface IStatusContainerProps {
    id:string,
    tasks:any,
}

const TaskContainer = (props:IStatusContainerProps) => {
    return (
        <Droppable droppableId={props.id}>
        {
          (provided)=>(
            <div ref={provided.innerRef} {...provided.droppableProps} className="bg-slate-100 flex py-3 px-4 gap-3 flex-col items-center font-sans">
           <h2 className='text-gray-500 text-lg'>{props.id.toUpperCase()}</h2>
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