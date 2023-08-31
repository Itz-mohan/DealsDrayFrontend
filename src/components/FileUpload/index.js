import React from 'react';

//Mui
import {
  FormControl,
  FormLabel,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function UploadField(props) {
  const {
    required,
    variant,
    type,
    id,
    label,
    accept,
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
        <FormLabel
          id='demo-row-radio-buttons-group-label'
          style={{ color: 'grey' }}
        >
          {label}
        </FormLabel>
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
          required={required}
          id={id}
          variant={variant}
          type={type}
          //   value={value || ''}
          accept={accept}
          onChange={handleChange}
        />
        {value && (
          <Typography
            variant='body2'
            color='textSecondary'
            style={{ fontSize: '12px', color: '#FF4500', marginTop: 5 }}
          >
            {`* ${value}`}
          </Typography>
        )}
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
