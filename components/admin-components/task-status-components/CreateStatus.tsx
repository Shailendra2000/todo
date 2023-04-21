'use client'
import { CreateTaskMutation } from "@/mutations/task-mutations/CreateMutation";
import { CreateTaskStatusMutation } from "@/mutations/task-status-mutations/createStatus";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
    
const CreateStatus = () => { 
    const createTaskStatusMutation = useMutation(CreateTaskStatusMutation) 
    const router = useRouter()
    return (
        <form
        className="flex gap-5 items-center justify-center rounded-lg bg-gray-200 px-10 py-5 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            "title": formData.get("title") ?? "",
          };
          
          createTaskStatusMutation.mutate(obj, {
            onSuccess: (data) => {
              alert('status created!')
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