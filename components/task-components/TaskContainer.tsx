'use client'
import {  Droppable } from "react-beautiful-dnd"
import TaskItem from "./TaskItem"

interface IStatusContainerProps {
    id:string,
    tasks:any,
}

const TaskContainer = (props:IStatusContainerProps) => {
    return (
        <Droppable isDropDisabled={Boolean(localStorage.getItem('isAdmin'))} droppableId={props.id}>
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