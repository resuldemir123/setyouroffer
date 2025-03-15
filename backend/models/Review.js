const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Kullanıcı referansı
    required: true,
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',  // Listing referansı
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
