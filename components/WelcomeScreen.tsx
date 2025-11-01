
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const content = {
  en: {
    title: "Karnataka Climate Care Assistant",
    subtitle: "Learn about climate change effects in Karnataka and explore images of our environment.",
    button: "Start Chat",
    langToggle: "ಕನ್ನಡ",
  },
  kn: {
    title: "ಕರ್ನಾಟಕ ಕ್ಲೈಮೇಟ್ ಕೇರ್ ಅಸಿಸ್ಟೆಂಟ್",
    subtitle: "ಕರ್ನಾಟಕದಲ್ಲಿನ ಹವಾಮಾನ ಬದಲಾವಣೆಯ ಪರಿಣಾಮಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ ಮತ್ತು ನಮ್ಮ ಪರಿಸರದ ಚಿತ್ರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    button: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    langToggle: "English",
  }
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  const [language, setLanguage] = useState<'en' | 'kn'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'kn' : 'en');
  };

  const currentContent = content[language];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-white text-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out transform scale-100"
        style={{ backgroundImage: `url(https://picsum.photos/1200/800?image=1015)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={toggleLanguage}
          className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 border border-white/30 rounded-full hover:bg-white/30 transition-colors duration-300"
        >
          {currentContent.langToggle}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-green-600/50 backdrop-blur-md p-4 rounded-full mb-6 animate-pulse">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 4.033l.006.006a2 2 0 012.822 0l.006.006a2 2 0 002.823 0l.005-.005a2 2 0 012.822 0l.006.005a2 2 0 002.823 0l.006-.006a2 2 0 012.822 0l.005.006a2 2 0 002.823 0" /></svg>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          {currentContent.title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 font-light drop-shadow-md">
          {currentContent.subtitle}
        </p>
        <button
          onClick={onStartChat}
          className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        >
          {currentContent.button}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
