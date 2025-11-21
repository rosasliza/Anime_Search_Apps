import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { searchAnime } from '../../api/animeApi'
import type { AnimeSummary } from '../../types/anime'
import type { RootState } from '../store'

interface SearchState {
  query: string
  results: AnimeSummary[]
  page: number
  totalPages: number
  loading: boolean
  error: string | null
}

const initialState: SearchState = {
  query: '',
  results: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
}

let currentController: AbortController | null = null

export const fetchSearch = createAsyncThunk(
  'search/fetch',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      if (currentController) {
        currentController.abort()
      }
      currentController = new AbortController()
      const data = await searchAnime(query, page, currentController.signal)
      return { data, query }
    } catch (err: any) {
      if (err.name === 'AbortError') return rejectWithValue({ cancelled: true })
      return rejectWithValue({ message: err.message || 'Unknown error' })
    }
  }
)

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    clearResults(state) {
      state.results = []
      state.totalPages = 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        const payload = action.payload as any
        state.loading = false
        state.results = payload.data.data || []
        state.totalPages = payload.data.pagination?.last_visible_page || 1
        state.query = payload.query
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false
        const payload = action.payload as any
        if (payload?.cancelled) {
          // suppression on cancel
        } else {
          state.error = payload?.message || 'Failed to fetch'
        }
      })
  }
})

export const { setQuery, setPage, clearResults } = slice.actions
export default slice.reducer
