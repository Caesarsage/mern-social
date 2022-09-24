import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export const Input = ({half, multiline, required, name, handleChange, autoFocus, label,type,handleShowPassword, value}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        multiline={multiline}
        variant="outlined"
        required={required}
        fullWidth
        label={label}
        value={value}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}
