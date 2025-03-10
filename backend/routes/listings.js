const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController'); // Controller'ı içe aktar

// GET - Tüm ilanları getir
router.get('/', listingController.getAllListings);

// POST - Yeni ilan oluştur
router.post('/', listingController.createListing);

// GET - Belirli bir ilanı getir
router.get('/:id', listingController.getListingById);

// PUT - Belirli bir ilanı güncelle
router.put('/:id', listingController.updateListing);

// DELETE - Belirli bir ilanı sil
router.delete('/:id', listingController.deleteListing);

module.exports = router;
