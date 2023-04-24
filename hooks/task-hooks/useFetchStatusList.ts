import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { fetchStatusList } from "@/services/fetchStatusList";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const useFetchTask = () => {
  const result = useQuery(["statusList",localStorage.getItem("todo_token")],fetchStatusList)
  const router = useRouter()
  const [statusList,setStatusList]=useState<ITaskStatus[]>([])

  useEffect(() => {
      if (result.isError) {
        router.push('/tasks')
      }
      if (result.data) {
        setStatusList(result.data);
      }
  },[result.data,result.isError]);

  return statusList
}
