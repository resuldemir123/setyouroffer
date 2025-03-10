const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // ✅ Doğru sequelize değişkenini kullan

// User modelini tanımla
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
}, {
  timestamps: true, // createdAt ve updatedAt otomatik olarak eklenir
});

// Modeli dışa aktar
module.exports = User;
