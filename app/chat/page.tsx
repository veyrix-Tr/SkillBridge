'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string; // ✅ store as string (fix hydration issues)
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ message: string; retryAfter: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Initial load (safe)
  useEffect(() => {
    setMounted(true);

    try {
      const saved = localStorage.getItem('skillbot-messages');

      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([
          {
            id: crypto.randomUUID(),
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'ai',
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setMessages([
        {
          id: crypto.randomUUID(),
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: 'ai',
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // ✅ Scroll
  useEffect(() => {
    if (mounted) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mounted]);

  // ✅ Persist
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('skillbot-messages', JSON.stringify(messages));
    }
  }, [messages, mounted]);

  // ✅ Format AI response text
  const formatResponse = (text: string) => {
    return text
      // Remove markdown bold (**text**) and convert to plain text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      // Remove markdown italics (*text*) and convert to plain text  
      .replace(/\*(.*?)\*/g, '$1')
      // Remove markdown headers (# ## ###)
      .replace(/^#{1,6}\s/gm, '')
      // Remove markdown code blocks
      .replace(/```[\s\S]*?```/g, (match) => {
        return match.replace(/```/g, '').trim();
      })
      // Remove inline code (`code`)
      .replace(/`(.*?)`/g, '$1')
      // Convert numbered lists to clean format
      .replace(/^\d+\.\s/gm, '• ')
      // Remove extra asterisks used for bullet points
      .replace(/^\*\s/gm, '• ')
      // Clean up extra whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  // ✅ API call
  const fetchAIResponse = async (messages: Message[]): Promise<string> => {
    // ✅ Send only the latest message
    const latestMessage = messages[messages.length - 1];
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [latestMessage] }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      
      // ✅ Handle rate limit with notification
      if (errorData.error === 'RATE_LIMIT') {
        setRateLimitInfo({
          message: errorData.message,
          retryAfter: errorData.retryAfter
        });
        
        // Clear notification after retry time
        setTimeout(() => {
          setRateLimitInfo(null);
        }, errorData.retryAfter * 1000);
        
        throw new Error('Rate limit hit');
      }
      
      throw new Error('API error');
    }

    const data = await res.json();
    return data.reply;
  };

  // ✅ Send message
  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

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

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: 'Error: Failed to get response.',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ❌ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen flex flex-col">
        {/* ✅ Rate Limit Notification */}
        {rateLimitInfo && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500/90 backdrop-blur-sm text-black px-6 py-3 rounded-lg shadow-lg border border-yellow-600">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium">{rateLimitInfo.message}</p>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pt-6 flex flex-col flex-1">
          <div className="max-w-4xl mx-auto flex flex-col flex-1 w-full">

            {/* Header */}
            <div className="bg-black/80 rounded-t-2xl p-6 border-b border-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h1 className="text-xl font-bold text-white">AI Assistant</h1>
                <span className="text-sm text-gray-400">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-black/80 p-6 space-y-4 border-x border-gray-800/50 flex-1 overflow-y-auto">

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-purple-600/20 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>

                    <p className="text-xs mt-1 text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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

            {/* Input */}
            <div className="bg-black/80 rounded-b-2xl p-4 border-t border-gray-800/50">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white outline-none"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="px-5 py-2 bg-purple-600 text-white rounded-full disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Tagline */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-900/15 via-violet-900/15 to-blue-900/15 rounded-2xl p-4 border border-purple-500/20">
              <h3 className="text-xl font-bold text-purple-300 mb-2">
                SkillBot - Your AI Mentor
              </h3>
              <p className="text-gray-300 text-sm">
                Your intelligent companion for career guidance and growth
              </p>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}