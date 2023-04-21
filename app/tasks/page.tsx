'use client'

import TaskPageContainer from "@/components/task-components/TaskPageContainer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function TaskPage(){
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
        <TaskPageContainer/>
    </QueryClientProvider>
    )
}
export default TaskPage