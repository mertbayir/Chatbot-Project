import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, note } = req.body;
  if (!email || !note) {
    return res.status(400).json({ message: 'Eksik bilgi.' });
  }

  try {
    // Basit bir nodemailer transporter (gmail örneği, .env ile ayarlayın)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'mert.bayir@solelunatech.com',
      subject: 'Sole Luna Tech Chatbot İletişim Talebi',
      text: `Kullanıcı e-posta: ${email}\n\nNotu/İsteği:\n${note}`,
    });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Mail gönderilemedi.' });
  }
});

export default router;
