import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FontWithLabel } from './Header';

interface FontsProps {
  fonts: FontWithLabel[],
  optionCurrentFont: FontWithLabel | null,
  onSetCurrentFont: (value: string) => void
}

export const Fonts = ({ fonts, optionCurrentFont, onSetCurrentFont }: FontsProps) => {

  return (
    optionCurrentFont && (
      <>
        <Autocomplete
          blurOnSelect
          id="fonts-box"
          disableClearable
          isOptionEqualToValue={(option, value) => option.family === value.label}
          value={optionCurrentFont}
          options={fonts}
          sx={{ width: 200 }}
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
    )
  )
}

