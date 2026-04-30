import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: any | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

const getInitialState = (): UserState => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem('user')
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (user && accessToken) {
        return {
          user: JSON.parse(user),
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }
      }
    } catch (e) {}
  }
  return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: any; accessToken?: string; refreshToken?: string }>
    ) => {
      state.user = action.payload.user
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
