import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ py: 5, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/hero-placeholder.png`}
          alt="Island View"
          sx={{ width: '100%', borderRadius: 4, mb: 4 }}
        />

        <Typography variant="h3" gutterBottom align="center">
          About GoTobago
        </Typography>

        <Typography variant="body1" paragraph>
          GoTobago was founded with one simple mission: to connect travelers with authentic, comfortable, and seamless transportation and tour experiences on the beautiful island of Tobago.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          To provide reliable, stylish rentals and memorable island tours that help visitors explore Tobago with ease and confidence.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          We value authenticity, hospitality, and simplicity. Every touchpoint — from booking to drop-off — is designed with care.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          Born from a love for Tobago and the desire to make local travel effortless, GoTobago grew from a single car and a dream into an island-wide experience hub.
        </Typography>

        <Typography variant="h5" gutterBottom>
          A Note from Our Founder
        </Typography>
        <Typography variant="body1" paragraph>
          "Whether you're here for a weekend or a season, we want your time in Tobago to be unforgettable. We're locals who care — and we’re here to help you feel at home."
        </Typography>
      </Container>
    </Box>
  );
}
