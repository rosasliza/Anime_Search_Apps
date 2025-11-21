import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAnimeDetail } from '../../api/animeApi'
import type { AnimeDetail } from '../../types/anime'

interface AnimeState {
  data: AnimeDetail | null
  loading: boolean
  error: string | null
}

const initialState: AnimeState = {
  data: null,
  loading: false,
  error: null,
}

let detailController: AbortController | null = null

export const fetchAnimeDetail = createAsyncThunk(
  'anime/fetchDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      if (detailController) detailController.abort()
      detailController = new AbortController()
      const data = await getAnimeDetail(id, detailController.signal)
      return data.data
    } catch (err: any) {
      if (err.name === 'AbortError') return rejectWithValue({ cancelled: true })
      return rejectWithValue({ message: err.message || 'Unknown error' })
    }
  }
)

const slice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload as AnimeDetail
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false
        const payload = action.payload as any
        if (!payload?.cancelled) state.error = payload?.message || 'Failed to fetch detail'
      })
  }
})

export default slice.reducer
