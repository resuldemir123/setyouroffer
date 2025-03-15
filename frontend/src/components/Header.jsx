import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <nav className="nav-left">
        <Link to="/pages/Listings" className="nav-item">Buy</Link>
        <Link to="/pages/Rent" className="nav-item">Rent</Link>
        <Link to="/pages/Sell" className="nav-item">Sell</Link>
        <Link to="/pages/Home" className="nav-item">Home Loans</Link>
        <Link to="/pages/Dashboard" className="nav-item">Find an Agent</Link>
      </nav>

      <div className="logo">
        <Link to="/" className="nav-item">
          <img src="/images/D.png" alt="Demir Emlak" />
          <span className="logo-text">Demir Emlak</span>
        </Link>
      </div>

      <nav className="nav-right">
        <Link to="/pages/ManageRentals" className="nav-item">Manage Rentals</Link>
        <Link to="/pages/Advertise" className="nav-item">Advertise</Link>
        <Link to="/pages/Help" className="nav-item">Help</Link>
        <Link to="/pages/SignIn" className="nav-item">Sign In</Link>
      </nav>
    </header>
  );
}

export default Header;
