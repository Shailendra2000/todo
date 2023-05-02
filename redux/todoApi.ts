import {
  FetchArgs,
  FetchBaseQueryArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";



const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("todo_token");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithIntercepter: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.data && result.data.token) {
    localStorage.setItem('todo_token', result.data.token);
  }
  if (result.data && result.data.isAdmin){
    localStorage.setItem('isAdmin',result.data.isAdmin)
  }
  
  return result;
};

export const todoApi = createApi({
  reducerPath: "todo",
  baseQuery: baseQueryWithIntercepter,

  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => ({ url: "users", method: "GET" }),
      transformResponse: (response) => response.users,
    }),
    getStatusList: builder.query({
      query: () => ({ url: "task-status", method: "GET" }),
      transformResponse: (response) => response,
    }),    
    deleteStatus: builder.mutation({
      query: (id) => ({ url: `task-status?statusId=${id}`, method: "DELETE" }),
      transformResponse: (response) => response,
    }),
    updateStatusPriority: builder.mutation({
      query: (body) => ({ url: `task-status`, method: "Put", body:body }),
      transformResponse: (response) => response,
    }),
    getTasks: builder.mutation({
      query: (url) => ({ url: `${url}`, method: "GET" }),
      transformResponse: (response) => response,
    }),

  }),
});
export const { useGetUsersListQuery,useGetStatusListQuery,useDeleteStatusMutation,useUpdateStatusPriorityMutation,useGetTasksMutation } = todoApi;
