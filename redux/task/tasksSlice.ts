import { IUserTask } from "@/hooks/task-hooks/useUserTasks";
import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    value: <IUserTask>{},
  },
  reducers: {
    setAllTasks: (state, action) => {
      state.value = action.payload;
    },
    setTasksByStatus: (state, action) => {
      state.value[action.payload.status] = action.payload.tasks;
    },
    updateTasksByStatus: (state, action) => {
      state.value[action.payload.status] = action.payload.tasks;
    }
  },
});
export const { setAllTasks, setTasksByStatus,updateTasksByStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
