import React from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  ImageList,
  ImageListItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';

// Each tour now has an array of images and an itinerary
const getTourContent = (tourId) => {
  switch (tourId) {
    case 'beach':
      return {
        title: 'Tobago Beach Escape',
        images: [
          `${process.env.PUBLIC_URL}/assets/tour-beach.jpg`,
        ],
        itinerary: [
          { duration: '30 mins', activity: 'Scenic Coastal Drive', details: 'Wind through hidden coves and coral cliffs—perfect for snaps.' },
          { duration: '1 hr 30 mins', activity: 'Beach Lounge', details: 'Chill under a palapa on soft sands with reggae in the air.' },
          { duration: '1 hr', activity: 'Seaside Feast', details: 'Bake & shark tacos, plantain crisps & fresh coconut water.' },
          { duration: '45 mins', activity: 'Sunset Return', details: 'Cruise back via Argyle Lookout as de sun dips.' },
        ],
      };

    case 'glass-boat':
      return {
        title: 'Exclusive Glass-Bottom Boat',
        images: [
          `${process.env.PUBLIC_URL}/assets/tour-boat.jpg`,
        ],
        itinerary: [
          { duration: '30 mins', activity: 'VIP Boarding', details: 'Private boat tour briefing & cold refreshments ready.' },
          { duration: '1 hr 30 mins', activity: 'Glass-Bottom Cruise', details: 'Peer through crystal panels at reefs and tropical fish.' },
          { duration: '1 hr', activity: 'Jet Ski Option', details: 'Optional lagoon ride—helm and safety gear supplied.' },
          { duration: '45 mins', activity: 'Cove Market Stop', details: 'Dock for fried dumplings & cold coconut punch.' },
          { duration: '45 mins', activity: 'Chilled Return', details: 'Sip cocktails on deck as you glide home.' },
        ],
      };

    case 'waterfall-stingray':
      return {
        title: 'Waterfall & Stingray Safari',
        images: [
          `${process.env.PUBLIC_URL}/assets/tour-waterfall.jpg`,
        ],
        itinerary: [
          { duration: '45 mins', activity: 'Jungle Trek', details: 'Guided hike through rainforest to Argyle Falls.' },
          { duration: '45 mins', activity: 'Waterfall Swim', details: 'Dip in de cool pool beneath the cascade.' },
          { duration: '1 hr', activity: 'Picnic by the Falls', details: 'Roti, chutneys & fresh fruit served riverside.' },
          { duration: '45 mins', activity: 'Stingray Feeding', details: 'Hand-feed friendly stingrays in crystal shallows.' },
          { duration: '1 hr', activity: 'Pier Fishing & Return', details: 'Cast a line off the pier, then roll back sharing stories.' },
        ],
      };

    default:
      return null;
  }
};

const TourDetails = () => {
  const { id } = useParams();
  const tour = getTourContent(id);
  if (!tour) return null;

  const { title, images, itinerary } = tour;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Photo Gallery */}
      <ImageList cols={Math.min(images.length, 3)} rowHeight={300} sx={{ mb: 6, borderRadius: 2 }}>        
        {images.map((src, idx) => (
          <ImageListItem key={idx} sx={{ overflow: 'hidden' }}>
            <img src={src} alt={`${title} ${idx + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </ImageListItem>
        ))}
      </ImageList>

      <Button variant="contained" component={Link} to="/rentalForm" color="primary" sx={{ float: 'inline-end', mt: 2 }}>
        Book Now
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6 }}>
        A curated half-day experience that captures the heart and beauty of Tobago
        <div>$90</div>
      </Typography>

      {/* Itinerary Table */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Itinerary
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Activity</strong></TableCell>
              <TableCell><strong>Details</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itinerary.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.activity}</TableCell>
                <TableCell>{item.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

    </Container>
  );
};

export default TourDetails;
