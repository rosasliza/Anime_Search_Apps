import React from 'react'
import TextField from '@mui/material/TextField'

interface Props {
  value: string
  onChange: (v: string) => void
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search anime..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ 'aria-label': 'search-anime' }}
    />
  )
}

export default SearchBar
