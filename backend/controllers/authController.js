const { User } = require('../models/User'); // User modelini içe aktarın
const bcrypt = require('bcryptjs'); // Şifre hash'leme için
const jwt = require('jsonwebtoken'); // JWT oluşturmak için

// Kullanıcı kaydı
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // E-posta adresinin zaten kayıtlı olup olmadığını kontrol et
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10); // Salt değeri: 10

    // Yeni kullanıcı oluştur
    const user = await User.create({ username, email, password: hashedPassword });

    // Başarılı yanıt
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.', user });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ message: 'Kullanıcı kaydedilirken bir hata oluştu.', error: error.message });
  }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı e-posta adresine göre bul
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
    }

    // JWT oluştur
    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });

    // Başarılı yanıt
    res.json({ message: 'Giriş başarılı.', token, user });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu.', error: error.message });
  }
};