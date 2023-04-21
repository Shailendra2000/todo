'use client'

import StatusListContainer from "@/components/admin-components/task-status-components/StatusListContainer";
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
      <div className="col-span-4" >
        <StatusListContainer/>
      </div>
    </QueryClientProvider>
    )
}
export default TaskStatusPage