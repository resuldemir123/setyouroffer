const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kayıtlı.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
    }

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ message: 'Giriş başarılı.', token, user });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu.', error: error.message });
  }
};
