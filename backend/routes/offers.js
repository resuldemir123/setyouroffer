const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.post('/', offerController.createOffer);  // Teklif oluşturma
router.get('/:id', offerController.getOfferById);  // Teklif getirme
router.put('/:id', offerController.updateOffer);  // Teklif güncelleme

module.exports = router;
