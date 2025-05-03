// src/pages/Cancel.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <Box sx={{ pt: 10, px: 3, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        😕 Payment Canceled
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        No worries! Your booking was not completed. Feel free to review the details and try again when you're ready.
      </Typography>
      <Button variant="contained" component={Link} to="/rentalForm" sx={{ mr: 2 }}>
        Try Again
      </Button>
      <Button variant="outlined" component={Link} to="/">
        Return Home
      </Button>
    </Box>
  );
};

export default Cancel;
