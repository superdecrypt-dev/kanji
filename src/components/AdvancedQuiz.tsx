import React, { useState, useMemo } from 'react';
import type { Kanji } from '../data';
import type { ProgressState } from '../store/useProgress';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, BookOpen } from 'lucide-react';

interface AdvancedQuizProps {
  kanjiList: Kanji[];
  progress: ProgressState;
  onResult: (kanjiId: number, isCorrect: boolean) => void;
}

type QuizMode = 'kanjiToMeaning' | 'kanjiToReading' | 'meaningToKanji' | 'readingToKanji';

interface QuizState {
  currentKanji: Kanji | null;
  options: string[];
  mode: QuizMode;
  selectedAnswer: string | null;
}

function createNewQuestion(kanjiList: Kanji[], quizFocus: 'all' | 'review', progress: ProgressState): QuizState {
  let pool = kanjiList;
  
  if (quizFocus === 'review') {
    const now = Date.now();
    const reviewPool = kanjiList.filter(k => {
      const p = progress[k.id];
      return p && p.nextReview <= now && p.level < 5;
    });
    if (reviewPool.length > 0) {
      pool = reviewPool;
    }
  }

  if (pool.length === 0) {
    return { currentKanji: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  const targetKanji = pool[randomIndex];
  
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

const AdvancedQuiz: React.FC<AdvancedQuizProps> = ({ kanjiList, progress, onResult }) => {
  const [quizFocus, setQuizFocus] = useState<'all' | 'review'>('all');
  const [quizState, setQuizState] = useState<QuizState>(() => createNewQuestion(kanjiList, 'all', progress));
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
      setQuizState(createNewQuestion(kanjiList, quizFocus, progress));
      setIsWrong(false);
    }, 2000); // Slightly longer to see the feedback
  };

  if (!currentKanji) {
    return (
      <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed border-white/10">
        <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-20 animate-spin" />
        <p className="text-xl font-black text-muted-foreground uppercase tracking-widest">Tidak ada Kanji untuk direview.</p>
        <Button 
          variant="outline" 
          className="mt-6 border-2 rounded-2xl"
          onClick={() => {
            setQuizFocus('all');
            setQuizState(createNewQuestion(kanjiList, 'all', progress));
          }}
        >
          Ganti ke Mode Semua Kanji
        </Button>
      </div>
    );
  }

  let questionText = '';
  let questionDisplay = '';
  
  switch (mode) {
    case 'kanjiToMeaning': questionText = 'Apa arti dari Kanji ini?'; questionDisplay = currentKanji.kanji; break;
    case 'kanjiToReading': questionText = 'Bagaimana cara membaca Kanji ini?'; questionDisplay = currentKanji.kanji; break;
    case 'meaningToKanji': questionText = 'Manakah Kanji yang berarti:'; questionDisplay = currentKanji.meaning; break;
    case 'readingToKanji': questionText = 'Manakah Kanji yang dibaca sebagai:'; questionDisplay = currentKanji.onyomi || currentKanji.kunyomi || currentKanji.meaning; break;
  }

  let correctAnswer = '';
  switch (mode) {
    case 'kanjiToMeaning': correctAnswer = currentKanji.meaning; break;
    case 'kanjiToReading': correctAnswer = currentKanji.onyomi || currentKanji.kunyomi || currentKanji.meaning; break;
    case 'meaningToKanji':
    case 'readingToKanji': correctAnswer = currentKanji.kanji; break;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-4">
      {/* Quiz Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <button 
            onClick={() => { setQuizFocus('all'); setQuizState(createNewQuestion(kanjiList, 'all', progress)); }}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${quizFocus === 'all' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Semua Kanji
          </button>
          <button 
            onClick={() => { setQuizFocus('review'); setQuizState(createNewQuestion(kanjiList, 'review', progress)); }}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${quizFocus === 'review' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Review Saja
          </button>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex gap-6 items-center">
          <div className="text-primary font-black text-xs uppercase tracking-widest">
            SKOR: <span className="text-lg ml-1">{score.correct}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="text-muted-foreground font-black text-xs uppercase tracking-widest opacity-60">
            AKURASI: {Math.round((score.correct / (score.total || 1)) * 100)}%
          </div>
        </div>
      </div>
      
      <motion.div
        key={currentKanji.id + mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-8 ring-destructive/10' : 'border-success ring-8 ring-success/10') : 'border-white/10'}`}>
          <CardContent className="p-16 text-center space-y-8 relative overflow-hidden">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] opacity-60 relative z-10">{questionText}</p>
            <motion.div 
              animate={isWrong ? { x: [-10, 10, -10, 10, 0], rotate: [-1, 1, -1, 1, 0] } : {}}
              className={`font-black leading-tight tracking-tighter relative z-10 ${mode.includes('ToKanji') ? 'text-5xl sm:text-7xl text-foreground' : 'text-[6rem] sm:text-[8rem] text-primary drop-shadow-2xl'}`}
            >
              {questionDisplay}
            </motion.div>

            {/* Hint overlay when wrong */}
            <AnimatePresence>
              {isWrong && selectedAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success/20 border border-success/30 p-4 rounded-2xl relative z-10"
                >
                  <p className="text-[10px] font-black uppercase text-success tracking-widest mb-1">Jawaban Benar:</p>
                  <p className="text-xl font-black text-success">{correctAnswer}</p>
                </motion.div>
              )}
            </AnimatePresence>
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
                className={`w-full h-24 text-xl font-black transition-all duration-300 border-2 rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50 hover:bg-white/10' : 'disabled:opacity-100'} ${selectedAnswer && isCorrect && !isSelected ? 'border-success/50 bg-success/10' : ''}`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center gap-4 px-2">
                  {selectedAnswer && isCorrect && <CheckCircle2 className="w-6 h-6" />}
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