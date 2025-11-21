import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from '../components/SearchBar'
import AnimeCard from '../components/AnimeCard'
import PaginationControl from '../components/PaginationControl'
import { RootState, AppDispatch } from '../redux/store'
import { setQuery, setPage, fetchSearch } from '../redux/slices/searchSlice'

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { query, results, page, totalPages, loading, error } = useSelector((s: RootState) => s.search)

  // local input state to debounce
  const [localQuery, setLocalQuery] = useState(query)

  // debounce 250ms
  useEffect(() => {
    const t = setTimeout(() => {
      // update redux query and trigger search
      dispatch(setQuery(localQuery))
      dispatch(fetchSearch({ query: localQuery, page: 1 }))
    }, 250)
    return () => clearTimeout(t)
  }, [localQuery])

  // when page changes, fetch
  useEffect(() => {
    dispatch(fetchSearch({ query, page }))
  }, [page])

  return (
    <Box>
      <SearchBar value={localQuery} onChange={setLocalQuery} />

      <Box sx={{ mt: 3 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Typography color="error">{(error as any) || 'Error'}</Typography>}

        {!loading && results.length === 0 && (
          <Typography variant="body1">No results. Try searching for "naruto" or "one piece".</Typography>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {results.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r.mal_id}>
              <Link to={`/anime/${r.mal_id}`}>
                <AnimeCard anime={r} />
              </Link>
            </Grid>
          ))}
        </Grid>

        <PaginationControl
          page={page}
          totalPages={totalPages}
          onChange={(p) => dispatch(setPage(p))}
        />
      </Box>
    </Box>
  )
}

export default SearchPage
