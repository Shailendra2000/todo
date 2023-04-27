'use client'

import axios from "@/intercepters/defaultIntercepter"
import { useMutation } from "@tanstack/react-query"
import { Draggable } from "react-beautiful-dnd"

interface ITaskItemProps{
    id:number,
    index:number,
    title:string
}
function TaskItem (props:ITaskItemProps) {

    const deleteTaskMutation = useMutation(
      (params : { id : number }) =>
        axios
          .delete(`http://localhost:9000/task?id=${params.id}`)
          .then((res) => res.data),
      {
        onSuccess: (data) => {
          console.log('task deleted!');
        },
        onError: (error) => {
          console.log(`Bad Request!`);
        },
      }
    );
    
    const deleteTask = (id:string|number) => {
      deleteTaskMutation.mutate({"id":Number(id)})
    }

    return(
        <Draggable isDragDisabled={localStorage.getItem('isAdmin')==='true'} draggableId={props.id.toString()} index={props.index} key={props.id}>
        {
        (provided) => (
            <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} key={props.id} className="shadow-md px-6 py-3 w-56 flex flex-col gap-6 bg-white ">
            <h1 className="text-gray-600">{props.title}</h1>
            <div className='flex justify-between'>
                <button className='text-sm text-gray-500 button' >Update</button>
                <button className='text-sm text-gray-500 button' onClick={()=>deleteTask(props.id)} >Delete</button>
            </div>
            </div>
        )
        }
        </Draggable>
    )
}

export default TaskItem