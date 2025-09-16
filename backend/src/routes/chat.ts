import express from 'express';
import { ChatbotService } from '../services/chatbotService';

const router = express.Router();
const chatbotService = new ChatbotService();

// REST API endpoint for chat (Socket.io olmadan da kullanılabilir)
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Mesaj gerekli' });
    }

    const response = await chatbotService.generateResponse(message);
    
    res.json({
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Chat geçmişi için endpoint
router.get('/history/:userId', (req, res) => {
  // Bu endpoint gelecekte database entegrasyonu için hazırlanmıştır
  res.json({
    messages: [],
    message: 'Chat geçmişi henüz mevcut değil'
  });
});

export default router;
