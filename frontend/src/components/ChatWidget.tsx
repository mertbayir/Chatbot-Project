import React, { useState } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { Chat } from './Chat';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
  {/* Chat Widget Button - Sağ alt köşe */}
  <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 chat-widget-shadow chat-widget-button animate-pulse-slow"
            aria-label="Canlı Destek"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>

      {/* Chat Popup Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50">
          <div className={`bg-white rounded-lg chat-widget-shadow transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-96 w-80'
          } border border-gray-200`}>
            
            {/* Chat Header */}
            <div className="bg-primary-500 text-white p-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Canlı Destek</h3>
                  <p className="text-xs opacity-90">Size yardımcı olalım</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={minimizeChat}
                  className="hover:bg-white/20 rounded p-1 transition-colors"
                  aria-label="Küçült"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={closeChat}
                  className="hover:bg-white/20 rounded p-1 transition-colors"
                  aria-label="Kapat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="h-80">
                <Chat isWidget={true} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={closeChat}
        />
      )}
    </>
  );
};
