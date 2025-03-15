const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
