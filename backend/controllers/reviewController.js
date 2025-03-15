const Review = require('../models/Review');

// Tüm yorumları al
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Yorumlar alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Yorumlar alınırken bir hata oluştu.' });
  }
};

// ID'ye göre yorum al
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Yorum bulunamadı.' });
    }
    res.json(review);
  } catch (error) {
    console.error('Yorum getirme hatası:', error);
    res.status(500).json({ message: 'Yorum getirilirken bir hata oluştu.' });
  }
};

// Yorum ekle
exports.addReview = async (req, res) => {
  try {
    const { rating, comment, userId, listingId } = req.body;

    if (!rating || !comment || !userId || !listingId) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    const newReview = new Review({ rating, comment, userId, listingId });
    await newReview.save();

    res.status(201).json({ message: 'İnceleme başarıyla eklendi.', review: newReview });
  } catch (error) {
    console.error('İnceleme ekleme hatası:', error);
    res.status(500).json({ message: 'İnceleme eklenirken bir hata oluştu.', error });
  }
};
