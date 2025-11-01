
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ChatScreen from './components/ChatScreen';

const App: React.FC = () => {
  const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = () => {
    setChatStarted(true);
  };

  const handleGoBack = () => {
    setChatStarted(false);
  };

  return (
    <div className="w-full h-screen font-sans">
      {chatStarted ? (
        <ChatScreen onGoBack={handleGoBack} />
      ) : (
        <WelcomeScreen onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;
