import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';

export default function RadioField(props) {
  const { row, label, value, error, handleChange, options } = props;

  return (
    <FormControl>
      <FormLabel
        id='demo-row-radio-buttons-group-label'
        style={{ color: 'grey' }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={'male'}
          control={<Radio checked={value === 'male' ? true : false} />}
          label={'Male'}
        />
        <FormControlLabel
          value={'female'}
          control={<Radio checked={value === 'female' ? true : false} />}
          label={'Female'}
        />
      </RadioGroup>
      {error && (
        <Typography
          variant='body2'
          color='textSecondary'
          style={{ fontSize: '12px', color: '#FF4500', marginTop: 5 }}
        >
          {error}
        </Typography>
      )}
    </FormControl>
  );
}
