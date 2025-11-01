
import React from 'react';

interface BotResponseCardProps {
  content: string;
}

interface ParsedContent {
  title: string;
  explanation: string;
  imageDescription: string;
  didYouKnow: string;
  followup: string;
}

const parseBotResponse = (text: string): ParsedContent => {
  const lines = text.split('\n').filter(line => line.trim() !== '');

  const getValue = (key: string) => {
    const line = lines.find(l => l.startsWith(key));
    return line ? line.replace(key, '').trim() : '';
  };
  
  const followupLine = lines.find(l => l.startsWith('Would you like'));

  return {
    title: getValue('Title:'),
    explanation: getValue('Explanation:'),
    imageDescription: getValue('Image Description:'),
    didYouKnow: getValue('Did You Know?:'),
    followup: followupLine || ''
  };
};

const BotResponseCard: React.FC<BotResponseCardProps> = ({ content }) => {
  const parsed = parseBotResponse(content);

  // Fallback for non-structured responses
  if (!parsed.title && !parsed.explanation) {
    return (
      <div className="bg-white text-gray-800 p-3 rounded-3xl rounded-bl-lg shadow-md border">
        <p>{content}</p>
      </div>
    );
  }
  
  // Use a hash of the content to get a consistent "random" image
  const imageId = content.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0) % 1000;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden w-full">
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{parsed.title}</h2>
        <p className="text-gray-600 leading-relaxed">{parsed.explanation}</p>
      </div>
      
      {parsed.imageDescription && (
        <div>
          <img 
            src={`https://picsum.photos/600/400?image=${imageId}`} 
            alt={parsed.imageDescription}
            className="w-full h-auto object-cover" 
          />
          <p className="text-xs text-gray-500 p-3 bg-gray-50">{parsed.imageDescription}</p>
        </div>
      )}
      
      {parsed.didYouKnow && (
        <div className="p-5 bg-green-50 border-t border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">💡 Did You Know?</h3>
          <p className="text-green-700">{parsed.didYouKnow}</p>
        </div>
      )}
      
      {parsed.followup && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 italic">{parsed.followup}</p>
        </div>
      )}
    </div>
  );
};

export default BotResponseCard;
