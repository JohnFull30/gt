import React from 'react';
import { Container, Typography, Box, Divider, Button, Link } from '@mui/material';
import { useParams } from 'react-router-dom';

// TODO: Ask Curvin about adding stings ray viewing, and/or switching one thing for it. Would that cost more becuase it's further
// TODO: also ask general opinion about this. Does he know of better waterfalls

const getTourContent = (tourId) => {
    switch (tourId) {
        case 'essence': 
            return {
                title: "Essence of Tobago",
                about: [
                  {
                    title: "Fort King George",
                    content: "Enjoy stunning views of Scarborough and the Atlantic Ocean from this well-preserved fort, complete with cannons and a small museum showcasing Tobago’s history."
                  },
                  {
                    title: "Argyle Waterfall",
                    content: "Take a short walk through lush rainforest to Tobago’s highest waterfall. The multi-tiered cascade is perfect for photo ops and a refreshing dip."
                  },
                  {
                    title: "Tobago Cocoa Estate",
                    content: "Experience Tobago’s chocolate-making process from bean to bar. Learn about traditional cocoa cultivation and sample locally produced chocolate."
                  },
                  {
                    title: "Speyside Lookout",
                    content: "Marvel at panoramic views of the Atlantic coast and offshore islands like Little Tobago and Goat Island. A great photo stop."
                  },
                  {
                    title: "Lunch Stop (Optional)",
                    content: "An optional lunch break at a local restaurant can be arranged upon request (not included in tour price)."
                  }
                ]
            };
        case 'real':
            return {
                about: [
                    { title: "Visit a farm", content: "TBD along lines of visit local farm where you can get products that will be cooked in meal later?" },
                    { title: "Have dinner with a real family", content: "TBD along lines of eating at someones home with quality and local ingredients from nearby farms and producers" }
            ]
        };
        default:
            return null;
    }
}


const TourDetails = () => {
    const { id } = useParams();
    const tour = getTourContent(id);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button variant="contained" component={Link} to="/rentalForm" color="primary" sx={{ float: 'inline-end', mt: 2 }}>
        Book Now
        </Button>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {tour.title}
      </Typography>


      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6 }}>
      A curated half-day experience that captures the heart and beauty of Tobago
      <div>$90</div>
      </Typography>


      {tour.about.map((section, index) => (
        <Box key={index} sx={{ mb: 5 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {section.content}
          </Typography>
          {index < tour.about.length - 1 && (
            <Divider sx={{ my: 4 }} />
          )}
        </Box>
      ))}
    </Container>
  );
};

export default TourDetails;
