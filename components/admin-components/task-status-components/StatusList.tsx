'use client'

import { Droppable } from "react-beautiful-dnd"
import StatusItem from "./StatusItem"
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface"
import CreateStatus from "./CreateStatus"
import { useTaskStatusList } from "@/hooks/task-status-list-hooks/useTaskStatusList"

function StatusList () {

    const statusListDroppableId = 'statusList'
    const {statusList} = useTaskStatusList()
    return (
        <Droppable droppableId={statusListDroppableId}>
            {
                (provided) => (
                    <div ref = {provided.innerRef} {...provided.droppableProps} className="flex flex-col justify-center m-auto shadow-md gap-4  p-6 items-center mt-8 mx-2">
                        <CreateStatus statusList={statusList}/>
                        <div key = 'heading' className = "flex justify-between w-full p-4 shadow-md ">
                            <h1> Status List </h1>
                        </div>  
                        {   
                        statusList.map( (status : any, index : number) => (
                            <StatusItem id = {status.id} title = {status.status} key = {status.id} index={index}/>
                        ))
                        }
                        {provided.placeholder}
                    </div>
                )
            }      
        </Droppable>
    )
}
export default StatusList