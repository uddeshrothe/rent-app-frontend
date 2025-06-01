import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import NameStep from './components/steps/NameStep';
import WheelStep from './components/steps/WheelStep';
import TypeStep from './components/steps/TypeStep';
import ModelStep from './components/steps/ModelStep';
import DateStep from './components/steps/DateStep';
import axios from './api/axios';

const steps = ['Name', 'Wheels', 'Type', 'Model', 'Dates'];

const App = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleId: '',
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(false);

  const currentStepComponent = () => {
    switch (step) {
      case 0: return <NameStep data={data} setData={setData} />;
      case 1: return <WheelStep data={data} setData={setData} />;
      case 2: return <TypeStep data={data} setData={setData} />;
      case 3: return <ModelStep data={data} setData={setData} />;
      case 4: return <DateStep data={data} setData={setData} />;
      default: return null;
    }
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 0:
        return data.firstName && data.lastName;
      case 1:
        return data.wheels;
      case 2:
        return data.vehicleType;
      case 3:
        return data.vehicleId;
      case 4:
        return data.startDate && data.endDate;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      setError(true);
      return;
    }
    setError(false);

    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        vehicleId: data.vehicleId,
        startDate: data.startDate,
        endDate: data.endDate
      };
      await axios.post('/bookings', payload);
      alert('Booking successful!');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="shadow-lg rounded-2xl p-6 bg-white">
        <Typography variant="h5" className="mb-4 text-center">{steps[step]}</Typography>
        {currentStepComponent()}
        {error && (
          <Typography color="error" className="mt-2 text-sm">
            Please complete this step before continuing.
          </Typography>
        )}
        <Box className="flex justify-between mt-6">
          <Button variant="outlined" disabled={step === 0} onClick={handleBack}>Back</Button>
          <Button variant="contained" onClick={handleNext}>
            {step === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
