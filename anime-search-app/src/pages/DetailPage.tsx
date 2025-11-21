import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnimeDetail } from '../redux/slices/animeSlice'
import { RootState, AppDispatch } from '../redux/store'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

const DetailPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((s: RootState) => s.anime)

  useEffect(() => {
    if (id) dispatch(fetchAnimeDetail(id))
  }, [id])

  return (
    <Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {data && (
        <Box>
          <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
            <img src={data.images?.jpg?.image_url} alt={data.title} style={{ width: 220, borderRadius: 8 }} />
            <Box>
              <Typography variant="h4">{data.title}</Typography>
              <Typography variant="subtitle1">{data.type} — {data.episodes ?? 'N/A'} eps</Typography>
              <Typography variant="subtitle2">Score: {data.score ?? 'N/A'}</Typography>
              <Box sx={{ mt: 1 }}>
                {(data.genres || []).map((g) => (
                  <Chip key={g.name} label={g.name} sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
              {data.trailer?.url && (
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" component="a" href={data.trailer.url} target="_blank">Watch Trailer</Button>
                </Box>
              )}
            </Box>
          </Box>

          <Typography variant="h6">Synopsis</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{data.synopsis}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default DetailPage
