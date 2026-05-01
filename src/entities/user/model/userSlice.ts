import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: any | null
  isAuthenticated: boolean
}

const getInitialState = (): UserState => {
  return { user: null, isAuthenticated: false }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user
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
