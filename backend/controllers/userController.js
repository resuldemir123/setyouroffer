const User = require('../models/User');  // User model'ini import ediyoruz
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kullanıcı zaten var mı diye kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email zaten kayıtlı.' });
    }

    // Parolayı şifrele
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı oluştur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Başarı mesajı
    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu!' });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.', error });
  }
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı veritabanında ara
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Parola doğrulaması
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Parola hatalı.' });
    }

    // JWT Token oluştur
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Giriş başarılı!', token });
  } catch (error) {
    res.status(500).json({ message: 'Giriş yapılırken bir hata oluştu.', error });
  }
};

// Kullanıcı profilini getir
const getUserProfile = async (req, res) => {
  const { userId } = req.user;  // JWT token'dan alınan userId

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcı bilgilerini döndür
    res.json({ username: user.username, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Profil verileri alınırken bir hata oluştu.', error });
  }
};

// Kullanıcı profilini güncelle
const updateUserProfile = async (req, res) => {
  const { userId } = req.user;  // authMiddleware'den gelen userId

  try {
    const { username, email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcıyı güncelle
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);  // Parolayı hash'leyin
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi.' });
  } catch (error) {
    res.status(500).json({ message: 'Güncellenirken bir hata oluştu.' });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
