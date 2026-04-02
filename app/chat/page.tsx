'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ message: string; retryAfter: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('skillbot-messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([{
          id: crypto.randomUUID(),
          text: "Hi! I'm SkillBot, your career mentor. Ask me anything about careers or SkillBridge programs!",
          sender: 'ai',
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch {
      setMessages([{
        id: crypto.randomUUID(),
        text: "Hi! I'm SkillBot, your career mentor. Ask me anything about careers or SkillBridge programs!",
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }]);
    }
  }, []);

  useEffect(() => {
    if (mounted) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('skillbot-messages', JSON.stringify(messages));
  }, [messages, mounted]);


  const formatResponse = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^#{1,6}\s/gm, '')
      .replace(/```[\s\S]*?```/g, (match) => match.replace(/```/g, '').trim())
      .replace(/`(.*?)`/g, '$1')
      .replace(/^\d+\.\s/gm, '• ')
      .replace(/^\*\s/gm, '• ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const fetchAIResponse = async (messages: Message[]): Promise<string> => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (errorData.error === 'RATE_LIMIT') {
        setRateLimitInfo({ message: errorData.message, retryAfter: errorData.retryAfter });
        setTimeout(() => setRateLimitInfo(null), errorData.retryAfter * 1000);
        throw new Error('Rate limit hit');
      }
      throw new Error('API error');
    }

    const data = await res.json();
    return data.reply;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const aiText = await fetchAIResponse(updatedMessages);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        text: formatResponse(aiText),
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        text: 'Error: Failed to get response.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Shift+Enter = new line (default textarea behavior, no need to handle)
  };

  if (!mounted) return null;

  return (
    <>
      <Navbar />

      {/* Rate Limit Notification */}
      {rateLimitInfo && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500/90 backdrop-blur-sm text-black px-6 py-3 rounded-lg shadow-lg border border-yellow-600">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
            <p className="text-sm font-medium">{rateLimitInfo.message}</p>
          </div>
        </div>
      )}

      <main className="w-full h-screen flex flex-col pt-16"> {/* pt-16 = navbar height offset */}

        <div className="flex flex-col h-full max-w-4xl mx-auto w-full px-4">


          {/* Messages — scrollable, takes all available space */}
          <div className="bg-black/80 border-x border-gray-800/50 flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-purple-600/20 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-6">{message.text}</p>
                  <p className="text-xs mt-1 text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input + Tagline — fixed at bottom, never scrolls */}
          <div className="flex-shrink-0 bg-black/80 rounded-b-2xl border-t border-gray-800/50 relative">
            
            {/* Blur gradient above input for smooth scrolling transition */}
            <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

            {/* Input bar */}
            <div className="px-4 pb-4">
              <div className="flex items-center space-x-3">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);

                    const ta = textareaRef.current;
                    if (!ta) return;

                    // Reset height to calculate scrollHeight correctly
                    ta.style.height = 'auto';

                    // Calculate max height = 3 lines
                    const lineHeight = 28; // px, matches your textarea's line-height
                    const padding = 24; // px, top + bottom padding (py-3)
                    const maxHeight = lineHeight * 3 + padding;

                    // Set height, but cap at maxHeight
                    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + 'px';
                    ta.style.overflowY = ta.scrollHeight > maxHeight ? 'auto' : 'hidden';
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 px-5 py-3 bg-gray-900 border border-gray-700 rounded-3xl text-white text-base outline-none resize-none leading-7 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-150"
                  style={{ minHeight: '48px', lineHeight: '28px', overflow: 'hidden' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full disabled:opacity-50 transition-colors flex-shrink-0 text-base font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}