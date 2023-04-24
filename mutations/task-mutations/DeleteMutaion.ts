export const DeleteTaskMutation =  (formData:any) =>
fetch('http://localhost:9000/task', {
  method: 'DELETE',
  headers: {'Content-Type': 'application/json','authorization':localStorage.getItem("todo_token") as any},
  body: JSON.stringify(formData),
}).then((response) => {
    if (response.ok){
        return
    }
    else{
        throw new Error()
    }
})