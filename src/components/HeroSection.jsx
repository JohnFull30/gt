import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const HeroSection = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h2" sx={{ marginBottom: '20px' }}>Welcome to GoTobago</Typography>
      <Button variant="contained" color="primary" sx={{ color: 'secondary.main' }}>
        Search
      </Button>
    </Box>
  );
};

export default HeroSection;
