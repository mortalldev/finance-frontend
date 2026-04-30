import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: any | null
  isAuthenticated: boolean
}

const getInitialState = (): UserState => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!user,
    }
  }
  return { user: null, isAuthenticated: false }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
