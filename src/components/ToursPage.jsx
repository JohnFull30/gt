// src/components/ToursPage.jsx
import React from 'react';
import { Container, Grid2, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

const toursData = [
  {
    title: "Port of Spain & Fort George Sightseeing",
    description: "Explore Port of Spain with panoramic views from historic Fort George.",
    image: `${process.env.PUBLIC_URL}/assets/tour-placeholder.png`, // placeholder path
    price: "US$52"
  },
  {
    title: "Gasparee Caves & Islands Cruise Combo",
    description: "Discover stunning caves and cruise around breathtaking islands. Hi mom!!",
    image: `${process.env.PUBLIC_URL}/assets/tour-placeholder.png`, // placeholder path
    price: "US$75"
  },
  {
    title: "Protected Tour re VL",
    description: "Additional payment details available upon booking.",
    image: `${process.env.PUBLIC_URL}/assets/tour-placeholder.png`, // placeholder path
    price: "US$48"
  }
];

export default function ToursPage() {
  console.log("ToursPage Component Rendered"); // Debugging step

  return (
    <Container sx={{ py: 5 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Tours and Experiences
        </Typography>
        <Grid2 container spacing={4} justifyContent="center">
          {toursData.map((tour, index) => (
            <Grid2 item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={tour.image}
                  alt={tour.title}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {tour.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                    From {tour.price}
                  </Typography>
                  <Button variant="contained" component={Link} to="/rentalForm" color="primary" sx={{ mt: 2 }}>
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}
