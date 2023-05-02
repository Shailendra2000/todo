"use client";

import AdminPageContainer from "@/components/admin-components/users-components/UserContainer";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

function AdminPage() {
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
        <div className="grid col-span-4">
          <AdminPageContainer />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}
export default AdminPage;
