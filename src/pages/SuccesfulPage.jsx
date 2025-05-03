// src/pages/SuccessPage.jsx
import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <Box sx={{ pt: 12, minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Payment Successful 🎉
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Thank you for booking with GoTobago! A confirmation email has been sent to you.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          If you have any questions or need to make changes to your booking, feel free to contact us.
        </Typography>

        <Button variant="contained" component={Link} to="/" sx={{ mr: 2 }}>
          Return to Home
        </Button>
        <Button variant="outlined" component={Link} to="/about">
          About GoTobago
        </Button>
      </Container>
    </Box>
  );
}
