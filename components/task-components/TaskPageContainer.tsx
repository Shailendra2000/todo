'use client'
import { useEffect, useState, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import CreateTask from '../../components/task-components/CreateTask';
import {  useQuery } from '@tanstack/react-query';
import TaskContainer from '../../components/task-components/TaskContainer';
import {  useRouter } from 'next/navigation';
import AdminTaskPageHeader from './AdminHeader';
import { fetchStatusList } from '../../services/fetchStatusList';
import { useUserTasks } from '@/hooks/task-hooks/useUserTasks';
import { ITaskStatus } from '@/interfaces/task-interfaces/taskStatus.interface';


const TaskPageContainer = () => {
  let searchParams = new URLSearchParams(window.location.search);
  const {isError,data} = useQuery(['statusList',localStorage.getItem("todo_token") as string],fetchStatusList)
  const [taskStatusList, setTaskStatusList] = useState<ITaskStatus[]>([]);
  const {userTasks,setUserTasks,fetchUserTasks,updateTaskStatus} = useUserTasks({"statusList":taskStatusList})
  const router = useRouter()

  useEffect(() => {
    if (isError) {
      router.push('/auth/login')
    }
    if (data) {
        setTaskStatusList([...data]);
    }
  },[data,isError]);  
  
  const dropEnd = (result:DropResult)=>{
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId===source.droppableId && destination.index===source.index) return
    
    let add=userTasks[source.droppableId][0][source.index]
    userTasks[source.droppableId][0].splice(source.index,1)
    userTasks[destination.droppableId][0].splice(destination.index,0,add)
    if(destination.droppableId!==source.droppableId ){
        updateTaskStatus({"taskId":result.draggableId,"status":result.destination?.droppableId})
    }
     
  }
 
  return (
    <DragDropContext onDragEnd={dropEnd}>
    <AdminTaskPageHeader name={searchParams.get('name')}/>
    <div className='flex flex-col items-center p-6 gap-5'>  
      <div className='shadow-md'>
        <CreateTask key='create_form' buttonDisabled={localStorage.getItem('isAdmin')!=='false'}/>
      </div>
      <div className='grid grid-flow-col-dense gap-4'>
      {
        
        taskStatusList.map((element:ITaskStatus) => {
           return <div className='flex flex-col items-center bg-slate-100 py-5'>
                <TaskContainer tasks={userTasks[element.status]?userTasks[element.status][0]:[]} status={element.status} id={element.id} key={element.id}/>
                {
                    userTasks[element.status] && userTasks[element.status][2] > userTasks[element.status][1]*2 && 
                    <button onClick={() => {
                        let taskStatus:ITaskStatus={id:element.id,status:element.status};
                        fetchUserTasks(taskStatus,userTasks[element.status][1]+1)
                        }} className="px-3 rounded border-none bg-gray-400 disabled:bg-gray-300 py-2 text-white hover:opacity-50">Show more</button>        
                }
                </div>
        })
      }
    </div>
    </div>
    </DragDropContext>
  );
}
export default TaskPageContainer