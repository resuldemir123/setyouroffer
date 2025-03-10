const Payment = require('../models/Payment');

// Yeni ödeme oluşturma
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethod, status, userId, orderId } = req.body;

    // Gerekli alanların kontrolü
    if (!amount || !currency || !paymentMethod || !status || !userId || !orderId) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    // Yeni ödeme oluştur
    const newPayment = await Payment.create({ amount, currency, paymentMethod, status, userId, orderId });

    // Başarılı yanıt
    res.status(201).json({ message: 'Ödeme başarıyla oluşturuldu.', payment: newPayment });
  } catch (error) {
    console.error('Ödeme oluşturma hatası:', error);
    res.status(500).json({ message: 'Ödeme oluşturulurken bir hata oluştu.', error });
  }
};

// Ödeme bilgisini ID'ye göre getirme
exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Ödeme bilgisini bul
    const payment = await Payment.findByPk(paymentId);

    // Ödeme bulunamazsa hata döndür
    if (!payment) {
      return res.status(404).json({ message: 'Ödeme bulunamadı.' });
    }

    // Başarılı yanıt
    res.status(200).json({ message: 'Ödeme bilgisi başarıyla getirildi.', payment });
  } catch (error) {
    console.error('Ödeme bilgisi getirme hatası:', error);
    res.status(500).json({ message: 'Ödeme bilgisi getirilirken bir hata oluştu.', error });
  }
};