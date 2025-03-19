import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const CarCard = ({ image, name, price, description }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia component="img" height="200" image={image} alt={name} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
          From ${price}/day
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Rent Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default CarCard;
