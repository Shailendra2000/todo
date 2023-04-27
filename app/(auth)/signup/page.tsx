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
          <Signup/>
        </QueryClientProvider>
    ) 
}
export default SignupPage