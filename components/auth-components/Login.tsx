'use client'
import {  useMutation } from "@tanstack/react-query";
import { LoginMutation } from "../../mutations/auth-mutations/LoginMutation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { getFormData } from "@/services/getFormData";
import { ILoginResponseData } from "@/interfaces/login-interfaces/loginResponse.interface";

const Login = () => {
  
  const loginMutation = useMutation(LoginMutation);
  const router = useRouter();
  const defaultLoginFormFeilds = ['email', 'password']
  const defaultAdminRedirectUrl = '/users'
  const defaultUserRedirectUrl = '/tasks'
  const defaultErrorMessage = 'Invalid Creds!' 
  const defaultTokenKey = 'todo_token' 
  const defaultIsAdminKey = 'isAdmin'

  const loginAction = ( formSubmitEvent : FormEvent<HTMLFormElement> , dataFeilds : string[] = defaultLoginFormFeilds, adminRedirectUrl : string = defaultAdminRedirectUrl, userRedirectUrl : string = defaultUserRedirectUrl, errorMessage : string = defaultErrorMessage, tokenKey : string = defaultTokenKey, isAdminKey : string = defaultIsAdminKey)=>{
    const loginData = getFormData( formSubmitEvent.currentTarget, dataFeilds ) 
    loginMutation.mutate(loginData, {
      onSuccess: ( data : ILoginResponseData ) => {
        localStorage.setItem(`${tokenKey}`, data.token)
        localStorage.setItem(`${isAdminKey}`, String( data.isAdmin ))
        if ( data.isAdmin !== true ) {
          router.push(`${userRedirectUrl}`)
        }
        else{
          router.push(`${adminRedirectUrl}`)
        }
      },
      onError: (error) => {
        alert(`${errorMessage}`)
      },
    });
  }

  return (
    <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(event:FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          loginAction(event)
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