'useClient'
import { useMutation } from "@tanstack/react-query";
import { SignupMutation } from "../../mutations/auth-mutations/SignupMutation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { getFormData } from "@/services/getFormData";
const Signup = () => {

    const router = useRouter()
    const signupMutation = useMutation(SignupMutation);
    const defaultSignupFormFeilds = ['username', 'email', 'password']
    const defaultSucessMessage = 'Account created!, please login'
    const defaultErrorMessage = 'Invalid Inputs!'
    const defaultSucessRedirectUrl = 'auth/login'

    const signupAction = ( formSubmitEvent : FormEvent<HTMLFormElement>, dataFeilds : string[] = defaultSignupFormFeilds, sucessMessage : string = defaultSucessMessage, sucessRedirectUrl : string = defaultSucessRedirectUrl, errorMessage : string = defaultErrorMessage ) => {
        const signupData = getFormData( formSubmitEvent.currentTarget, dataFeilds )
        signupMutation.mutate(signupData, {
            onSuccess: (data : unknown) => {
                alert(`${sucessMessage}`)
                router.push(`${sucessRedirectUrl}`)
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
            signupAction(event)
          }}
        >
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            className="search-input"
            name="username"
            placeholder="enter username"
          />
        </label>
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

export default Signup