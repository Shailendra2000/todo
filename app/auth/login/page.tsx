'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../../../components/auth-components/Login"
import  Link  from "next/link";
function LoginPage(){
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
          },
        },
      });

    return(
        <QueryClientProvider client={queryClient}>
            <div className="grid h-screen place-items-center">
                <div className="flex flex-col items-center">
                <Login/>
                <h3>Do not have account?</h3>
                <Link className="text-blue-500" href="auth/signup">Sign Up</Link>
                </div>
            </div>
        </QueryClientProvider>
    ) 
}
export default LoginPage