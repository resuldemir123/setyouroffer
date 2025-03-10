import React from 'react';

function Header() {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="main-header">
      <nav className="nav-left">
        {/* Buy - Listings sayfasına git */}
        <a href="#" onClick={() => handleNavigation("/pages/Listings.jsx")} className="nav-item">Buy</a>
        <a href="#" className="nav-item">Rent</a>
        <a href="#" className="nav-item">Sell</a>
        {/* Home Loans - Home sayfasına git */}
        <a href="#" onClick={() => handleNavigation("/pages/Home.jsx")} className="nav-item">Home Loans</a>
        {/* Find an Agent - Dashboard sayfasına git */}
        <a href="#" onClick={() => handleNavigation("/pages/Dashboard.jsx")} className="nav-item">Find an Agent</a>
      </nav>
      
      <div className="logo">
        <a href="#" onClick={() => handleNavigation("/")} >
          <img src="/images/D.png" alt="Demir Emlak" />
          <span className="logo-text">Demir Emlak</span>
        </a>
      </div>

      <nav className="nav-right">
        <a href="#" className="nav-item">Manage Rentals</a>
        <a href="#" className="nav-item">Advertise</a>
        <a href="#" className="nav-item">Help</a>
        <a href="#" onClick={() => handleNavigation("/pages/Login.jsx")} className="nav-item">Sign In</a>
      </nav>
    </header>
  );
}

export default Header;
