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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
  <Navbar />
  <Routes>
    <Route 
      path="/gt" 
      element={<HeroSection />}  // 👈 HeroSection as landing page
    />

    <Route 
      path="/rentals"
      element={
        <Box sx={{ p: 3 }}>
          <SearchBar />
          <FilterComponent />
          <Rentals />
        </Box>
      } 
    />

    <Route 
      path="/tours" 
      element={<ToursPage />} 
    />
  </Routes>
</Router>

        </ThemeProvider>
      );
    }


export default App;
