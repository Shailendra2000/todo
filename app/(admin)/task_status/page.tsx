'use client'

import StatusListContainer from "@/components/admin-components/task-status-components/StatusListContainer";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

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
      <Provider store={store}>
      <div className="col-span-4" >
        <StatusListContainer/>
      </div>
      </Provider>
    </QueryClientProvider>
    )
}
export default TaskStatusPage