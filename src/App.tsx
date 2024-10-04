import React, { useState, useCallback } from 'react';
import LetterBox from './components/LetterBox';

function App() {
  const [missedLetters, setMissedLetters] = useState<{ [key: string]: number }>({});

  const handleCorrectGuess = useCallback(() => {
    // You can add any additional logic for correct guesses here
  }, []);

  const handleIncorrectGuess = useCallback((letter: string) => {
    setMissedLetters((prev) => ({
      ...prev,
      [letter]: (prev[letter] || 0) + 1,
    }));
  }, []);

  const getWeightedLetter = useCallback(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const weights = Object.entries(missedLetters).reduce((acc, [letter, count]) => {
      acc[letter] = count + 1;
      return acc;
    }, {} as { [key: string]: number });

    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 26);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      const weight = weights[letter] || 1;
      if (random < weight) {
        return letter;
      }
      random -= weight;
    }

    return alphabet[alphabet.length - 1];
  }, [missedLetters]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Letter Guessing Game</h1>
      <LetterBox onCorrectGuess={handleCorrectGuess} onIncorrectGuess={handleIncorrectGuess} />
      <p className="mt-8 text-lg">
        Press the key corresponding to the displayed letter. Green means correct, red means incorrect.
      </p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Missed Letters:</h2>
        <ul className="list-disc pl-5">
          {Object.entries(missedLetters).map(([letter, count]) => (
            <li key={letter}>
              {letter}: {count} {count === 1 ? 'time' : 'times'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;