import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, FormLabel, RadioGroup, Typography } from '@mui/material';

export default function CheckboxField(props) {
  const { label, value, error, checked, handleChange, options } = props;

  const handleOnClick = (item) => {
    handleChange(item);
  };

  return (
    <FormControl>
      <FormLabel
        id='demo-row-radio-buttons-group-label'
        style={{ color: 'grey' }}
      >
        {label}
      </FormLabel>
      <FormGroup row={true}>
        <FormControlLabel
          control={
            <Checkbox
              checked={value === 'mca' ? true : false}
              onClick={() => handleOnClick('mca')}
            />
          }
          label='MCA'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={value === 'bca' ? true : false}
              onClick={() => handleOnClick('bca')}
            />
          }
          label='BCA'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={value === 'bsc' ? true : false}
              onClick={() => handleOnClick('bsc')}
            />
          }
          label='BSC'
        />
      </FormGroup>
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
