// src/components/steps/WheelStep.jsx
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

const WheelStep = ({ wheels, setWheels, onNext, onBack }) => {
  const handleChange = (event) => {
    setWheels(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">Select Number of Wheels</Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Choose Wheels</FormLabel>
        <RadioGroup value={wheels} onChange={handleChange} row>
          <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
        </RadioGroup>
      </FormControl>

      <Box mt={2}>
        <Button onClick={onBack} variant="outlined" sx={{ mr: 2 }}>
          Back
        </Button>
        <Button onClick={onNext} variant="contained" disabled={!wheels}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default WheelStep;
