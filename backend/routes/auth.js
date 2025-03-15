const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');  // authMiddleware'i doğru bir şekilde import ediyoruz

// Kayıt ol
router.post('/register', registerUser);

// Giriş yap
router.post('/login', loginUser);

// Kullanıcı profilini al (Token gereklidir)
router.get('/profile', authMiddleware, getUserProfile);

// Kullanıcı profilini güncelle (Token gereklidir)
router.put('/profile', authMiddleware, updateUserProfile);  // authMiddleware ve updateUserProfile kullanımı

module.exports = router;
