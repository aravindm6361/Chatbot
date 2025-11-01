
import React from 'react';
import { Message } from '../types';
import BotResponseCard from './BotResponseCard';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isInitialMessage = message.id === 'initial';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md lg:max-w-2xl px-1 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {isUser ? (
          <div className="bg-green-500 text-white p-3 rounded-3xl rounded-br-lg shadow-md">
            <p>{message.content}</p>
          </div>
        ) : (
          isInitialMessage ? (
              <div className="bg-white text-gray-800 p-3 rounded-3xl rounded-bl-lg shadow-md border">
                  <p>{message.content}</p>
              </div>
          ) : (
             <BotResponseCard content={message.content} />
          )
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
