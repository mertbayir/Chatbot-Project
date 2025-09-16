import React, { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageInput } from './MessageInput';
import { useChatStore } from '../store/chatStore';
import { useSocket } from '../hooks/useSocket';
import { Wifi, WifiOff, MessageCircle } from 'lucide-react';
import { QuickButtons } from './QuickButtons';
import { EmailForm } from './EmailForm';

interface ChatProps {
  isWidget?: boolean;
}


export const Chat: React.FC<ChatProps> = ({ isWidget = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isConnected, isTyping } = useChatStore();
  const { sendMessage } = useSocket();
  const [showQuickButtons, setShowQuickButtons] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Selamlaşma mesajı geldiyse quick buttons göster
  useEffect(() => {
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.sender === 'bot' && (
        last.text.toLowerCase().includes('hoş geldiniz') ||
        last.text.toLowerCase().includes('nasıl yardımcı olabilirim')
      )) {
        setShowQuickButtons(true);
        setShowContactOptions(false);
        setShowEmailForm(false);
        setEmailSent(false);
      } else if (last.sender === 'bot' && last.text.toLowerCase().includes('iletişim')) {
        setShowQuickButtons(false);
        setShowContactOptions(true);
        setShowEmailForm(false);
        setEmailSent(false);
      } else {
        setShowQuickButtons(false);
        setShowContactOptions(false);
      }
    }
  }, [messages]);

  if (isWidget) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Messages Area - Widget Mode */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-3">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <MessageCircle className="text-gray-500" size={18} />
                </div>
                <p className="text-sm text-gray-600 mb-1">Merhaba! 👋</p>
                <p className="text-xs text-gray-500">Size nasıl yardımcı olabilirim?</p>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
          {/* Quick Buttons */}
          {showQuickButtons && (
            <QuickButtons
              buttons={[
                { label: 'Hizmetler', onClick: () => sendMessage('hizmetler') },
                { label: 'İletişim', onClick: () => sendMessage('iletişim') },
              ]}
            />
          )}
          {showContactOptions && !showEmailForm && !emailSent && (
            <QuickButtons
              buttons={[
                { label: 'Telefon', onClick: () => window.open('https://wa.me/905384869494', '_blank') },
                { label: 'E-posta', onClick: () => setShowEmailForm(true) },
              ]}
            />
          )}
          {showEmailForm && !emailSent && (
            <EmailForm
              onSend={async (email, note, setError) => {
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, note })
                  });
                  if (res.ok) {
                    setEmailSent(true);
                  } else {
                    const data = await res.json();
                    setError(data.message || 'Bir hata oluştu.');
                  }
                } catch (err) {
                  setError('Sunucuya bağlanılamadı.');
                }
              }}
              onCancel={() => setShowEmailForm(false)}
            />
          )}
          {emailSent && (
            <div className="p-2 text-green-600 text-xs">Talebiniz iletildi. En kısa sürede dönüş yapılacaktır.</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Widget Mode */}
        <MessageInput 
          onSendMessage={sendMessage}
          disabled={!isConnected}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - Full Screen Mode */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <MessageCircle className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Sole Luna Tech Chatbot
              </h1>
              <p className="text-sm text-gray-500">
                Size yardımcı olmak için buradayım
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-2 text-green-600">
                <Wifi size={16} />
                <span className="text-sm font-medium">Çevrimiçi</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <WifiOff size={16} />
                <span className="text-sm font-medium">Bağlantı yok</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MessageCircle className="text-gray-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Konuşmaya başlayın
              </h3>
              <p className="text-gray-500">
                Merhaba deyin ve sohbeti başlatalım!
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <MessageInput 
        onSendMessage={sendMessage}
        disabled={!isConnected}
      />
    </div>
  );
};
