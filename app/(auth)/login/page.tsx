'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../../../components/auth-components/Login"
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
          <Login/>
        </QueryClientProvider>
    ) 
}
export default LoginPage