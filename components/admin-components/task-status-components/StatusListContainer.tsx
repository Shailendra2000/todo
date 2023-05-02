"use client";
import StatusList from "./StatusList";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";
import { useTaskStatusList } from "@/hooks/task-status-list-hooks/useTaskStatusList";
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { useDispatch } from "react-redux";
import {
  addStatus,
  removeStatus,
} from "@/redux/admin/statusList/statusListSlice";
import { useEffect, useState } from "react";

function StatusListContainer() {
  const { statusList, updateTaskStatusPriority } = useTaskStatusList();
  const dispatch = useDispatch();

  const moveStatusListItem = (
    fromList: ITaskStatus[],
    fromIndex: number,
    toIndex: number
  ) => {
    let item = fromList[fromIndex];
    
    dispatch(removeStatus(fromIndex));
    dispatch(addStatus({ index: toIndex, item: item }));
  };
  const isPositionNotChanged = (
    destination: DraggableLocation,
    source: DraggableLocation
  ) => {
    return (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    );
  };

  const dropEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (isPositionNotChanged(destination, source)) return;

    moveStatusListItem(statusList, source.index, destination.index);
  };
  useEffect(() => {
    statusList.map((status: any, index: number) => {
      updateTaskStatusPriority(status.id, index);
    });
  }, [statusList]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="flex flex-col items-center mt-5">
      <DragDropContext onDragEnd={dropEnd}>
        <StatusList />
      </DragDropContext>
    </div>
  ) : null;
}
export default StatusListContainer;
