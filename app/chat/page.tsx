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

  const handleClearChat = () => {
    const initialMessage: Message = {
      id: crypto.randomUUID(),
      text: "Hi! I'm SkillBot, your career mentor. Ask me anything about careers or SkillBridge programs!",
      sender: 'ai',
      timestamp: new Date().toISOString(),
    };

    setInputText('');

    const currentMessages = [...messages];
    const clearIntervalId = setInterval(() => {
      if (currentMessages.length > 0) {
        currentMessages.pop();
        setMessages([...currentMessages]);
      } else {
        clearInterval(clearIntervalId);
        setMessages([initialMessage]);
        localStorage.setItem('skillbot-messages', JSON.stringify([initialMessage]));
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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

      <main className="w-full h-screen flex flex-col pt-16">

        {/* ── Mobile-only top bar: avatar + name + clear button ── */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-black/90 border-b border-gray-800/50 flex-shrink-0 pt-5">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full overflow-hidden flex-shrink-0">
              <img src="/chatbot.png" alt="SkillBot" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-yellow-300 font-bold text-sm leading-tight">SkillBot</p>
              <p className="text-gray-400 text-xs leading-tight">Your AI Career Mentor</p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium rounded-full transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear</span>
          </button>
        </div>

        {/* ── Main content row ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Desktop sidebar — hidden on mobile ── */}
          <div className="hidden md:flex mt-9 w-80 lg:w-96 bg-black/90 border-r border-gray-800/50 p-6 flex-shrink-0">
            <div className="bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-500/20 shadow-xl w-full">

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 max-w-[5rem] max-h-[5rem] bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <img src="/chatbot.png" alt="SkillBot" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-yellow-300 text-center mb-2">SkillBot</h2>
              <p className="text-yellow-400 text-center mb-6">Your AI Career Mentor</p>

              {/* Description */}
              <div className="space-y-4 text-gray-300 text-base">
                {[
                  "Expert guidance for career exploration and skill development",
                  "Personalized advice based on your interests and goals",
                  "Information about SkillBridge trial programs",
                  "Available 24/7 to answer your questions",
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 text-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              {/* Clear Chat */}
              <div className="mt-6 pt-6 border-t border-gray-700/50 sticky bottom-6">
                <button
                  onClick={handleClearChat}
                  className="w-full px-4 py-3 bg-red-800/100 hover:bg-red-600 text-white font-medium rounded-full transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Chat area ── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex flex-col h-full max-w-5xl mx-auto w-full">

              {/* Messages */}
              <div className="bg-black/80 border-l border-gray-800/50 flex-1 overflow-y-auto px-4 md:px-14 py-4 space-y-4">
                <div className="h-4"></div> {/* Spacer to prevent content from being hidden behind navbar */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] md:max-w-lg px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-purple-600/20 text-white'
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      <p className="text-sm md:text-base whitespace-pre-wrap leading-6">{message.text}</p>
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

              {/* Input bar — pinned bottom */}
              <div className="flex-shrink-0 bg-black/80 rounded-b-2xl border-t border-gray-800/50 relative">
                <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                <div className="px-3 md:px-4 pb-4 pt-1">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                        const ta = textareaRef.current;
                        if (!ta) return;
                        ta.style.height = 'auto';
                        const lineHeight = 28;
                        const padding = 24;
                        const maxHeight = lineHeight * 3 + padding;
                        ta.style.height = Math.min(ta.scrollHeight, maxHeight) + 'px';
                        ta.style.overflowY = ta.scrollHeight > maxHeight ? 'auto' : 'hidden';
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      rows={1}
                      className="flex-1 px-4 md:px-5 py-3 bg-gray-900 border border-gray-700 rounded-3xl text-white text-sm md:text-base outline-none resize-none leading-7 placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-150"
                      style={{ minHeight: '48px', lineHeight: '28px', overflow: 'hidden' }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isTyping}
                      className="px-4 md:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full disabled:opacity-50 transition-colors flex-shrink-0 text-sm md:text-base font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}