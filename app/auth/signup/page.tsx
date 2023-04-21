'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "@/components/auth-components/Signup";
import  Link  from "next/link";
function SignupPage(){
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
                <Signup/>
                <h3>Already have account?</h3>
                <Link className="text-blue-500" href="auth/login">Login</Link>
            </div>
        </div>
        </QueryClientProvider>
    ) 
}
export default SignupPage