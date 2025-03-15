const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST - Yeni ödeme oluştur
router.post('/', paymentController.createPayment);

// GET - Ödeme bilgisini ID'ye göre getir
router.get('/:id', paymentController.getPaymentById);

module.exports = router;
