const Listing = require('../models/Listing'); // Listing modelini doğru şekilde içe aktar

// Tüm ilanları getir
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni ilan oluştur
exports.createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Belirli bir ilanı getir
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'İlan bulunamadı!' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// İlanı güncelle
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'İlan bulunamadı!' });
    }
    await listing.update(req.body);
    res.json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// İlanı sil
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'İlan bulunamadı!' });
    }
    await listing.destroy();
    res.json({ message: 'İlan başarıyla silindi!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
