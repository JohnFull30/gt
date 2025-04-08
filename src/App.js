import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import theme from './theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import FilterComponent from './components/FilterComponent';
import ToursPage from './components/ToursPage';
import TourDetails from './pages/TourDetails';
import Rentals from './pages/Rentals';
import RentalForm from './components/RentalForm';
import About from './pages/About';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>

          {/* Homepage */}
          <Route
            path="/"
            element={
              <Box>
                <HeroSection />
              </Box>
            }
          />

          {/* Rentals */}
          <Route
            path="/rentals"
            element={
              <Box sx={{ pt: 10, px: 3 }}>
                <SearchBar />
                <FilterComponent />
                <Rentals />
              </Box>
            }
          />

          {/* Tours */}
          <Route
            path="/tours"
            element={
              <Box sx={{ pt: 10 }}>
                <ToursPage />
              </Box>
            }
          />
          <Route
            path="/tours/:id"
            element={
              <Box sx={{ pt: 10 }}>
                <TourDetails />
              </Box>
            }
          />

          {/* Rental Form */}
          <Route
            path="/rentalForm"
            element={
              <Box sx={{ pt: 10 }}>
                <RentalForm />
              </Box>
            }
          />

          {/* About Page */}
          <Route path="/about" element={<About />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
