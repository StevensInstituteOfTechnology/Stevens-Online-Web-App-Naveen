import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHiMessage, setShowHiMessage] = useState(true);

  useEffect(() => {
    // Hide the "Hi" message after 5 seconds
    const timer = setTimeout(() => {
      setShowHiMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Add aggressive protection against external script interference
    const addChatProtection = () => {
      const style = document.createElement('style');
      style.id = 'chat-button-protection';
      style.textContent = `
        /* Ultra-aggressive chat button positioning */
        .chat-button-container,
        div.chat-button-container,
        [class*="chat-button-container"] {
          position: fixed !important;
          bottom: 80px !important;
          right: 24px !important;
          top: auto !important;
          left: auto !important;
          z-index: 9998 !important;
          pointer-events: auto !important;
          transform: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .chat-button-container *,
        div.chat-button-container *,
        [class*="chat-button-container"] * {
          pointer-events: auto !important;
        }
        
        /* Override any inline styles */
        .chat-button-container[style] {
          position: fixed !important;
          bottom: 80px !important;
          right: 24px !important;
          top: auto !important;
          left: auto !important;
        }
      `;
      
      // Remove existing protection if it exists
      const existing = document.getElementById('chat-button-protection');
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(style);
    };

    addChatProtection();
    
    // Re-apply protection every 2 seconds to counter external scripts
    const protectionInterval = setInterval(addChatProtection, 2000);

    return () => {
      clearInterval(protectionInterval);
      // Clean up protection styles
      const protection = document.getElementById('chat-button-protection');
      if (protection) {
        protection.remove();
      }
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Hide the hi message when chat is opened
    if (!isOpen) {
      setShowHiMessage(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-[9998] chat-button-container">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-16 right-0 mb-4"
          >
            <iframe 
              src="https://chat.learnwise.ai/?assistantId=Deq_k44qEFKo&isolatedIframe=true"
              className="w-96 h-[600px] border-none rounded-stevens-md shadow-2xl bg-white"
              title="LearnWise Chat"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hi Message Bubble - pointer-events-none so clicks pass through to button */}
      <AnimatePresence>
        {showHiMessage && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-16 right-2 mb-2 pointer-events-none"
          >
            <div className="bg-white text-stevens-dark-gray px-4 py-2 rounded-stevens-md shadow-lg border border-stevens-light-gray relative">
              <span className="text-sm font-medium">Hi! Need help? 👋</span>
              {/* Speech bubble tail */}
              <div className="absolute bottom-[-8px] right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
              <div className="absolute bottom-[-9px] right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-200"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          scale: showHiMessage ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          y: {
            duration: 2,
            repeat: showHiMessage ? Infinity : 0,
            ease: "easeInOut"
          },
          scale: {
            duration: 1,
            repeat: showHiMessage ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
      >
        <Button
          onClick={toggleChat}
          className={`w-14 h-14 !rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isOpen 
              ? 'bg-stevens-dark-gray hover:bg-stevens-dark-gray' 
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <MessageCircle className="w-6 h-6 text-white" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Pulse ring animation when showing hi message */}
      {showHiMessage && !isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-14 h-14 rounded-full bg-red-400 absolute inset-0"
          />
        </div>
      )}
    </div>
  );
}