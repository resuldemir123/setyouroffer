// src/components/ListingCard.jsx
import React from 'react';

function ListingCard({ listing }) {
  if (!listing) return null;
  
  return (
    <div className="listing-card">
      {listing.imageUrl && <img src={listing.imageUrl} alt="Property" className="listing-image" />}
      <div className="listing-details">
        {listing.price && <h3 className="listing-price">{listing.price}</h3>}
        <div className="listing-specs">
          {listing.beds && <span>{listing.beds} bd</span>}
          {listing.baths && <span> | {listing.baths} ba</span>}
          {listing.sqft && <span> | {listing.sqft} sqft</span>}
        </div>
        {listing.type && <p className="listing-type">{listing.type}</p>}
      </div>
    </div>
  );
}

export default ListingCard;