"use client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CreateTask from "../../components/task-components/CreateTask";
import TaskContainer from "../../components/task-components/TaskContainer";
import AdminTaskPageHeader from "./AdminHeader";
import { IUserTask, useUserTasks } from "@/hooks/task-hooks/useUserTasks";
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { ITask } from "@/interfaces/task-interfaces/task.interface";
import PaginationButton from "./PaginationButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAllTasks } from "@/redux/task/tasksSlice";

const TaskPageContainer = () => {
  let searchParams = new URLSearchParams(window.location.search);
  const taskStatusList = useSelector((state:any) => state.statusList.value);
  const dispatch = useDispatch();

  const {
    userTasks,
    getTasks,
    updateTaskStatus,
    updateTaskPosition,
    areAllTasksFetched,
  } = useUserTasks({ statusList: taskStatusList });

  const updatePosition = (userTasks: IUserTask, statusId: string) => {
    userTasks[statusId].tasks.forEach((task: ITask, index: number) => {
      updateTaskPosition(task.id, index);
    });
  };

  const moveListItem = (
    userTasks: IUserTask,
    fromStatusId: string,
    toStatusId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    let item = userTasks[fromStatusId].tasks[fromIndex];
    userTasks[fromStatusId].tasks.splice(fromIndex, 1);
    userTasks[toStatusId].tasks.splice(toIndex, 0, item);
    return userTasks;
  };

  const dropEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    const from_statusId = source.droppableId;
    const to_statusId = destination.droppableId;
    const from_index = source.index;
    const to_index = destination.index;
    const draggedTaskId = result.draggableId;

    if (to_statusId === from_statusId && to_index === from_index) return;

    const cloneUserTasks : IUserTask = JSON.parse(JSON.stringify(userTasks));
    const newUserTasks = moveListItem(
      cloneUserTasks,
      from_statusId,
      to_statusId,
      from_index,
      to_index
    );
    if (from_statusId !== to_statusId) {
      updateTaskStatus({
        tasks: newUserTasks,
        taskId: Number(draggedTaskId),
        to_status: Number(to_statusId),
        from_status: Number(from_statusId),
      });
      updatePosition(newUserTasks, from_statusId);
    }
    updatePosition(newUserTasks, to_statusId);
    dispatch(setAllTasks(newUserTasks));
    
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
          {taskStatusList
            ? taskStatusList.map((element: ITaskStatus) => {
                return (
                  <div className="flex flex-col items-center bg-slate-100 p-5 rounded-lg">
                    <TaskContainer
                      status={element.status}
                      id={element.id}
                      key={element.id}
                    />
                    {userTasks[element.id] &&
                      !areAllTasksFetched(userTasks, element.id) && (
                        <PaginationButton
                          id={element.id}
                          userTasks={userTasks}
                          fetchUserTasks={getTasks}
                        />
                      )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </DragDropContext>
  );
};
export default TaskPageContainer;
