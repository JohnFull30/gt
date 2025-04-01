import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        paddingTop: '64px', // <-- this is key to prevent the content from being hidden behind the navbarss
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.2), 
            rgba(0, 0, 0, 0.2)
          ), 
          url(${process.env.PUBLIC_URL}/assets/hero-background.jpg)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
        An Amazing Place2
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4, maxWidth: 600 }}>
        Discover Tobago’s top car rentals and unforgettable tours all in one spot.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/tours"
        sx={{ px: 4, py: 1.5, borderRadius: '30px', fontWeight: 'bold' }}
      >
        Start Exploring
      </Button>
    </Box>
  );
};

export default HeroSection;
