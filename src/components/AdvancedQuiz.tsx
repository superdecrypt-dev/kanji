import React, { useState } from 'react';
import type { Kanji } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Sparkles } from 'lucide-react';

interface AdvancedQuizProps {
  kanjiList: Kanji[];
}

type QuizMode = 'kanjiToMeaning' | 'kanjiToReading';

interface QuizState {
  currentWord: { word: string; reading: string; meaning: string } | null;
  options: string[];
  mode: QuizMode;
  selectedAnswer: string | null;
}

// Hanya membuat pertanyaan untuk mode Kanji (dari data lokal)
function createNewKanjiQuestion(kanjiList: Kanji[]): QuizState {
  if (kanjiList.length === 0) return { currentWord: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };

  const randomIndex = Math.floor(Math.random() * kanjiList.length);
  const targetKanji = kanjiList[randomIndex];
  
  const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
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
    currentWord: { word: targetKanji.kanji, reading: targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning, meaning: targetKanji.meaning },
    mode: currentMode,
    options: allOptions,
    selectedAnswer: null
  };
}

// Memanggil AI untuk mendapatkan Jukugo baru
async function fetchNewJukugoQuestion(): Promise<QuizState | null> {
  try {
    const res = await fetch('/api/generate-jukugo');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    
    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];

    let correctAnswer = '';
    let wrongOptions: string[] = [];

    if (currentMode === 'kanjiToMeaning') {
      correctAnswer = data.meaning;
      wrongOptions = data.wrong_meanings || [];
    } else {
      correctAnswer = data.reading;
      wrongOptions = data.wrong_readings || [];
    }

    // Pastikan ada 3 pilihan salah
    while (wrongOptions.length < 3) {
      wrongOptions.push("Pilihan tidak tersedia");
    }

    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 3)];
    // Acak pilihan
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return {
      currentWord: { word: data.word, reading: data.reading, meaning: data.meaning },
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  } catch (error) {
    console.error("Gagal memuat Jukugo dari AI", error);
    return null;
  }
}

const AdvancedQuiz: React.FC<AdvancedQuizProps> = ({ kanjiList }) => {
  const [quizType, setQuizType] = useState<'kanji' | 'jukugo'>('kanji');
  const [quizState, setQuizState] = useState<QuizState | null>(() => createNewKanjiQuestion(kanjiList));
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isWrong, setIsWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadNextQuestion = async (type: 'kanji' | 'jukugo') => {
    setIsLoading(true);
    if (type === 'kanji') {
      setQuizState(createNewKanjiQuestion(kanjiList));
      setIsLoading(false);
    } else {
      const newState = await fetchNewJukugoQuestion();
      if (newState) {
        setQuizState(newState);
      } else {
        // Fallback jika API AI gagal atau limit
        setQuizType('kanji');
        setQuizState(createNewKanjiQuestion(kanjiList));
        alert("Maaf, server AI sedang sibuk. Kembali ke kuis Kanji reguler.");
      }
      setIsLoading(false);
    }
  };

  const handleAnswerClick = (option: string) => {
    if (!quizState || quizState.selectedAnswer !== null || !quizState.currentWord || isLoading) return;

    let correctAnswer = '';
    switch (quizState.mode) {
      case 'kanjiToMeaning': correctAnswer = quizState.currentWord.meaning; break;
      case 'kanjiToReading': correctAnswer = quizState.currentWord.reading; break;
    }

    const isCorrect = option === correctAnswer;
    
    setQuizState(prev => prev ? { ...prev, selectedAnswer: option } : null);
    if (!isCorrect) setIsWrong(true);
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    setTimeout(() => {
      setIsWrong(false);
      loadNextQuestion(quizType);
    }, 2000);
  };

  const switchQuizType = (newType: 'kanji' | 'jukugo') => {
    if (quizType === newType || isLoading) return;
    setQuizType(newType);
    setScore({ correct: 0, total: 0 });
    setIsWrong(false);
    loadNextQuestion(newType);
  };

  if (!quizState || !quizState.currentWord) return <div className="text-center py-20">Memuat kuis...</div>;

  const { currentWord, options, mode, selectedAnswer } = quizState;

  let questionText = '';
  let questionDisplay = currentWord.word;
  
  switch (mode) {
    case 'kanjiToMeaning': questionText = `Apa arti dari ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?`; break;
    case 'kanjiToReading': questionText = `Bagaimana cara membaca ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?`; break;
  }

  let correctAnswer = '';
  switch (mode) {
    case 'kanjiToMeaning': correctAnswer = currentWord.meaning; break;
    case 'kanjiToReading': correctAnswer = currentWord.reading; break;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4 relative">
      {/* Quiz Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl relative overflow-hidden">
          <button 
            onClick={() => switchQuizType('kanji')}
            disabled={isLoading}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all z-10 ${quizType === 'kanji' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Kuis Kanji
          </button>
          <button 
            onClick={() => switchQuizType('jukugo')}
            disabled={isLoading}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all z-10 flex items-center gap-2 ${quizType === 'jukugo' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Sparkles size={14} className={quizType === 'jukugo' ? "text-orange-300" : ""} /> AI Jukugo
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="text-primary font-black text-sm uppercase tracking-widest">
          Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span>
        </div>
        <div className="text-muted-foreground text-xs font-black uppercase tracking-widest opacity-60">
          Akurasi: {Math.round((score.correct / (score.total || 1)) * 100)}%
        </div>
      </div>
      
      <motion.div
        key={currentWord.word + mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="relative"
      >
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-8 ring-destructive/10' : 'border-success ring-8 ring-success/20') : 'border-white/10'}`}>
          <CardContent className="p-16 text-center space-y-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            
            {isLoading ? (
               <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
                 <Loader2 className="w-12 h-12 text-primary animate-spin" />
                 <p className="text-sm font-black uppercase tracking-widest text-primary/60">AI Sedang Menyusun Soal...</p>
               </div>
            ) : (
              <>
                <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] opacity-60 relative z-10">{questionText}</p>
                <motion.div 
                  animate={isWrong ? { x: [-10, 10, -10, 10, 0], rotate: [-1, 1, -1, 1, 0] } : {}}
                  className={`font-black leading-tight tracking-tighter relative z-10 text-[5rem] sm:text-[7rem] text-primary drop-shadow-2xl`}
                >
                  {questionDisplay}
                </motion.div>
              </>
            )}

            <AnimatePresence>
              {isWrong && selectedAnswer && !isLoading && (
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
              whileHover={(!selectedAnswer && !isLoading) ? { scale: 1.02, y: -2 } : {}}
              whileTap={(!selectedAnswer && !isLoading) ? { scale: 0.98 } : {}}
            >
              <Button 
                variant={btnVariant}
                className={`w-full h-24 text-xl font-black transition-all duration-300 border-2 rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50 hover:bg-white/10' : 'disabled:opacity-100'} ${selectedAnswer && isCorrect && !isSelected ? 'border-success/50 bg-success/10' : ''}`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null || isLoading}
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