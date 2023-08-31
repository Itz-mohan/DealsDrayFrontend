import React from 'react';

//Mui
import { FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InputField(props) {
  const {
    required,
    variant,
    type,
    id,
    label,
    placeholder,
    value,
    error,
    handleChange,
  } = props;

  const [isClicked, setISClicked] = React.useState(false);

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: '#FF4500' },
        },
      },
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TextField
          sx={
            isClicked
              ? {
                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                    {
                      display: 'none',
                    },
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                  },
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
                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                    {
                      display: 'none',
                    },
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                  },
                  background: '#F3F6FF',
                  borderRadius: '5px',
                  '& label': { color: '#999999' },
                  '& fieldset': { border: 'none' },
                }
          }
          fullWidth
          id={id}
          required={required}
          variant={variant}
          type={type}
          label={label}
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
          onClick={() => setISClicked(true)}
          onBlur={() => setISClicked(false)}
        />
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
