const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Controller'ı doğru bir şekilde import edin

// Yorum ekle
router.post('/', reviewController.addReview); // Burada addReview fonksiyonunu kullanıyoruz

// Yorumları al
router.get('/', reviewController.getAllReviews);  // Tüm yorumları getirme
router.get('/:id', reviewController.getReviewById);  // ID'ye göre yorum getirme

module.exports = router;
