'use client'

import { Droppable } from "react-beautiful-dnd"
import StatusItem from "./StatusItem"

interface IStatusListProps {
    statusList:any
}
function StatusList (props:IStatusListProps) {
    return (
        <Droppable droppableId='status_list'>
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col justify-center m-auto shadow-md gap-4  p-6 items-center mt-8 mx-2">
                        <div key='heading' className="flex justify-between w-full p-4 shadow-md ">
                            <h1>Status List</h1>
                        </div>  
                        {   
                        props.statusList.map((status:any,index:number)=>(
                            <StatusItem id={status.id} title={status.status} key={status.id} index={index}/>
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