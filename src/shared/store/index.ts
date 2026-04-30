import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/entities/user/model/userSlice'
import { api } from '../api/baseApi'
import { localStorageMiddleware } from './middleware'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
