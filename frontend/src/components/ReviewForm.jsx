import React, { useState } from 'react';

function ReviewForm() {
  const [reviewData, setReviewData] = useState({
    propertyAddress: '',
    rating: 5,
    title: '',
    comment: '',
    name: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sabit API URL kullanma
  const API_URL = "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Frontend form validation
    if (!reviewData.propertyAddress || !reviewData.title || !reviewData.comment || !reviewData.name || !reviewData.email) {
      setError('Lütfen tüm alanları doldurun.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reviews/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Yorum gönderilirken hata oluştu.');
      }

      console.log('Yorum başarıyla gönderildi!');
      setReviewData({ propertyAddress: '', rating: 5, title: '', comment: '', name: '', email: '' });
    } catch (err) {
      setError(`Hata: ${err.message || 'Sunucuya bağlanılamadı. Lütfen tekrar deneyin.'}`);
      console.error('Hata:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Yorum Bırakın</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="form-group">
        <label htmlFor="propertyAddress">Mülk Adresi</label>
        <input
          type="text"
          id="propertyAddress"
          name="propertyAddress"
          value={reviewData.propertyAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Puan</label>
        <select id="rating" name="rating" value={reviewData.rating} onChange={handleChange}>
          {[5, 4, 3, 2, 1].map(star => (
            <option key={star} value={star}>{star} Yıldız</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="title">Yorum Başlığı</label>
        <input
          type="text"
          id="title"
          name="title"
          value={reviewData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Yorumunuz</label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          value={reviewData.comment}
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
          value={reviewData.name}
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
          value={reviewData.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Gönderiliyor...' : 'Yorumu Gönder'}
      </button>
    </form>
  );
}

export default ReviewForm;
