import React, { useState } from 'react';
import type { Kanji } from '../data';
import './Quiz.css';
import { getAcceptedReadingAnswers, getPrimaryReadingChoices } from '../kanjiReadings';

interface QuizProps {
  kanjiList: Kanji[];
}

type QuestionType = 'meaning' | 'reading';

interface QuizState {
  currentKanji: Kanji | null;
  options: string[];
  questionType: QuestionType;
  selectedAnswer: string | null;
}

function createNewQuestion(kanjiList: Kanji[]): QuizState {
  if (kanjiList.length === 0) {
    return { currentKanji: null, options: [], questionType: 'meaning', selectedAnswer: null };
  }

  const randomIndex = Math.floor(Math.random() * kanjiList.length);
  const targetKanji = kanjiList[randomIndex];
  
  const type: QuestionType = Math.random() > 0.5 ? 'meaning' : 'reading';

  let correctAnswer = type === 'meaning'
    ? targetKanji.meaning
    : (() => {
      const readings = [...getPrimaryReadingChoices(targetKanji, 'onyomi'), ...getPrimaryReadingChoices(targetKanji, 'kunyomi')];
      return readings[0] || targetKanji.onyomi || targetKanji.kunyomi;
    })();
  if (!correctAnswer) {
    correctAnswer = targetKanji.kunyomi || targetKanji.onyomi || targetKanji.meaning;
  }

  const wrongAnswers = new Set<string>();
  let maxTries = 50;
  while (wrongAnswers.size < 3 && maxTries > 0) {
    maxTries--;
    const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    if (randomWrong.id === targetKanji.id) continue;
    
    const wrongReadings = [...getPrimaryReadingChoices(randomWrong, 'onyomi'), ...getPrimaryReadingChoices(randomWrong, 'kunyomi')];
    const wrongText = type === 'meaning' ? randomWrong.meaning : (wrongReadings[0] || randomWrong.onyomi || randomWrong.kunyomi || randomWrong.meaning);
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
    questionType: type,
    options: allOptions,
    selectedAnswer: null
  };
}

const Quiz: React.FC<QuizProps> = ({ kanjiList }) => {
  const [quizState, setQuizState] = useState<QuizState>(() => createNewQuestion(kanjiList));
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const { currentKanji, options, questionType, selectedAnswer } = quizState;

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null || !currentKanji) return;

    let correctAnswer = questionType === 'meaning'
      ? currentKanji.meaning
      : (() => {
        const readings = [...getPrimaryReadingChoices(currentKanji, 'onyomi'), ...getPrimaryReadingChoices(currentKanji, 'kunyomi')];
        return readings[0] || currentKanji.onyomi || currentKanji.kunyomi;
      })();
    if (!correctAnswer) {
      correctAnswer = currentKanji.kunyomi || currentKanji.onyomi || currentKanji.meaning;
    }

    setQuizState(prev => ({ ...prev, selectedAnswer: option }));
    setTotalQuestions(prev => prev + 1);
    
    const isCorrect = questionType === 'meaning'
      ? option === correctAnswer
      : [...getAcceptedReadingAnswers(currentKanji, 'onyomi'), ...getAcceptedReadingAnswers(currentKanji, 'kunyomi')].includes(option);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setQuizState(createNewQuestion(kanjiList));
    }, 1500);
  };

  if (!currentKanji) return <div>Loading...</div>;

  const correctAnswer = questionType === 'meaning'
    ? currentKanji.meaning
    : [...getPrimaryReadingChoices(currentKanji, 'onyomi'), ...getPrimaryReadingChoices(currentKanji, 'kunyomi')][0]
      || currentKanji.onyomi
      || currentKanji.kunyomi
      || currentKanji.meaning;

  return (
    <div className="quiz-container">
      <div className="score-board">
        Score: {score} / {totalQuestions}
      </div>
      
      <div className="quiz-card">
        <h2 className="quiz-question">
          Apa {questionType === 'meaning' ? 'arti' : 'cara baca'} dari Kanji ini?
        </h2>
        <div className="quiz-kanji">{currentKanji.kanji}</div>
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

export default Quiz;
