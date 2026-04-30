import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setUser } from '@/entities/user/model/userSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  credentials: 'include',
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && args.url !== '/auth/login' && args.url !== '/auth/refresh') {
    // refresh attempt
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // success, retry original request
      result = await baseQuery(args, api, extraOptions)
    } else {
      // fail, logout
      api.dispatch(logout())
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
  }

  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Xarajat', 'User'],
  endpoints: () => ({}),
})
