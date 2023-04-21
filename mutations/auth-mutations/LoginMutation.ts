export const LoginMutation =  (formData:any) =>
fetch('http://localhost:9000/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
}).then((response) => {
    if (response.ok){
        return response.json()
    }
    else{
        throw new Error()
    }
})