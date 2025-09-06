import {apiSlice} from './apiSlice';

const TASKS_URL='/api/tasks';
export const taskApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getTasks:builder.query({
            query:()=>TASKS_URL,
            providesTags:["Tasks"]
        }),
        getTask:builder.query({
            query:(id)=>`${TASKS_URL}/${id}`,
            providesTags:["Tasks"]
        }),
        addTask:builder.mutation({
            query:(data)=>({
                url:TASKS_URL,
                method:'POST',
                body:data,
            }),
            invalidatesTags:["Tasks"],
        }),
        updateTask:builder.mutation({
            query:({id,...data})=>({
                url:`${TASKS_URL}/${id}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:["Tasks"],
        }),
        deleteTask:builder.mutation({
            query:(id)=>({
                url:`${TASKS_URL}/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:["Tasks"],
        })
    })
})
export const {useGetTasksQuery,useGetTaskQuery,useAddTaskMutation,useUpdateTaskMutation,useDeleteTaskMutation}=taskApiSlice;
