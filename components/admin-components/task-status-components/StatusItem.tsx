'use client'

import { useTaskStatusList } from "@/hooks/task-hooks/useTaskStatusList";
import { DeleteTaskMutation } from "@/mutations/task-mutations/DeleteMutaion";
import { DeleteTaskStatusMutation } from "@/mutations/task-status-mutations/removeStatus";
import { useMutation } from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import { Draggable } from "react-beautiful-dnd"

interface IStatusItemProps {
    id:number,
    index:number,
    title:string
}
function StatusItem (props:IStatusItemProps) {
    const { deleteStatus } = useTaskStatusList()
    const router = useRouter()

    return (
        <Draggable draggableId={props.id.toString()} index={props.index} key={props.id}>
        {
        (provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} key={props.id} className="flex justify-between w-full p-4 shadow-md bg-gray-100">
                    <h1>{props.title}</h1>
                    <button onClick={()=>{deleteStatus(props.id)}} className="px-6 rounded border-none bpy-2 opacity-50 hover:opacity-100">Delete</button>
                </div>  
            )
        }
        </Draggable>
    )
}
export default StatusItem