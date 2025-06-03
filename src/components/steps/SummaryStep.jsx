import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

const SummaryStep = ({
  firstName,
  lastName,
  wheels,
  vehicleType,
  vehicleModel,
  dateRange,
  onBack,
  onReset,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const payload = {
        firstName,
        lastName,
        wheels,
        VehicleTypeId: vehicleType?.id,   // Send ID here
        VehicleId: vehicleModel?.id,      // Send ID here
        startDate: dateRange[0],
        endDate: dateRange[1],
      };

      await axios.post('http://localhost:4000/api/bookings', payload);
      setSuccessMsg('Booking successful!');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to book the vehicle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h5">Booking Summary</Typography>
      <Box>
        <Typography><strong>Name:</strong> {firstName} {lastName}</Typography>
        <Typography><strong>Number of Wheels:</strong> {wheels}</Typography>
        <Typography><strong>Vehicle Type:</strong> {vehicleType?.name || ''}</Typography>
        <Typography><strong>Vehicle Model:</strong> {vehicleModel?.model || ''}</Typography>
        <Typography><strong>Start Date:</strong> {new Date(dateRange[0]).toDateString()}</Typography>
        <Typography><strong>End Date:</strong> {new Date(dateRange[1]).toDateString()}</Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {successMsg && <Typography color="primary">{successMsg}</Typography>}

      <Box mt={2}>
        <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || successMsg}
        >
          {loading ? 'Submitting...' : 'Confirm & Submit'}
        </Button>
      </Box>

      {successMsg && (
        <Button variant="text" onClick={onReset} sx={{ mt: 2 }}>
          Make Another Booking
        </Button>
      )}
    </Box>
  );
};

export default SummaryStep;
