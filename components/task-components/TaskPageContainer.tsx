"use client";
import { useEffect, useState, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CreateTask from "../../components/task-components/CreateTask";
import { useQuery } from "@tanstack/react-query";
import TaskContainer from "../../components/task-components/TaskContainer";
import { useRouter } from "next/navigation";
import AdminTaskPageHeader from "./AdminHeader";
import { useUserTasks } from "@/hooks/task-hooks/useUserTasks";
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { ITask } from "@/interfaces/task-interfaces/task.interface";
import axiosInstance from "../../intercepters/defaultIntercepter";
import PaginationButton from "./PaginationButton";

const TaskPageContainer = () => {
  let searchParams = new URLSearchParams(window.location.search);
  const { isError, data } = useQuery(
    ["statusList"],
    async () => (await axiosInstance.get("http://localhost:9000/task-status")).data
  );

  const [taskStatusList, setTaskStatusList] = useState<ITaskStatus[]>([]);
  const {
    userTasks,
    getTasks,
    updateTaskStatus,
    updateTaskPosition,
    areAllTasksFetched,
  } = useUserTasks({ statusList: taskStatusList });
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
    if (data) {
      setTaskStatusList([...data]);
    }
  }, [data, isError]);

  const updatePosition = (list: ITask[]) => {
    list.map((task: ITask, index: number) => {
      updateTaskPosition(task.id, index);
    });
  };

  const moveListItem = (
    fromList: ITask[],
    fromIndex: number,
    toList: ITask[],
    toIndex: number
  ) => {
    let item = fromList[fromIndex];
    fromList.splice(fromIndex, 1);
    toList.splice(toIndex, 0, item);
  };


  const dropEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    const from_statusId = source.droppableId;
    const to_statusId = destination.droppableId;
    const from_index = source.index;
    const to_index = destination.index;
    const draggedTaskId = result.draggableId;
    const fromTaskList = userTasks[from_statusId].tasks;
    const toTaskList = userTasks[to_statusId].tasks;

    if (to_statusId === from_statusId && to_index === from_index) return;

    moveListItem(
      fromTaskList,
      from_index,
      toTaskList,
      to_index
    );

    if (from_statusId !== to_statusId) {
      updateTaskStatus({
        taskId: Number(draggedTaskId),
        to_status: Number(to_statusId),
        from_status: Number(from_statusId),
      });
      updatePosition(fromTaskList);
    }
    updatePosition(toTaskList);
  };

  return (
    <DragDropContext onDragEnd={dropEnd}>
      <AdminTaskPageHeader name={searchParams.get("name")} />
      <div className="flex flex-col items-center py-6 gap-5">
        <div className="shadow-md">
          <CreateTask
            key="create_form"
            buttonDisabled={localStorage.getItem("isAdmin") !== "false"}
          />
        </div>
        <div className="grid grid-flow-col-dense gap-4">
          {taskStatusList.map((element: ITaskStatus) => {
            return (
              <div className="flex flex-col items-center bg-slate-100 p-5 rounded-lg">
                <TaskContainer
                  tasks={
                    userTasks[element.id] ? userTasks[element.id].tasks : []
                  }
                  status={element.status}
                  id={element.id}
                  key={element.id}
                />
                {userTasks[element.id] && !areAllTasksFetched(element.id) && (
                  <PaginationButton
                    id={element.id}
                    userTasks={userTasks}
                    fetchUserTasks={getTasks}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};
export default TaskPageContainer;
