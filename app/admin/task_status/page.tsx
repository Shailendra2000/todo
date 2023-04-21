'use client'

import StatusListContainer from "@/components/admin-components/StatusListContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function TaskStatusPage(){
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
        <StatusListContainer/>
    </QueryClientProvider>
    )
}
export default TaskStatusPage