'use client'

import { useEffect } from "react"
import StatusList from "./StatusList"
import { useQuery } from "@tanstack/react-query"
import { fetchStatusList } from "@/services/fetchStatusList"
import { useRouter } from "next/navigation"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import CreateStatus from "./CreateStatus"
import { useTaskStatusList } from "@/hooks/task-hooks/useTaskStatusList"


function StatusListContainer () {

    const {statusList,updateTaskPriority} = useTaskStatusList()
    
    const dropEnd = (result:DropResult)=>{
        const { source, destination } = result
        if (!destination) return
        if (destination.droppableId===source.droppableId && destination.index===source.index) return
    
        let add=statusList[source.index]
        statusList.splice(source.index,1)
        statusList.splice(destination.index,0,add)
        statusList.map((item:any,index:number)=>{

        })
        statusList.map((status:any,index:number) => {
            updateTaskPriority(status.id,index)
        });
      }

    return (
    <div className="flex flex-col items-center mt-5">
      <CreateStatus/>
      <DragDropContext onDragEnd={dropEnd}>
          <StatusList statusList={statusList}/>
      </DragDropContext>
    </div>
    )
}
export default StatusListContainer