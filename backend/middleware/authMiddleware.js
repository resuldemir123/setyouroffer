const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı, erişim reddedildi.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded.userId'nin req.user'a eklenmesi
    next();
  } catch (error) {
    res.status(400).json({ message: 'Geçersiz token.' });
  }
};

module.exports = authMiddleware;
