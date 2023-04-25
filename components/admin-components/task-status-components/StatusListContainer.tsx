'use client'

import StatusList from "./StatusList"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import CreateStatus from "./CreateStatus"
import { useTaskStatusList } from "@/hooks/task-status-list-hooks/useTaskStatusList"
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface"


function StatusListContainer () {

    const {statusList,updateTaskStatusPriority} = useTaskStatusList()

    const moveStatusListItem = ( fromList: ITaskStatus[], fromIndex : number, toList : ITaskStatus[], toIndex : number ) => {
      let item=fromList[fromIndex]
      fromList.splice(fromIndex,1)
      toList.splice(toIndex,0,item)
    }

    const dropEnd = (result:DropResult)=>{
      const { source, destination } = result
      if (!destination) return
      if (destination.droppableId===source.droppableId && destination.index===source.index) return
      
      moveStatusListItem(statusList,source.index,statusList,destination.index)
      
      statusList.map((status:any,index:number) => {
        updateTaskStatusPriority(status.id,index)
      });
    
    }

    return (
    <div className="flex flex-col items-center mt-5">
      <DragDropContext onDragEnd={dropEnd}>
          <StatusList statusList={statusList}/>
      </DragDropContext>
    </div>
    )
}
export default StatusListContainer