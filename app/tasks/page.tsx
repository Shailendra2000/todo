'use client'

import TaskPageContainer from "@/components/task-components/TaskPageContainer"
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux";

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
      <Provider store={store}>
        <TaskPageContainer/>
      </Provider>
    </QueryClientProvider>
    )
}
export default TaskPage