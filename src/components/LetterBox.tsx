import React, { useState, useEffect, useCallback } from 'react';

interface LetterBoxProps {
  onCorrectGuess: () => void;
  onIncorrectGuess: (letter: string) => void;
}

const LetterBox: React.FC<LetterBoxProps> = ({ onCorrectGuess, onIncorrectGuess }) => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('bg-white');

  const generateRandomLetter = useCallback(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }, []);

  useEffect(() => {
    setCurrentLetter(generateRandomLetter());
  }, [generateRandomLetter]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === currentLetter) {
        setBackgroundColor('bg-green-500');
        onCorrectGuess();
        setTimeout(() => {
          setBackgroundColor('bg-white');
          setCurrentLetter(generateRandomLetter());
        }, 1000);
      } else {
        setBackgroundColor('bg-red-500');
        onIncorrectGuess(currentLetter);
        setTimeout(() => {
          setBackgroundColor('bg-white');
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentLetter, generateRandomLetter, onCorrectGuess, onIncorrectGuess]);

  return (
    <div className={`w-32 h-32 ${backgroundColor} flex items-center justify-center text-4xl font-bold border-2 border-gray-300 rounded-lg transition-colors duration-300`}>
      {currentLetter}
    </div>
  );
};

export default LetterBox;