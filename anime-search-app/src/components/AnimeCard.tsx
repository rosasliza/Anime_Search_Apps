import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { AnimeSummary } from '../types/anime'

const AnimeCard: React.FC<{ anime: AnimeSummary }> = ({ anime }) => {
  const img = anime.images?.jpg?.image_url
  return (
    <Card sx={{ display: 'flex', height: 140 }}>
      {img && (
        <CardMedia component="img" sx={{ width: 100 }} image={img} alt={anime.title} />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography variant="subtitle1" noWrap>{anime.title}</Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {anime.synopsis}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default AnimeCard
