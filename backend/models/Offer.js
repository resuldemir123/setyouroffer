const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  offerAmount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Kullanıcı modeline referans
    required: true,
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',  // Listing modeline referans
    required: true,
  },
});

module.exports = mongoose.model('Offer', OfferSchema);
