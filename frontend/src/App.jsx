import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Link importu eklendi
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ListingCard from './components/ListingCard';
import OfferForm from './components/OfferForm';
import PaymentForm from './components/PaymentForm';
import ReviewForm from './components/ReviewForm';
import About from './pages/About';
import Advertise from './pages/Advertise';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ManageRentals from './pages/ManageRentals';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import SignIn from './pages/SignIn';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const sampleListing = {
    price: '$695,000',
    beds: 4,
    baths: 3,
    sqft: 3102,
    type: 'House for Sale',
    imageUrl: '/path-to-house-image.jpg'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Header her sayfada gösterilsin */}
        <Header />
        
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Agents Tours Loans Homes</h1>
            <form className="search-form" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">🔍</button>
            </form>
          </div>
        </section>

        {/* Yalnızca Ana Sayfa (Home) için diğer içerikler */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/Listings" element={<Listings />} />
          <Route path="/pages/Home" element={<Home />} />
          <Route path="/pages/Dashboard" element={<Dashboard />} />
          <Route path="/pages/ManageRentals" element={<ManageRentals />} />
          <Route path="/pages/Advertise" element={<Advertise />} />
          <Route path="/pages/Help" element={<Help />} />
          <Route path="/pages/SignIn" element={<SignIn />} />
          <Route path="/pages/Rent" element={<Rent />} />
          <Route path="/pages/Sell" element={<Sell />} />
          <Route path="/pages/About" element={<About />} />
        </Routes>

        {/* Ana sayfada gösterilecek içerikler */}
        <section className="recommendations-section">
          <div className="left-content">
            <h2>Get home recommendations</h2>
            <p>Sign in for a more personalized experience.</p>
            <Link to="/pages/SignIn" className="sign-in-button">Sign in</Link>
          </div>

          <div className="right-content">
            <div className="recommendation-card">
              <div className="recommendation-badge">
                <span className="badge-icon">🏠</span>
                <p>Recommended homes</p>
                <p className="badge-subtext">based on your monthly budget</p>
              </div>
              <ListingCard listing={sampleListing} />
            </div>

            <div className="recommendation-card">
              <div className="recommendation-badge">
                <span className="badge-icon">📍</span>
                <p>Recommended homes</p>
                <p className="badge-subtext">based on your preferred location</p>
              </div>
              <ListingCard listing={sampleListing} />
            </div>
          </div>
        </section>

        {/* Ana sayfa için formlar ve araçlar */}
        <section className="forms-section">
          <h2 className="section-title">Tools & Resources</h2>
          <div className="forms-container">
            <div className="form-wrapper">
              <OfferForm />
            </div>
            <div className="form-wrapper">
              <PaymentForm />
            </div>
            <div className="form-wrapper">
              <ReviewForm />
            </div>
          </div>
        </section>

        {/* Footer her sayfada gösterilsin */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
