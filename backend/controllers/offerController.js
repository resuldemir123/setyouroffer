const Offer = require('../models/Offer');

exports.createOffer = async (req, res) => {
  try {
    const { offerAmount, userId, listingId } = req.body;

    if (!offerAmount || !userId || !listingId) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur!" });
    }

    const newOffer = await Offer.create({
      offerAmount,
      userId,
      listingId
    });

    res.status(201).json(newOffer);
  } catch (error) {
    console.error("Teklif oluşturma hatası:", error);
    res.status(500).json({ message: "Teklif oluşturulamadı." });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Teklif bulunamadı" });
    }
    res.json(offer);
  } catch (error) {
    console.error("Teklif getirme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
