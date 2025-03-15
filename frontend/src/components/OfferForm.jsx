import React, { useState } from "react";

function OfferForm() {
  const [offerData, setOfferData] = useState({
    propertyAddress: "",
    offerAmount: "",
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState(null); // Hata mesajı için state
  const [isSubmitting, setIsSubmitting] = useState(false); // Yükleniyor durumu için state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Form gönderiliyor durumunu aktif et
    setError(null); // Önceki hataları temizle

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

      // Sunucudan gelen yanıtı kontrol et
      if (!response.ok) {
        const errorData = await response.json(); // Hata mesajını parse et
        throw new Error(errorData.message || "Teklif gönderilirken bir hata oluştu.");
      }

      const data = await response.json();
      console.log("Teklif başarıyla eklendi:", data);

      // Formu sıfırla
      setOfferData({
        propertyAddress: "",
        offerAmount: "",
        name: "",
        email: "",
        phone: "",
      });

      // Başarı mesajı göster (isteğe bağlı)
      alert("Teklifiniz başarıyla gönderildi!");
    } catch (error) {
      console.error("Teklif eklenirken hata oluştu:", error);
      setError(error.message); // Hata mesajını state'e kaydet
    } finally {
      setIsSubmitting(false); // Yükleniyor durumunu pasif et
    }
  };

  return (
    <form className="offer-form" onSubmit={handleSubmit}>
      <h3>Teklif Yap</h3>

      {/* Hata mesajını göster */}
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="propertyAddress">Mülk Adresi</label>
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
        <label htmlFor="offerAmount">Teklif Miktarı</label>
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
        <label htmlFor="name">Adınız</label>
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
        <label htmlFor="email">E-posta</label>
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
        <label htmlFor="phone">Telefon Numarası</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={offerData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Gönderiliyor..." : "Teklifi Gönder"}
      </button>
    </form>
  );
}

export default OfferForm;