const { Sequelize } = require('sequelize');
const mssql = require('mssql');

// MSSQL bağlantı bilgileri (Windows Authentication)
const sequelize = new Sequelize('setyouroffer', 'DESKTOP-4MRKT8H', 'resulfe123', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  logging: false,
});

// MSSQL bağlantı ayarları
const mssqlConfig = {
  server: 'localhost',
  database: 'setyouroffer',
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true,
  },
};

// MSSQL'e bağlanma fonksiyonu
const connectDB = async () => {
  try {
    await mssql.connect(mssqlConfig);
    console.log('✅ MSSQL veritabanına başarıyla bağlandı.');
  } catch (error) {
    console.error('❌ MSSQL bağlantı hatası:', error);
    process.exit(1);
  }
};

// Sequelize bağlantısını test et
sequelize.authenticate()
  .then(() => console.log('✅ Sequelize ile MSSQL bağlantısı başarılı.'))
  .catch(err => console.error('❌ Sequelize bağlantı hatası:', err));

// Export işlemi
module.exports = { connectDB, sequelize };
