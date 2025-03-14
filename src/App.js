import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToursPage from './components/ToursPage';
import SearchBar from './components/SearchBar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/rentals" element={<SearchBar />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/home" element={<HeroSection />} />

      </Routes>
    </Router>
  );
}

export default App;

