import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // React Router'ı import et
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import ListingCard from './components/ListingCard';
import OfferForm from './components/OfferForm';
import PaymentForm from './components/PaymentForm';
import ReviewForm from './components/ReviewForm';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample listing data
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
    // Implement search functionality
  };

  return (
    <Router>  {/* Router'ı ekle */}
      <div className="app-container">
        <Header />

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Agents  Tours  Loans Homes</h1>

            <form className="search-form" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <span className="search-icon">🔍</span>
              </button>
            </form>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="recommendations-section">
          <div className="left-content">
            <h2>Get home recommendations</h2>
            <p>Sign in for a more personalized experience.</p>
            <button className="sign-in-button">Sign in</button>
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

        {/* Forms Section */}
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;
