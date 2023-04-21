'use client'

import AdminPageContainer from "@/components/admin-components/users-components/UserContainer";
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
      <div className="grid col-span-4">
      <AdminPageContainer/>
      </div>
    </QueryClientProvider>
    )
}
export default AdminPage