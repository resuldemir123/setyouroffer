import React, { useState } from "react";

function OfferForm() {
  const [offerData, setOfferData] = useState({
    propertyAddress: "",
    offerAmount: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offerPayload = {
      propertyAddress: offerData.propertyAddress,
      offerAmount: offerData.offerAmount,
      name: offerData.name,
      email: offerData.email,
      phone: offerData.phone,
      userId: 1, // Gerçek userId'yi buraya koy
      listingId: 1, // Gerçek listingId'yi buraya koy
    };

    try {
      const response = await fetch("http://localhost:5000/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerPayload),
      });

      if (!response.ok) {
        throw new Error("Teklif gönderilemedi.");
      }

      const data = await response.json();
      console.log("Teklif eklendi:", data);

      // Formu sıfırla
      setOfferData({
        propertyAddress: "",
        offerAmount: "",
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Teklif eklenirken hata oluştu:", error);
    }
  };

  return (
    <form className="offer-form" onSubmit={handleSubmit}>
      <h3>Make an Offer</h3>

      <div className="form-group">
        <label htmlFor="propertyAddress">Property Address</label>
        <input
          type="text"
          id="propertyAddress"
          name="propertyAddress"
          value={offerData.propertyAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="offerAmount">Offer Amount</label>
        <input
          type="number"
          id="offerAmount"
          name="offerAmount"
          value={offerData.offerAmount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={offerData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={offerData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={offerData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Submit Offer
      </button>
    </form>
  );
}

export default OfferForm;
