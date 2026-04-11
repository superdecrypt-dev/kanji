import React, { useState } from 'react';
import type { Kanji } from '../data';
import './Quiz.css';

interface AdvancedQuizProps {
  kanjiList: Kanji[];
  onResult: (kanjiId: number, isCorrect: boolean) => void;
}

type QuizMode = 'kanjiToMeaning' | 'kanjiToReading' | 'meaningToKanji' | 'readingToKanji';

interface QuizState {
  currentKanji: Kanji | null;
  options: string[];
  mode: QuizMode;
  selectedAnswer: string | null;
}

function createNewQuestion(kanjiList: Kanji[]): QuizState {
  if (kanjiList.length === 0) {
    return { currentKanji: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };
  }

  const randomIndex = Math.floor(Math.random() * kanjiList.length);
  const targetKanji = kanjiList[randomIndex];
  
  const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading', 'meaningToKanji', 'readingToKanji'];
  const currentMode = modes[Math.floor(Math.random() * modes.length)];

  let correctAnswer = '';
  let getOptionText: (k: Kanji) => string = () => '';

  switch (currentMode) {
    case 'kanjiToMeaning':
      correctAnswer = targetKanji.meaning;
      getOptionText = (k) => k.meaning;
      break;
    case 'kanjiToReading':
      correctAnswer = targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning;
      getOptionText = (k) => k.onyomi || k.kunyomi || k.meaning;
      break;
    case 'meaningToKanji':
    case 'readingToKanji':
      correctAnswer = targetKanji.kanji;
      getOptionText = (k) => k.kanji;
      break;
  }

  const wrongAnswers = new Set<string>();
  let maxTries = 50;
  while (wrongAnswers.size < 3 && maxTries > 0) {
    maxTries--;
    const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    if (randomWrong.id === targetKanji.id) continue;
    
    const wrongText = getOptionText(randomWrong);
    if (wrongText && wrongText !== correctAnswer) {
      wrongAnswers.add(wrongText);
    }
  }

  const allOptions = [correctAnswer, ...Array.from(wrongAnswers)];
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  return {
    currentKanji: targetKanji,
    mode: currentMode,
    options: allOptions,
    selectedAnswer: null
  };
}

const AdvancedQuiz: React.FC<AdvancedQuizProps> = ({ kanjiList, onResult }) => {
  const [quizState, setQuizState] = useState<QuizState>(() => createNewQuestion(kanjiList));
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const { currentKanji, options, mode, selectedAnswer } = quizState;

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null || !currentKanji) return;

    let correctAnswer = '';
    switch (mode) {
      case 'kanjiToMeaning': correctAnswer = currentKanji.meaning; break;
      case 'kanjiToReading': correctAnswer = currentKanji.onyomi || currentKanji.kunyomi || currentKanji.meaning; break;
      case 'meaningToKanji':
      case 'readingToKanji': correctAnswer = currentKanji.kanji; break;
    }

    const isCorrect = option === correctAnswer;
    
    setQuizState(prev => ({ ...prev, selectedAnswer: option }));
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    onResult(currentKanji.id, isCorrect);

    setTimeout(() => {
      setQuizState(createNewQuestion(kanjiList));
    }, 1500);
  };

  if (!currentKanji) return <div>Loading...</div>;

  let questionText = '';
  let questionDisplay = '';
  
  switch (mode) {
    case 'kanjiToMeaning':
      questionText = 'Apa arti dari Kanji ini?';
      questionDisplay = currentKanji.kanji;
      break;
    case 'kanjiToReading':
      questionText = 'Bagaimana cara membaca Kanji ini?';
      questionDisplay = currentKanji.kanji;
      break;
    case 'meaningToKanji':
      questionText = 'Manakah Kanji yang berarti:';
      questionDisplay = currentKanji.meaning;
      break;
    case 'readingToKanji':
      questionText = 'Manakah Kanji yang dibaca sebagai:';
      questionDisplay = currentKanji.onyomi || currentKanji.kunyomi || currentKanji.meaning;
      break;
  }

  let correctAnswer = '';
  switch (mode) {
    case 'kanjiToMeaning': correctAnswer = currentKanji.meaning; break;
    case 'kanjiToReading': correctAnswer = currentKanji.onyomi || currentKanji.kunyomi || currentKanji.meaning; break;
    case 'meaningToKanji':
    case 'readingToKanji': correctAnswer = currentKanji.kanji; break;
  }

  return (
    <div className="quiz-container">
      <div className="score-board">
        Score: {score.correct} / {score.total}
      </div>
      
      <div className="quiz-card">
        <h2 className="quiz-question">{questionText}</h2>
        <div className={`quiz-display ${mode.includes('ToKanji') ? 'text-mode' : 'kanji-mode'}`}>
          {questionDisplay}
        </div>
      </div>

      <div className="options-grid">
        {options.map((option, index) => {
          let btnClass = 'option-btn';
          if (selectedAnswer !== null) {
            if (option === correctAnswer) {
              btnClass += ' correct';
            } else if (option === selectedAnswer) {
              btnClass += ' incorrect';
            }
          }
          return (
            <button 
              key={index} 
              className={btnClass}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedQuiz;