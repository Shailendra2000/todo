'use client'

import { useEffect, useState } from "react"
import StatusList from "./StatusList"
import { useQuery } from "@tanstack/react-query"
import { fetchStatusList } from "@/services/fetchStatusList"
import { useRouter } from "next/navigation"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

function StatusListContainer () {
    const [sttatusList,setStatusList]=useState([]) as any
    const router = useRouter()
    const result = useQuery(["statusList",localStorage.getItem("todo_token")],fetchStatusList)
    useEffect(() => {
        if (result.isError) {
          router.push('/tasks')
        }
        if (result.data) {
            console.log(result.data)
          setStatusList(result.data);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result.data,result.isError]);
    
    const dropEnd = (result:DropResult)=>{
        const { source, destination } = result
        if (!destination) return
        if (destination.droppableId===source.droppableId && destination.index===source.index) return
    
        let add=sttatusList[source.index]
        sttatusList.splice(source.index,1)
        sttatusList.splice(destination.index,0,add)
    
        // updateTaskStatus({"taskId":result.draggableId,"status":result.destination?.droppableId})
      }

    return (
    <DragDropContext onDragEnd={dropEnd}>
        <div>
            <StatusList statusList={sttatusList}/>
        </div>
    </DragDropContext>
    )
}
export default StatusListContainer