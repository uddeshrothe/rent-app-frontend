import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

const WheelStep = ({ data, setData }) => {
  const handleChange = (e) => {
    setData({ ...data, wheels: e.target.value, vehicleType: '', vehicleId: '' }); // Reset types on change
  };

  return (
    <div>
      <Typography variant="h6" className="mb-4">Number of wheels?</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose</FormLabel>
        <RadioGroup row value={data.wheels} onChange={handleChange}>
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default WheelStep;
