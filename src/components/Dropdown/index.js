import React from 'react';

//Mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function SelectField(props) {
  const { required, label, value, error, handleChange, options } = props;

  const [isClicked, setISClicked] = React.useState(false);

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: '#FF4500' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#999999',
            '&.Mui-focused': {
              backgroundColor: '#fff',
            },
          },
        },
      },
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TextField
          select
          fullWidth
          sx={
            isClicked
              ? {
                  background: '#F3F6FF',
                  borderRadius: '5px',
                  '& label.Mui-focused': {
                    color: '#999999',
                  },
                  '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                      borderColor: '#6C7BA8',
                    },
                }
              : {
                  background: '#F3F6FF',
                  borderRadius: '5px',
                  '& label': { color: '#999999' },
                  '& fieldset': { border: 'none' },
                }
          }
          required={required}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label={label}
          value={value}
          onChange={handleChange}
          onClick={() => setISClicked(true)}
          onBlur={() => setISClicked(false)}
        >
          {options && options.length > 0 ? (
            options?.map((data, i) => {
              return (
                <MenuItem key={i} value={data.value} sx={{ fontSize: 14 }}>
                  {data.label}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem sx={{ fontSize: 14 }}>No options</MenuItem>
          )}
        </TextField>
        {error && (
          <Typography
            variant='body2'
            color='textSecondary'
            style={{ fontSize: '12px', color: '#FF4500', marginTop: 5 }}
          >
            {error}
          </Typography>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
}
