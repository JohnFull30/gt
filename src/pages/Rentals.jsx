import React from 'react';
import { Container, Grid2, Box, Typography } from '@mui/material';
import CarCard from '../components/CarCard';

const carsData = [
  {
    name: "Toyota Corolla",
    description: "Comfortable and fuel-efficient sedan.",
    image: `${process.env.PUBLIC_URL}/assets/toyota-corolla.png`, 
    price: "50"
  },
  {
    name: "Jeep Wrangler",
    description: "Perfect for off-road adventures!",
    image: `${process.env.PUBLIC_URL}/assets/jeep-wrangler.png`, 
    price: "100"
  },
  {
    name: "Tesla Model 3",
    description: "Eco-friendly and fast electric car.",
    image: `${process.env.PUBLIC_URL}/assets/tesla-model3.png`, 
    price: "199"
  }
];

export default function RentalsPage() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container sx={{ py: 5 }}>
        <Grid2 container spacing={4} justifyContent="center">
          {carsData.map((car, index) => (
            <Grid2 item key={index} xs={12} sm={6} md={4}>
              <CarCard {...car} />
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold' }}>
          🚧 Coming Soon
        </Typography>
      </Box>
    </Box>
  );
}
