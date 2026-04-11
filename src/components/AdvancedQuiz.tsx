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
    <div className="max-w-2xl mx-auto space-y-10 py-6">
      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="text-primary font-black text-sm uppercase tracking-widest">
          Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span>
        </div>
        <div className="text-muted-foreground text-xs font-black uppercase tracking-widest opacity-60">
          Akurasi: {Math.round((score.correct / (score.total || 1)) * 100)}%
        </div>
      </div>
      
      <motion.div
        key={currentKanji.id + mode}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-4 ring-destructive/20' : 'border-success ring-4 ring-success/20') : 'border-white/10'}`}>
          <CardContent className="p-16 text-center space-y-8 relative overflow-hidden">
            {/* Background glow */}
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            
            <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px] opacity-60 relative z-10">{questionText}</p>
            <motion.div 
              animate={isWrong && isWrong ? { x: [-10, 10, -10, 10, 0], rotate: [-1, 1, -1, 1, 0] } : {}}
              className={`font-black leading-tight tracking-tighter relative z-10 ${mode.includes('ToKanji') ? 'text-4xl sm:text-6xl text-foreground' : 'text-[6rem] sm:text-[8rem] text-primary drop-shadow-2xl'}`}
            >
              {questionDisplay}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selectedAnswer;
          
          let btnVariant: 'outline' | 'success' | 'destructive' | 'glass' = 'glass';
          if (selectedAnswer) {
            if (isCorrect) btnVariant = 'success';
            else if (isSelected) btnVariant = 'destructive';
          }

          return (
            <motion.div
              key={index}
              whileHover={!selectedAnswer ? { scale: 1.02, y: -2 } : {}}
              whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
            >
              <Button 
                variant={btnVariant}
                className={`w-full h-24 text-xl font-black transition-all duration-300 border-2 rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50 hover:bg-white/10' : 'disabled:opacity-100'}`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center gap-4 px-2">
                  {selectedAnswer && isCorrect && <CheckCircle2 className="w-6 h-6 animate-bounce" />}
                  {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-6 h-6 animate-shake" />}
                  <span className="truncate max-w-[200px]">{option}</span>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedQuiz;