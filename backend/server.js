const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // `{}` içinde çağır

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());

// MSSQL'e bağlan
connectDB(); // ✅ Hata çözülmüş olacak!

// Route'lar
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/reviews', reviewRoutes);

// Tanımsız rotalar için hata yönetimi
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global hata yönetimi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Sunucuyu başlat
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
