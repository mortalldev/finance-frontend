import { Middleware } from '@reduxjs/toolkit'

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState() as any
  if (typeof window !== 'undefined') {
    if (state.user.isAuthenticated && state.user.user) {
      localStorage.setItem('user', JSON.stringify(state.user.user))
      localStorage.setItem('accessToken', state.user.accessToken)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    }
  }
  return result
}
