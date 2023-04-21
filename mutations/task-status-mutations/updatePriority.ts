export const UpdateTaskStatusMutation =  (formData:any) =>
fetch('http://localhost:9000/task-status', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json','authorization':localStorage.getItem("todo_token") as any},
  body: JSON.stringify(formData),
}).then((response) => {
    if (response.ok){
    }
    else{
        throw new Error()
    }
})