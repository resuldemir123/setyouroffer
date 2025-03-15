const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB bağlantısı
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const offerRoutes = require('./routes/offers');
const paymentRoutes = require('./routes/payments');
const reviewRoutes = require('./routes/reviews');

// .env dosyasını yükle
dotenv.config();

const app = express();

// 📌 Middleware'ler
app.use(express.json()); // JSON formatını destekle
app.use(cors()); // CORS politikalarını etkinleştir

console.log(process.env.MONGO_URI);  // Burada MONGO_URI'yi yazdırıyoruz

// 📌 MongoDB'ye bağlan
connectDB();

// 📌 Route'ları dahil et
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

// 📌 Root endpoint
app.get('/', (req, res) => {
  res.send('🚀 API çalışıyor!');
});

// 📌 Sunucuyu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor...`));
