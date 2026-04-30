import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setUser } from '@/entities/user/model/userSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).user.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && args.url !== '/auth/login' && args.url !== '/auth/refresh') {
    // refresh attempt
    const refreshToken = (api.getState() as any).user.refreshToken
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // update user state with new token
      api.dispatch(setUser(refreshResult.data as any))
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
