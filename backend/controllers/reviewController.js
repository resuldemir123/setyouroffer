const Review = require('../models/Review');

// Yeni inceleme ekleme
exports.addReview = async (req, res) => {
  try {
    const { propertyAddress, rating, title, comment, name, email } = req.body;

    // Gerekli alanların kontrolü
    if (!propertyAddress || !rating || !title || !comment || !name || !email) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    // Yeni inceleme oluştur
    const newReview = await Review.create({ propertyAddress, rating, title, comment, name, email });

    // Başarılı yanıt
    res.status(201).json({ message: 'İnceleme başarıyla eklendi.', review: newReview });
  } catch (error) {
    console.error('İnceleme ekleme hatası:', error);
    res.status(500).json({ message: 'İnceleme eklenirken bir hata oluştu.', error });
  }
};

// Tüm incelemeleri listeleme
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();

    // İncelemeleri döndür
    res.status(200).json({ message: 'İncelemeler başarıyla getirildi.', reviews });
  } catch (error) {
    console.error('İncelemeleri getirme hatası:', error);
    res.status(500).json({ message: 'İncelemeler getirilirken bir hata oluştu.', error });
  }
};