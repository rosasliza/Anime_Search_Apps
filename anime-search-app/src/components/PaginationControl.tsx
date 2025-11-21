import React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

interface Props {
  page: number
  totalPages: number
  onChange: (p: number) => void
}

const PaginationControl: React.FC<Props> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null
  return (
    <Stack spacing={2} alignItems="center" sx={{ my: 3 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onChange(value)}
        showFirstButton
        showLastButton
      />
    </Stack>
  )
}

export default PaginationControl
