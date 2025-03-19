import React from 'react';
import { Container, Grid2 } from '@mui/material';
import CarCard from '../components/CarCard';

const carsData = [
  {
    name: "Toyota Corolla",
    description: "Comfortable and fuel-efficient sedan.",
    image: "/assets/toyota-corolla.jpg", // Replace with actual image
    price: "45"
  },
  {
    name: "Jeep Wrangler",
    description: "Perfect for off-road adventures!",
    image: "/assets/jeep-wrangler.jpg",
    price: "85"
  },
  {
    name: "Tesla Model 3",
    description: "Eco-friendly and fast electric car.",
    image: "/assets/tesla-model3.jpg",
    price: "120"
  }
];

export default function RentalsPage() {
  return (
    <Container sx={{ py: 5 }}>
      <Grid2 container spacing={4} justifyContent="center">
        {carsData.map((car, index) => (
          <Grid2 item key={index} xs={12} sm={6} md={4}>
            <CarCard {...car} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
