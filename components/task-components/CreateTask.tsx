'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateTaskMutation } from "../../mutations/task-mutations/CreateMutation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchStatusList } from "@/services/fetchStatusList";
    
interface ICreateTaskProps{
    buttonDisabled:boolean
}
const CreateTask = (props:ICreateTaskProps) => { 
    const [status,setStatus] = useState([]) as any
    const result = useQuery(["tasks",localStorage.getItem("todo_token")],fetchStatusList)
    const createTaskMutation = useMutation(CreateTaskMutation) 
    const router = useRouter()
    useEffect(()=>{
        if(result.data){
            const statusList:string[] = []
            result.data.forEach((element:any) => {
                statusList.push(element.status)
            });
            setStatus(statusList)
        }
    },[result.data])
    return (
        <form
        className="flex gap-5 items-center justify-center rounded-lg bg-gray-200 px-10 py-5 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            "title": formData.get("title") ?? "",
            "desc": formData.get("desc") ?? "",
            "status": formData.get("status") ?? ""
          };
          
          createTaskMutation.mutate(obj, {
            onSuccess: (data) => {
              alert('task created!')
              router.refresh()
            },
            onError: (error) => {
                alert("Bad Request")
            },
        });
        }}
        >
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            className="search-input"
            name="title"
            placeholder="task title"
            required
          />
        </label>
        
        <label htmlFor="desc">
          Description
          <input
            type="text"
            id="desc"
            className="search-input"
            name="desc"
            placeholder="task desc"
            required
          />
        </label>        
        <label htmlFor="status">
          Status
          <select className='search-input' name="status">
          {status.map((status:string) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label> 
        <button disabled={props.buttonDisabled} className="px-6 disabled:bg-gray-300 rounded border-none bg-sky-500 py-2 text-white hover:opacity-50">
          CREATE
        </button>
      </form>
    )
}    
export default CreateTask