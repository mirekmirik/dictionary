import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FontWithLabel } from './Header';
import { Font } from '../../types';
import { setFont } from '../../store/header/fonts/fonts-slice';

interface FontsProps {
  fonts: FontWithLabel[],
  optionCurrentFont: FontWithLabel,
  onSetCurrentFont: (value: string) => void
}

export const Fonts = ({ fonts, optionCurrentFont, onSetCurrentFont }: FontsProps) => {

  console.log(optionCurrentFont)

  return (
    <>
      <div>Fonts</div>
      <Autocomplete
        blurOnSelect
        id="fonts-box"
        isOptionEqualToValue={(option, value) => option.family === value.label}
        value={optionCurrentFont}
        options={fonts}
        sx={{ width: 300 }}
        onChange={(_, newValue) => newValue ? onSetCurrentFont(newValue.family) : ''}
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
}
