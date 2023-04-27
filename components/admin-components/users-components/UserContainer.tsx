"use client";
import { useQuery } from "@tanstack/react-query";
import UserList from "./UserList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/intercepters/defaultIntercepter";
const AdminPageContainer = () => {
  const { isError, data } = useQuery(
    ["users"],
    async () => (await axios.get("http://localhost:9000/users")).data
  );

  const router = useRouter();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (isError) {
      router.push("/tasks");
    }
    if (data) {
      setUserList(data.users);
    }
  }, [data, isError]);

  return (
    <div className="flex flex-col items-center gap-4">
      <UserList users={userList} />
    </div>
  );
};
export default AdminPageContainer;
