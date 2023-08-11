import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../interfaces/auth'
import { pause } from '../components/pause'

const authApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
       baseUrl: import.meta.env.VITE_API_URL,
       fetchFn: async (...args) => {
        await pause(1000)
        return fetch(...args)
       } 
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => `/users`
        }),
        removeUser: builder.mutation<void, number>({
            query: (id) => `/users/${id}`
        })
    })
})

export const { useGetUsersQuery, useRemoveUserMutation } = authApi;
export const authReducer = authApi.reducer;
export default authApi