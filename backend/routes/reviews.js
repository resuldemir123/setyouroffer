const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Yeni inceleme ekleme
router.post('/add', reviewController.addReview);

// Tüm incelemeleri listeleme
router.get('/', reviewController.getReviews);

module.exports = router;