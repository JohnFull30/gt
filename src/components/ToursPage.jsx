// src/components/ToursPage.jsx
import React from 'react';
import { Container, Grid2, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

const toursData = [
  {
    id: 'essence',
    title: "Essence of Tobago",
    description: "Experience Tobago like never before on a breathtaking driving tour with curated stops at the island’s most iconic gems",
    image: `${process.env.PUBLIC_URL}/assets/tour-placeholder.png`, // placeholder path
    price: "US$90"
  },
  {
    id: "real",
    title: "Get Real with Tobago",
    description: "Discover stunning caves and cruise around breathtaking islands. Hi mom!!",
    image: `${process.env.PUBLIC_URL}/assets/tour-placeholder.png`, // placeholder path
    price: "US$75"
  },
  {
    id: "essence",
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
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
                    {tour.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {tour.price}
                  </Typography>
                  <Button variant="contained" component={Link} to={`/tours/${tour.id}`} color="secondary" sx={{ m: 2 }}>
                    View Details
                  </Button>
                  <Button variant="contained" component={Link} to="/rentalForm" color="primary" sx={{ m: 2 }}>
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
