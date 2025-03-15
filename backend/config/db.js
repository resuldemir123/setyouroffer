const mongoose = require('mongoose');
const dotenv = require('dotenv');

// .env dosyasını yükle
dotenv.config();

// Hata ayıklama için MONGO_URI'yi konsola yazdır
console.log(process.env.MONGO_URI);  // Burada MONGO_URI'yi yazdırıyoruz

const connectDB = async () => {
  try {
    // MONGO_URI'yi kontrol et
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI ortam değişkeni tanımlı değil!');
      return;
    }

    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB'ye başarıyla bağlanıldı.");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error);
  }
};

module.exports = connectDB;
