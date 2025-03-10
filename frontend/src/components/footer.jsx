// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Your Real Estate Website. All rights reserved.</p>
    </footer>
  );
}

export default Footer;