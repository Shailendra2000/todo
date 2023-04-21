'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IGetTaskRequestParams, fetchTasks } from "../../services/fetchTasks";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import CreateTask from '../../components/task-components/CreateTask';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TaskContainer from '../../components/task-components/TaskContainer';
import { UpdateTaskStatusMutation } from '../../mutations/task-mutations/UpdateMutation';
import {  useRouter } from 'next/navigation';
const TaskPageContainer = () => {
  let searchParams = new URLSearchParams(window.location.search);
  
  let fetchParam:IGetTaskRequestParams={token:localStorage.getItem("todo_token") as string,userId:Number(searchParams.get('userId'))};
  const result = useQuery(["tasks",fetchParam],fetchTasks)
  const [tasks,setTasks] = useState([]) as any
  const [taskStatusList, setTaskStatusList] = useState([]) as any
  const updateTaskStatusMutation = useMutation(UpdateTaskStatusMutation)
  const router = useRouter()

  const updateTaskStatus = (obj:any) => {
    console.log(obj)
    updateTaskStatusMutation.mutate(obj, {
      onSuccess: (data) => {
      },
      onError: (error) => {
          alert("Bad Request")
      },
    });
  }

  useEffect(() => {
    if (result.isError) {
      router.push('/auth/login')
    }
    if (result.data) {
      setTaskStatusList(Object.keys(result.data.tasks));
      setTasks(result.data.tasks)
    }
  },[result.data,result.isError]);
  
  
  const dropEnd = (result:DropResult)=>{
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId===source.droppableId && destination.index===source.index) return

    let add=tasks[source.droppableId][source.index]
    tasks[source.droppableId].splice(source.index,1)
    tasks[destination.droppableId].splice(destination.index,0,add)
    if(destination.droppableId!==source.droppableId ){
        updateTaskStatus({"taskId":result.draggableId,"status":result.destination?.droppableId})
    }
  }

  return (
    <DragDropContext onDragEnd={dropEnd}>
    <div className='flex flex-col items-center p-6 gap-5'>  
      <div className='shadow-md'>
        <CreateTask key='create_form'/>
      </div>
      <div className='grid grid-flow-col-dense gap-4'>
      {
        taskStatusList.map((element:string) => (
            <TaskContainer tasks={tasks[element]} id={element} key={element}/>
        ))
      }
    </div>
    </div>
    </DragDropContext>
  );
}
export default TaskPageContainer