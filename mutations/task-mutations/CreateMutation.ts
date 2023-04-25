export const CreateTaskMutation =  (formData:any) =>
fetch('http://localhost:9000/task', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','authorization':localStorage.getItem("todo_token") as any},
  body: JSON.stringify(formData),
}).then((response) => {
    if (response.ok){
        response.json()
    }
    else{
        throw new Error()
    }
})