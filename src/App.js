import React, { useState } from 'react';
import NameStep from './components/steps/NameStep';
import WheelStep from './components/steps/WheelStep';
import TypeStep from './components/steps/TypeStep';
import ModelStep from './components/steps/ModelStep';
import DateStep from './components/steps/DateStep';
import SummaryStep from './components/steps/SummaryStep';

import { Container, Box, Paper } from '@mui/material';

function App() {
  const [step, setStep] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wheels, setWheels] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const resetForm = () => {
    setStep(0);
    setFirstName('');
    setLastName('');
    setWheels('');
    setVehicleType('');
    setVehicleModel('');
    setDateRange([null, null]);
  };

  const steps = [
    <NameStep
      firstName={firstName}
      lastName={lastName}
      setFirstName={setFirstName}
      setLastName={setLastName}
      onNext={() => setStep(step + 1)}
    />,
    <WheelStep
      wheels={wheels}
      setWheels={setWheels}
      onNext={() => setStep(step + 1)}
      onBack={() => setStep(step - 1)}
    />,
    <TypeStep
      wheels={wheels}
      vehicleType={vehicleType}
      setVehicleType={setVehicleType}
      onNext={() => setStep(step + 1)}
      onBack={() => setStep(step - 1)}
    />,
    <ModelStep
      vehicleType={vehicleType}
      vehicleModel={vehicleModel}
      setVehicleModel={setVehicleModel}
      onNext={() => setStep(step + 1)}
      onBack={() => setStep(step - 1)}
    />,
    <DateStep
      dateRange={dateRange}
      setDateRange={setDateRange}
      onNext={() => setStep(step + 1)}
      onBack={() => setStep(step - 1)}
    />,
    <SummaryStep
      firstName={firstName}
      lastName={lastName}
      wheels={wheels}
      vehicleType={vehicleType}
      vehicleModel={vehicleModel}
      dateRange={dateRange}
      onBack={() => setStep(step - 1)}
      onReset={resetForm}
    />,
  ];

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          {steps[step]}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
