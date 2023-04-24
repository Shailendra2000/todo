'useClient'
import { useMutation } from "@tanstack/react-query";
import { SignupMutation } from "../../mutations/auth-mutations/SignupMutation";
import { useRouter } from "next/navigation";
const Signup = () => {
    const router = useRouter()
    const signupMutation = useMutation(SignupMutation);
    return (
      <form
          className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const obj = {
              username: formData.get("username") ?? "",
              email: formData.get("email") ?? "",
              password: formData.get("password") ?? "",
            };
            signupMutation.mutate(obj, {
                onSuccess: (data) => {
                    alert("Account created!, please login")
                    router.push('auth/login')
                },
                onError: (error) => {
                    alert("Invalid Inputs")
                },
            });
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