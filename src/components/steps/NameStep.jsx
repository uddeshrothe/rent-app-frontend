// src/components/steps/NameStep.jsx
import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';

const NameStep = ({ firstName, lastName, setFirstName, setLastName, onNext }) => {
  const isValid = firstName.trim() !== '' && lastName.trim() !== '';

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">Enter Your Name</Typography>

      <TextField
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
      />

      <TextField
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
      />

      <Box mt={2}>
        <Button variant="contained" onClick={onNext} disabled={!isValid}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default NameStep;
