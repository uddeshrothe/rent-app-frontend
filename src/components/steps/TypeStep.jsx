// src/components/steps/TypeStep.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const TypeStep = ({ wheels, vehicleType, setVehicleType, onNext, onBack }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/vehicle-types?wheels=${wheels}`
        );
        setTypes(response.data);
      } catch (err) {
        console.error("Error fetching vehicle types:", err);
      } finally {
        setLoading(false);
      }
    };

    if (wheels) {
      fetchVehicleTypes();
    }
  }, [wheels]);

  const handleChange = (event) => {
    const selected = types.find((t) => t.name === event.target.value);
    setVehicleType(selected);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">Select Vehicle Type</Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">Available Types</FormLabel>
          <RadioGroup value={vehicleType?.name || ''} onChange={handleChange}>
            {types.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.name}
                control={<Radio />}
                label={type.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}

      <Box mt={2}>
        <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext} disabled={!vehicleType}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TypeStep;
