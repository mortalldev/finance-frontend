import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: any | null
  accessToken: string | null
  isAuthenticated: boolean
}

const getInitialState = (): UserState => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')
    return {
      user: user ? JSON.parse(user) : null,
      accessToken: token || null,
      isAuthenticated: !!token,
    }
  }
  return { user: null, accessToken: null, isAuthenticated: false }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any; accessToken?: string }>) => {
      state.user = action.payload.user
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken
      }
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
