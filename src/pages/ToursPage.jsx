// src/components/ToursPage.jsx
import React from 'react';
import { Container, Grid2, Card, CardActionArea, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

// src/components/ToursPage.jsx
const toursData = [
  {
    id: 'beach',
    title: 'Tobago Beach Escape',
    description: `Lime by the sea on a scenic coastal drive, unwind on soft sands & tuck into a tasty seaside lunch.`,
    image: `${process.env.PUBLIC_URL}/assets/tour-beach.jpg`,
    price: 'US$85',
  },
  {
    id: 'glass-boat',
    title: 'Exclusive Glass-Bottom Boat',
    description: `Charter your own glass-bottom boat, jet-ski optional, with cold refreshments & island bites at a hidden cove.`,
    image: `${process.env.PUBLIC_URL}/assets/tour-boat.jpg`,
    price: 'US$120',
  },
  {
    id: 'waterfall-stingray',
    title: 'Waterfall & Stingray Safari',
    description: `Cool off under cascading falls, then feed stingrays & fish off the pier in turquoise shallows.`,
    image: `${process.env.PUBLIC_URL}/assets/tour-waterfall.jpg`,
    price: 'US$110',
  },
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
              <CardActionArea component={Link} to={`/tours/${tour.id}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={tour.image}
                  alt={tour.title}
                  sx={{ objectFit: "cover" }} // Ensures the image fills the thumbnail while maintaining aspect ratio
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
                </CardActionArea>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}
