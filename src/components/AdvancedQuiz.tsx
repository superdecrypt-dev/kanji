import React, { useState } from 'react';
import type { Kanji } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { jukugoList } from '../jukugoData';

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

function createNewQuestion(kanjiList: Kanji[], type: 'kanji' | 'jukugo', recentWords: string[]): QuizState {
  if (type === 'kanji') {
    if (kanjiList.length === 0) return { currentWord: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };
    const targetKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];
    
    let correctAnswer = '';
    if (currentMode === 'kanjiToMeaning') {
      correctAnswer = targetKanji.meaning;
    } else {
      // Randomly pick between Onyomi and Kunyomi if both exist
      const availableReadings = [];
      if (targetKanji.onyomi) availableReadings.push(targetKanji.onyomi);
      if (targetKanji.kunyomi) availableReadings.push(targetKanji.kunyomi);
      
      if (availableReadings.length > 1) {
        correctAnswer = availableReadings[Math.floor(Math.random() * availableReadings.length)];
      } else {
        correctAnswer = availableReadings[0] || targetKanji.meaning;
      }
    }
    
    const wrongAnswers = new Set<string>();
    const targetReadings = [targetKanji.onyomi, targetKanji.kunyomi].filter(Boolean);
    const targetMeanings = targetKanji.meaning.split('/').map(m => m.trim().toLowerCase());

    while (wrongAnswers.size < 3) {
      const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      if (randomWrong.id === targetKanji.id) continue;
      
      let wrongText = '';
      if (currentMode === 'kanjiToMeaning') {
        wrongText = randomWrong.meaning;
        // Ensure the wrong meaning doesn't accidentally match the target meaning
        const isActuallyCorrect = targetMeanings.some(m => wrongText.toLowerCase().includes(m));
        if (isActuallyCorrect) continue;
      } else {
        const rReadings = [];
        if (randomWrong.onyomi) rReadings.push(randomWrong.onyomi);
        if (randomWrong.kunyomi) rReadings.push(randomWrong.kunyomi);
        wrongText = rReadings.length > 0 ? rReadings[Math.floor(Math.random() * rReadings.length)] : randomWrong.meaning;
        
        // CRITICAL FIX: Ensure the wrong reading isn't actually a valid alternative reading for the target
        const isActuallyCorrect = targetReadings.some(r => r === wrongText || (r && r.includes(wrongText)));
        if (isActuallyCorrect) continue;
      }
      
      if (wrongText && wrongText !== correctAnswer) wrongAnswers.add(wrongText);
    }
    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);
    return {
      currentWord: { word: targetKanji.kanji, reading: targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning, meaning: targetKanji.meaning },
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  } else {
    // Jukugo logic (Local Database)
    let targetWord = jukugoList[Math.floor(Math.random() * jukugoList.length)];
    // Prevent immediate repeats
    let tries = 0;
    while (recentWords.includes(targetWord.word) && tries < 10) {
      targetWord = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      tries++;
    }

    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];
    let correctAnswer = currentMode === 'kanjiToMeaning' ? targetWord.meaning : targetWord.reading;

    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const randomWrong = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      if (randomWrong.word === targetWord.word) continue;
      const wrongText = currentMode === 'kanjiToMeaning' ? randomWrong.meaning : randomWrong.reading;
      if (wrongText && wrongText !== correctAnswer) wrongAnswers.add(wrongText);
    }
    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);
    return {
      currentWord: targetWord,
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  }
}

const AdvancedQuiz: React.FC<AdvancedQuizProps> = ({ kanjiList }) => {
  const [quizType, setQuizType] = useState<'kanji' | 'jukugo'>('kanji');
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(() => createNewQuestion(kanjiList, 'kanji', []));
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isWrong, setIsWrong] = useState(false);

  const handleAnswerClick = (option: string) => {
    if (!quizState || quizState.selectedAnswer !== null || !quizState.currentWord) return;

    let correctAnswer = quizState.mode === 'kanjiToMeaning' ? quizState.currentWord.meaning : quizState.currentWord.reading;
    const isCorrect = option === correctAnswer;
    
    setQuizState(prev => prev ? { ...prev, selectedAnswer: option } : null);
    if (!isCorrect) setIsWrong(true);
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    setTimeout(() => {
      setIsWrong(false);
      const newRecent = [...recentWords.slice(-14), quizState.currentWord!.word];
      setRecentWords(newRecent);
      setQuizState(createNewQuestion(kanjiList, quizType, newRecent));
    }, 1500);
  };

  const switchQuizType = (newType: 'kanji' | 'jukugo') => {
    if (quizType === newType) return;
    setQuizType(newType);
    setScore({ correct: 0, total: 0 });
    setIsWrong(false);
    setQuizState(createNewQuestion(kanjiList, newType, []));
  };

  if (!quizState || !quizState.currentWord) return <div className="text-center py-20">Memuat...</div>;

  const { currentWord, options, mode, selectedAnswer } = quizState;
  const questionText = mode === 'kanjiToMeaning' ? `Apa arti dari ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?` : `Cara baca ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?`;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="flex justify-center mb-6">
        <div className="flex p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <button onClick={() => switchQuizType('kanji')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${quizType === 'kanji' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>Kuis Kanji</button>
          <button onClick={() => switchQuizType('jukugo')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${quizType === 'jukugo' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}><BookOpen size={14} /> Jukugo (250+)</button>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="text-primary font-black text-sm uppercase tracking-widest">Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span></div>
        <div className="text-muted-foreground text-xs font-black uppercase tracking-widest opacity-60">Akurasi: {Math.round((score.correct / (score.total || 1)) * 100)}%</div>
      </div>
      
      <motion.div key={currentWord.word + mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-8 ring-destructive/10' : 'border-success ring-8 ring-success/20') : 'border-white/10'}`}>
          <CardContent className="p-16 text-center space-y-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] opacity-60 relative z-10">{questionText}</p>
            <div className="font-black leading-tight tracking-tighter relative z-10 text-[5rem] sm:text-[7rem] text-primary drop-shadow-2xl">{currentWord.word}</div>
            <AnimatePresence>{isWrong && selectedAnswer && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-success/20 border border-success/30 p-4 rounded-2xl relative z-10">
                <p className="text-[10px] font-black uppercase text-success tracking-widest mb-1">Jawaban Benar:</p>
                <p className="text-xl font-black text-success">{mode === 'kanjiToMeaning' ? currentWord.meaning : currentWord.reading}</p>
              </motion.div>
            )}</AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option, index) => {
          const isCorrect = option === (mode === 'kanjiToMeaning' ? currentWord.meaning : currentWord.reading);
          const isSelected = option === selectedAnswer;
          let btnVariant: 'outline' | 'success' | 'destructive' | 'glass' = 'glass';
          if (selectedAnswer) {
            if (isCorrect) btnVariant = 'success';
            else if (isSelected) btnVariant = 'destructive';
          }
          return (
            <motion.div key={index} whileHover={!selectedAnswer ? { scale: 1.02, y: -2 } : {}} whileTap={!selectedAnswer ? { scale: 0.98 } : {}}>
              <Button variant={btnVariant} className={`w-full h-24 text-xl font-black transition-all duration-300 border-2 rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50' : 'disabled:opacity-100'} ${selectedAnswer && isCorrect && !isSelected ? 'border-success/50 bg-success/10' : ''}`} onClick={() => handleAnswerClick(option)} disabled={selectedAnswer !== null}>
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