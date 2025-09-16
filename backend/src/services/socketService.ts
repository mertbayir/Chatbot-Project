import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { ChatbotService } from './chatbotService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface User {
  id: string;
  socketId: string;
  messages: Message[];
}

const users = new Map<string, User>();
const chatbotService = new ChatbotService();

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`🔗 Kullanıcı bağlandı: ${socket.id}`);

    // Yeni kullanıcı kaydı
    socket.on('user:join', (userData) => {
      const userId = uuidv4();
      const user: User = {
        id: userId,
        socketId: socket.id,
        messages: []
      };
      
      users.set(socket.id, user);
      
      socket.emit('user:joined', { userId, messages: user.messages });
      
      // Hoş geldin mesajı
      const welcomeMessage: Message = {
        id: uuidv4(),
        text: 'Merhaba! Sole Luna Tech\'e hoş geldiniz! \n\nSize nasıl yardımcı olabilirim?\n\nHizmetlerimiz hakkında bilgi almak için "hizmetler" yazabilirsiniz.\n\nİletişim için "iletişim" yazabilirsiniz.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      user.messages.push(welcomeMessage);
      socket.emit('message:received', welcomeMessage);
    });

    // Mesaj gönderme
    socket.on('message:send', async (messageData) => {
      const user = users.get(socket.id);
      if (!user) return;

      // Kullanıcı mesajını kaydet
      const userMessage: Message = {
        id: uuidv4(),
        text: messageData.text,
        sender: 'user',
        timestamp: new Date()
      };

      user.messages.push(userMessage);
      socket.emit('message:received', userMessage);

      // Bot yanıtı oluştur
      try {
        const botResponse = await chatbotService.generateResponse(messageData.text);
        
        const botMessage: Message = {
          id: uuidv4(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };

        user.messages.push(botMessage);
        
        // Typing indicator göster
        socket.emit('bot:typing', true);
        
        setTimeout(() => {
          socket.emit('bot:typing', false);
          socket.emit('message:received', botMessage);
        }, 1000 + Math.random() * 2000); // 1-3 saniye arası gecikme
        
      } catch (error) {
        console.error('Bot yanıt hatası:', error);
        
        const errorMessage: Message = {
          id: uuidv4(),
          text: 'Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen tekrar deneyin.',
          sender: 'bot',
          timestamp: new Date()
        };
        
        user.messages.push(errorMessage);
        socket.emit('message:received', errorMessage);
      }
    });

    // Mesaj geçmişi isteme
    socket.on('messages:get', () => {
      const user = users.get(socket.id);
      if (user) {
        socket.emit('messages:history', user.messages);
      }
    });

    // Bağlantı kopma
    socket.on('disconnect', () => {
      console.log(`❌ Kullanıcı ayrıldı: ${socket.id}`);
      users.delete(socket.id);
    });
  });
};
