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
import { ITask } from '@/interfaces/task-interfaces/task.interface';


const TaskPageContainer = () => {
  let searchParams = new URLSearchParams(window.location.search);
  const {isError,data} = useQuery(['statusList',localStorage.getItem("todo_token") as string],fetchStatusList)
  const [taskStatusList, setTaskStatusList] = useState<ITaskStatus[]>([]);
  const {userTasks,setUserTasks,fetchUserTasks,updateTaskStatus,updateTaskPosition} = useUserTasks({"statusList":taskStatusList})
  const router = useRouter()

  useEffect(() => {
    if (isError) {
      router.push('/auth/login')
    }
    if (data) {
        setTaskStatusList([...data]);
    }
  },[data,isError]);  


  const updatePosition = ( list :ITask [] ) => {
    list.map((task:ITask,index:number) => {
        updateTaskPosition(task.id,index)
    });
  }
 
  const moveListItem = ( fromList: ITask[], fromIndex : number, toList : ITask[], toIndex : number ) => {
    let item=fromList[fromIndex]
    fromList.splice(fromIndex,1)
    toList.splice(toIndex,0,item)
  }
 
  const dropEnd = (result:DropResult)=>{
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId===source.droppableId && destination.index===source.index) return
    
    moveListItem(userTasks[source.droppableId][0], source.index, userTasks[destination.droppableId][0], destination.index)
    
    if(destination.droppableId!==source.droppableId ){
        updateTaskStatus({"taskId":result.draggableId,"status":Number(result.destination?.droppableId),"status_from":Number(result.source?.droppableId)})
        updatePosition(userTasks[String(source.droppableId)][0])
    }
    
    updatePosition(userTasks[String(destination.droppableId)][0])
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
                <TaskContainer tasks={userTasks[element.id]?userTasks[element.id][0]:[]} status={element.status} id={element.id} key={element.id}/>
                {
                    userTasks[element.id] && userTasks[element.id][2] > userTasks[element.id][1]*2 && 
                    <button onClick={() => {
                        fetchUserTasks(element.id,userTasks[element.id][1]+1)
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

function updateTaskPriority(id: number, index: number) {
    throw new Error('Function not implemented.');
}
function updateTaskPosition(id: number, index: number) {
    throw new Error('Function not implemented.');
}

