import React, { useState } from 'react';
import type { Kanji } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

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
  const [isWrong, setIsWrong] = useState(false);

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
    if (!isCorrect) setIsWrong(true);
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    onResult(currentKanji.id, isCorrect);

    setTimeout(() => {
      setQuizState(createNewQuestion(kanjiList));
      setIsWrong(false);
    }, 1500);
  };

  if (!currentKanji) return <div className="text-center py-20">Loading...</div>;

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
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="flex justify-between items-center px-2">
        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm">
          Skor: {score.correct} / {score.total}
        </div>
        <div className="text-muted-foreground text-sm font-medium">
          {Math.round((score.correct / (score.total || 1)) * 100)}% Akurasi
        </div>
      </div>
      
      <motion.div
        key={currentKanji.id + mode}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Card className={`overflow-hidden border-2 transition-colors duration-300 ${selectedAnswer ? (isWrong ? 'border-destructive/50' : 'border-success/50') : 'border-border'}`}>
          <CardContent className="p-10 text-center space-y-6">
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{questionText}</p>
            <motion.div 
              animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
              className={`font-bold leading-tight ${mode.includes('ToKanji') ? 'text-4xl sm:text-5xl text-foreground' : 'text-8xl sm:text-9xl text-primary'}`}
            >
              {questionDisplay}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selectedAnswer;
          
          let btnVariant: 'outline' | 'success' | 'destructive' = 'outline';
          if (selectedAnswer) {
            if (isCorrect) btnVariant = 'success';
            else if (isSelected) btnVariant = 'destructive';
          }

          return (
            <Button 
              key={index} 
              variant={btnVariant}
              className={`h-16 text-lg font-medium transition-all duration-200 border-2 ${!selectedAnswer && 'hover:border-primary hover:bg-primary/5'}`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center gap-3">
                {selectedAnswer && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                {option}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedQuiz;