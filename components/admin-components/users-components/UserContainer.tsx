"use client";
import UserList from "./UserList";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUsers } from "@/redux/admin/usersList/usersListSlice";
import { useGetUsersListQuery } from "@/redux/todoApi";
const AdminPageContainer = () => {
  const { isError, data: users } = useGetUsersListQuery(
    localStorage.getItem("todo_token")
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const userList = useSelector((state:any) => state.usersList.value);
  useEffect(() => {
    if (isError) {
      router.push("/tasks");
    }
    if (users) {
      dispatch(setUsers(users));
    }
  }, [users, isError]);

  return (
    <div className="flex flex-col items-center gap-4">
      <UserList users={userList} />
    </div>
  );
};
export default AdminPageContainer;
