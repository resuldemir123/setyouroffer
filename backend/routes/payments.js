const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Yeni ödeme oluşturma
router.post('/', paymentController.createPayment);

// Ödeme bilgisini ID'ye göre getirme
router.get('/:id', paymentController.getPaymentById);

module.exports = router;