import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
} from '@mui/material';

const TypeStep = ({ data, setData }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data.wheels) return;

    const fetchTypes = async () => {
      try {
        const response = await axios.get(`/vehicle-types?wheels=${data.wheels}`);
        setTypes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching types:', err);
        setLoading(false);
      }
    };

    fetchTypes();
  }, [data.wheels]);

  const handleChange = (e) => {
    setData({ ...data, vehicleType: e.target.value, vehicleId: '' }); // reset model
  };

  return (
    <div>
      <Typography variant="h6" className="mb-4">Select vehicle type</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">Vehicle Types</FormLabel>
          <RadioGroup value={data.vehicleType} onChange={handleChange}>
            {types.map((type) => (
              <FormControlLabel key={type.id} value={type.id.toString()} control={<Radio />} label={type.name} />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </div>
  );
};

export default TypeStep;
