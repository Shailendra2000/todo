'use client'
import { ITaskStatus } from "@/interfaces/task-interfaces/taskStatus.interface";
import { CreateTaskMutation } from "@/mutations/task-mutations/CreateMutation";
import { CreateTaskStatusMutation } from "@/mutations/task-status-mutations/createStatus";
import { getFormData } from "@/services/getFormData";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
    
interface ICreateStatusProps{
    statusList:ITaskStatus[]
}
const CreateStatus = (props:ICreateStatusProps) => {    
    const createTaskStatusMutation = useMutation(CreateTaskStatusMutation) 
    const router = useRouter()
    const defaultStatusFormFeilds = [ 'title' ]
    const sucessMessage = 'status created!'
    const errorMessage = 'Bad Request'

    const createStatusAction = ( formSubmitEvent : FormEvent<HTMLFormElement> , dataFeilds : string[] = defaultStatusFormFeilds) => {
        const data = getFormData( formSubmitEvent.currentTarget , dataFeilds )
        createTaskStatusMutation.mutate(data, {
            onSuccess: (data) => {
              alert(`${sucessMessage}`)
            },
            onError: (error) => {
                alert(`${errorMessage}`)
            },
        });
    }

    return (
        <form
        className="flex gap-5 items-center justify-center rounded-lg bg-gray-200 px-10 py-5 shadow-lg"
        id="create"
        onSubmit={(e) => {
          e.preventDefault();
          createStatusAction(e)
        }}
        >
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            className="search-input"
            name="title"
            placeholder="status"
            required
          />
        </label>
     
        <button className="px-6 rounded border-none bg-sky-500 py-2 text-white hover:opacity-50">
          CREATE
        </button>
      </form>
    )
}    
export default CreateStatus