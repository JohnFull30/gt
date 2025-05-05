import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        🎉 Booking Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Thanks for your order. A confirmation email with all the details is on its way to your inbox.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ px: 4, py: 1.5, borderRadius: '30px', fontWeight: 'bold' }}
      >
        Back to Home
      </Button>
    </Container>
  );
}
