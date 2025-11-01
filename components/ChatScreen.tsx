
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToBot } from '../services/geminiService';
import ChatMessage from './ChatMessage';

interface ChatScreenProps {
  onGoBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onGoBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'bot',
      content: 'Hello! How can I help you learn about climate change in Karnataka today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseContent = await sendMessageToBot(input);
    const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: botResponseContent };
    
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const suggestions = [
      "Effects of climate change in Karnataka?",
      "Show drought in Karnataka",
      "Impact on coffee plantations?",
      "What can students do?"
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 p-2 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 4.033l.006.006a2 2 0 012.822 0l.006.006a2 2 0 002.823 0l.005-.005a2 2 0 012.822 0l.006.005a2 2 0 002.823 0l.006-.006a2 2 0 012.822 0l.005.006a2 2 0 002.823 0" /></svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Karnataka Climate Care</h1>
        </div>
        <div className="w-8"></div>
      </header>
      
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
          </div>
        )}
      </main>

      <footer className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="bg-gray-100 text-gray-700 text-sm py-1.5 px-3 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || input.trim() === ''}
              className="bg-green-500 text-white p-3 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
