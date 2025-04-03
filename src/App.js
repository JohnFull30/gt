import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToursPage from './components/ToursPage';
import SearchBar from './components/SearchBar';
import HeroSection from './components/HeroSection';
import theme from './theme';
import FilterComponent from './components/FilterComponent';
import Box from '@mui/material/Box';
import Rentals from './pages/Rentals';
import RentalForm from './components/RentalForm';
import CssBaseline from '@mui/material/CssBaseline';
import About from './pages/About'; // at the top




function App() {
  return (
<ThemeProvider theme={theme}>
  <CssBaseline />
  <Router>
    <Navbar />
    <Routes>
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
  <Route
    path="/tours"
    element={
      <Box sx={{ pt: 10 }}>
        <ToursPage />
      </Box>
    }
  />
  <Route 
    path="/about" 
    element={
    <About />
    } 
    />

  <Route
    path="/gt"
    element={
      <Box>
        <HeroSection />
      </Box>
    }
  />
    <Route
    path="/rentalForm"
    element={
      <Box>
        <RentalForm sx={{ pt: 10 }}/>
      </Box>
    }
  />
</Routes>

  </Router>
</ThemeProvider>
      );
    }


export default App;
