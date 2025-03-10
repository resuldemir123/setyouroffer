const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // .sql yerine direkt require et

const Offer = sequelize.define('Offer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  offerAmount: { // amount yerine offerAmount olabilir (frontend ile eşleşmeli)
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
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
});

module.exports = Offer;
