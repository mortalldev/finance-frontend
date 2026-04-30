import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setUser } from '@/entities/user/model/userSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL, // ← .env.local ga qo'shing
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).user?.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && args.url !== '/auth/login' && args.url !== '/auth/refresh') {
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const data = refreshResult.data as any

      // ← Yangi tokenni store ga va localStorage ga saqlash
      api.dispatch(
        setUser({
          user: (api.getState() as any).user.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      )

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
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
