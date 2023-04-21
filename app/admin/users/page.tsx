'use client'

import AdminPageContainer from "@/components/admin-components/UserContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function AdminPage(){
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
          },
        },
      });
    return (
    <QueryClientProvider client={queryClient}>
      <AdminPageContainer/>
    </QueryClientProvider>
    )
}
export default AdminPage