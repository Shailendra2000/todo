'use client'

import { DeleteTaskMutation } from "@/mutations/task-mutations/DeleteMutaion"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Draggable } from "react-beautiful-dnd"

interface ITaskItemProps{
    id:number,
    index:number,
    title:string
}
function TaskItem (props:ITaskItemProps) {

    const deleteTaskMutation = useMutation(DeleteTaskMutation) 
    const router = useRouter()
    const deleteTask = (id:string|number) => {
      deleteTaskMutation.mutate({"id":Number(id)}, {
        onSuccess: (data) => {
          alert('task deleted!')
          router.refresh()
        },
        onError: (error) => {
            alert("Bad Request")
        },
      })
    }
    return(
        <Draggable isDragDisabled={Boolean(localStorage.getItem('isAdmin'))} draggableId={props.id.toString()} index={props.index} key={props.id}>
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