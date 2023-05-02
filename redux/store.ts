import { configureStore } from "@reduxjs/toolkit";
import usersList from "./admin/usersList/usersListSlice";
import { todoApi } from "./todoApi";
import statusList from "./admin/statusList/statusListSlice"
import tasks from './task/tasksSlice'
const store = configureStore({
  reducer: {
    usersList,
    statusList,
    tasks,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
export default store;
