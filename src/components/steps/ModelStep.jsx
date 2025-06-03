import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import axios from 'axios';

const ModelStep = ({ vehicleType, vehicleModel, setVehicleModel, onNext, onBack }) => {
  const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log('hello');
    

  useEffect(() => {
      const fetchModels = async () => {
        console.log(vehicleType?.id);
        
        if (vehicleType?.id) {
          
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/vehicle-models?typeId=${vehicleType.id}`);
            console.log(response);
          setModels(response.data);
        } catch (err) {
          console.error('Failed to fetch vehicle models:', err);
        }
        setLoading(false);
      }
    };

    fetchModels();
  }, [vehicleType]);

  const handleChange = (e) => {
    const selectedModel = models.find(m => m.id === e.target.value);
    setVehicleModel(selectedModel);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">Select Vehicle Model</Typography>

      <FormControl fullWidth>
        <InputLabel>Vehicle Model</InputLabel>
        <Select
          value={vehicleModel?.id || ''}
          label="Vehicle Model"
          onChange={handleChange}
          disabled={loading || models.length === 0}
        >
          {models.map((model) => (
            <MenuItem key={model.id} value={model.id}>
              {model.model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={2}>
        <Button onClick={onBack} variant="outlined" sx={{ mr: 2 }}>
          Back
        </Button>
        <Button onClick={onNext} variant="contained" disabled={!vehicleModel}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ModelStep;
