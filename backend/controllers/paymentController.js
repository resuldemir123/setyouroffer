const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { amount, status, userId, listingId } = req.body;

    if (!amount || !status || !userId || !listingId) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    const newPayment = new Payment({ amount, status, userId, listingId });
    await newPayment.save();

    res.status(201).json({ message: 'Ödeme başarıyla oluşturuldu.', payment: newPayment });
  } catch (error) {
    console.error('Ödeme oluşturma hatası:', error);
    res.status(500).json({ message: 'Ödeme oluşturulurken bir hata oluştu.', error });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Ödeme bulunamadı.' });
    }
    res.status(200).json({ message: 'Ödeme bilgisi başarıyla getirildi.', payment });
  } catch (error) {
    console.error('Ödeme bilgisi getirme hatası:', error);
    res.status(500).json({ message: 'Ödeme bilgisi getirilirken bir hata oluştu.', error });
  }
};
