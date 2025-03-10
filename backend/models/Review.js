const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Doğru sequelize değişkenini kullan

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  listingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Eğer createdAt ve updatedAt otomatik eklenmesin istiyorsan
});

module.exports = Review;
