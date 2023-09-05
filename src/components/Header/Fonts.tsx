import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FontWithLabel } from './Header';
import { ErrorT } from '../../types';
import { Typography } from '@mui/material';

interface FontsProps {
  fonts: FontWithLabel[],
  error: ErrorT | null
  optionCurrentFont: FontWithLabel | null,
  onSetCurrentFont: (value: string) => void
}

export const Fonts: React.FC<FontsProps> = ({ fonts, optionCurrentFont, onSetCurrentFont, error }) => {

  return (
    !error && optionCurrentFont ? (
      <>
        <Autocomplete
          id="fonts-box"
          disableClearable
          isOptionEqualToValue={(option, value) => option.family === value.label}
          value={optionCurrentFont}
          options={fonts}
          sx={{ width: '100%' }}
          onChange={(_, newValue) => onSetCurrentFont(newValue.family)}
          renderInput={(params) => <TextField  {...params} label="Font" />}
        />

        <style>
          {`${optionCurrentFont.family ? (` @import url('https://fonts.googleapis.com/css2?family=${optionCurrentFont.family}&display=swap');
            :root {
              --default-font-family: '${optionCurrentFont.family}', sans-serif
            };`) : ''}`
          }
        </style>
      </>
    ) : <Typography color={'error'}>{error}</Typography>
  )
}

