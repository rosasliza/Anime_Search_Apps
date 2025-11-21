import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import animeReducer from './slices/animeSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    anime: animeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
