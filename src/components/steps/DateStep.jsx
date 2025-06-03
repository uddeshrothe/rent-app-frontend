// src/components/steps/DateStep.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { DateRange } from 'react-date-range';
import { enUS } from 'date-fns/locale'; 

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateStep = ({ dateRange, setDateRange, onNext, onBack }) => {
  const [range, setRange] = useState([
    {
      startDate: dateRange[0] ? new Date(dateRange[0]) : new Date(),
      endDate: dateRange[1] ? new Date(dateRange[1]) : new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    setDateRange([ranges.selection.startDate, ranges.selection.endDate]);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6">Select Booking Dates</Typography>

      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={range}
        locale={enUS}
      />

      <Box mt={2}>
        <Button variant="outlined" onClick={onBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!dateRange[0] || !dateRange[1]}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DateStep;
