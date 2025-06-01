import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';

const NameStep = ({ data, setData }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [data.firstName, data.lastName]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h6" className="mb-4">What is your name?</Typography>
      <div className="flex flex-col gap-4">
        <TextField
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          error={error && !data.firstName}
          helperText={error && !data.firstName ? "Required" : ""}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          error={error && !data.lastName}
          helperText={error && !data.lastName ? "Required" : ""}
        />
      </div>
    </div>
  );
};

export default NameStep;
