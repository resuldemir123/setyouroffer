const Offer = require('../models/Offer');

// Teklif oluşturma
exports.createOffer = async (req, res) => {
  try {
    const { offerAmount, userId, listingId } = req.body;

    if (!offerAmount || !userId || !listingId) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur!" });
    }

    const newOffer = new Offer({ offerAmount, userId, listingId });
    await newOffer.save();

    res.status(201).json(newOffer);
  } catch (error) {
    console.error("Teklif oluşturma hatası:", error);
    res.status(500).json({ message: "Teklif oluşturulamadı." });
  }
};

// Teklif ID'sine göre alma
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Teklif bulunamadı" });
    }
    res.json(offer);
  } catch (error) {
    console.error("Teklif getirme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Teklif güncelleme
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Teklif bulunamadı" });
    }

    const { offerAmount, userId, listingId } = req.body;

    // Güncellenecek alanları kontrol et
    if (offerAmount) {
      offer.offerAmount = offerAmount;
    }
    if (userId) {
      offer.userId = userId;
    }
    if (listingId) {
      offer.listingId = listingId;
    }

    await offer.save();
    res.status(200).json({ message: "Teklif başarıyla güncellendi", offer });
  } catch (error) {
    console.error("Teklif güncellenirken hata:", error);
    res.status(500).json({ message: "Teklif güncellenemedi" });
  }
};