export const SignupMutation =  (formData:any) =>
fetch('http://localhost:9000/signup', {
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