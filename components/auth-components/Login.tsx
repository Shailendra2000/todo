'use client'
import {  useMutation } from "@tanstack/react-query";
import { LoginMutation } from "../../mutations/auth-mutations/LoginMutation";
import { useRouter } from "next/navigation";


const Login = () => {
  const loginMutation = useMutation(LoginMutation);
  const router = useRouter();
  return (
    <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            email: formData.get("email") ?? "",
            password: formData.get("password") ?? "",
          };
          loginMutation.mutate(obj, {
            onSuccess: (data) => {
              localStorage.setItem('todo_token',data.token)
              localStorage.setItem('isAdmin',data.isAdmin)
              if (data.isAdmin!==true){
                router.push('/tasks')
              }
              else{
                router.push('/users')
              }
            },
            onError: (error) => {
                alert("Invalid Creds")
            },
        });
        }}
      >

        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            className="search-input"
            name="email"
            placeholder="enter your email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="text"
            id="password"
            className="search-input"
            name="password"
            placeholder="enter your password"
          />
        </label>        
        <button className="px-6 rounded border-none bg-orange-500 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>
  )
}

export default Login