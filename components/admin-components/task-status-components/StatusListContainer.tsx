'use client'

import { useEffect, useState } from "react"
import StatusList from "./StatusList"
import { useQuery } from "@tanstack/react-query"
import { fetchStatusList } from "@/services/fetchStatusList"
import { useRouter } from "next/navigation"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { UpdateTaskStatusMutation } from "@/mutations/task-mutations/UpdateMutation"
import { useMutation } from "@tanstack/react-query"
import CreateStatus from "./CreateStatus"


function StatusListContainer () {
    const [sttatusList,setStatusList]=useState([]) as any
    const updateTaskStatusMutation = useMutation(UpdateTaskStatusMutation) 
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
    
    const updateTaskPriority = (statusId:number,priority:number) => {
        const obj = {
            "statusId": statusId,
            "priority": priority
          };
          
          updateTaskStatusMutation.mutate(obj, {
            onSuccess: (data) => {
                router.refresh()
            },
        });
    }

    const dropEnd = (result:DropResult)=>{
        const { source, destination } = result
        if (!destination) return
        if (destination.droppableId===source.droppableId && destination.index===source.index) return
    
        let add=sttatusList[source.index]
        sttatusList.splice(source.index,1)
        sttatusList.splice(destination.index,0,add)
        sttatusList.map((item:any,index:number)=>{

        })
        sttatusList.map((status:any,index:number) => {
            updateTaskPriority(status.id,index)
        });
      }

    return (
    <div className="flex flex-col items-center mt-5">
      <CreateStatus/>
      <DragDropContext onDragEnd={dropEnd}>
          <StatusList statusList={sttatusList}/>
      </DragDropContext>
    </div>
    )
}
export default StatusListContainer