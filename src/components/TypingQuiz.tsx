import React, { useState, useEffect, useRef } from 'react';
import type { Kanji } from '../data';
import { Card, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard } from 'lucide-react';

interface TypingQuizProps {
  kanjiList: Kanji[];
}

interface QuizState {
  kanji: Kanji;
  isMeaning: boolean;
}

const splitJapaneseStr = (str: string | undefined | null): string[] => {
  if (!str) return [];
  return str.split(/[,/]/).map(s => s.trim().toLowerCase()).filter(Boolean);
};

const TypingQuiz: React.FC<TypingQuizProps> = ({ kanjiList }) => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [input, setInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const loadNewQuestion = () => {
    if (kanjiList.length === 0) return;
    const randomKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    const isMeaning = Math.random() > 0.5;
    setQuizState({ kanji: randomKanji, isMeaning });
    setInput('');
    setIsWrong(false);
    setShowAnswer(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanjiList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizState || !input.trim() || showAnswer) return;

    const userAns = input.trim().toLowerCase();
    let isCorrect = false;

    if (quizState.isMeaning) {
      const validMeanings = splitJapaneseStr(quizState.kanji.meaning);
      isCorrect = validMeanings.some(m => m === userAns || m.includes(userAns) || userAns.includes(m));
    } else {
      const validReadings = [
        ...splitJapaneseStr(quizState.kanji.onyomi_romaji), 
        ...splitJapaneseStr(quizState.kanji.kunyomi_romaji),
        ...splitJapaneseStr(quizState.kanji.onyomi),
        ...splitJapaneseStr(quizState.kanji.kunyomi)
      ];
      isCorrect = validReadings.some(r => r === userAns);
    }

    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    if (isCorrect) {
      // Flash green, next question
      setInput('BENAR! ✅');
      setTimeout(() => loadNewQuestion(), 800);
    } else {
      setIsWrong(true);
      setShowAnswer(true);
      setTimeout(() => loadNewQuestion(), 2500);
    }
  };

  if (!quizState) return <div className="text-center py-20">Memuat...</div>;

  const { kanji, isMeaning } = quizState;
  const questionLabel = isMeaning ? 'Ketik Arti (Bahasa Indonesia)' : 'Ketik Cara Baca (Romaji/Kana)';
  
  const correctAnswersDisplay = isMeaning 
    ? kanji.meaning 
    : [kanji.onyomi_romaji, kanji.kunyomi_romaji].filter(Boolean).join(' / ');

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
          <Keyboard size={18} /> Hardcore Recall
        </div>
        <div className="text-primary font-black text-sm uppercase tracking-widest">
          Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span>
        </div>
      </div>

      <motion.div key={kanji.id + (isMeaning ? 'm' : 'r')} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${showAnswer ? 'border-destructive ring-8 ring-destructive/10' : (input === 'BENAR! ✅' ? 'border-success ring-8 ring-success/20' : 'border-white/10')}`}>
          <CardContent className="p-8 sm:p-12 lg:p-16 text-center space-y-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${showAnswer ? 'bg-destructive' : (input === 'BENAR! ✅' ? 'bg-success' : 'bg-primary')}`} />
            
            <p className="text-muted-foreground font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] opacity-60 relative z-10">{questionLabel}</p>
            
            <motion.div 
              animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="font-black leading-tight tracking-tighter relative z-10 text-[6rem] sm:text-[8rem] text-primary drop-shadow-2xl"
            >
              {kanji.kanji}
            </motion.div>

            <AnimatePresence>
              {showAnswer && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-destructive/20 border border-destructive/30 p-4 rounded-xl relative z-10">
                  <p className="text-[10px] font-black uppercase text-destructive tracking-widest mb-1">Jawaban Benar:</p>
                  <p className="text-xl font-black text-destructive">{correctAnswersDisplay}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md mx-auto mt-8">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={showAnswer || input === 'BENAR! ✅'}
                placeholder="Ketik jawaban di sini..."
                className={`w-full text-center text-xl font-bold px-6 py-4 rounded-2xl bg-white/5 border-2 outline-none transition-all placeholder:text-muted-foreground/30 ${
                  showAnswer ? 'border-destructive/50 text-destructive' : 
                  (input === 'BENAR! ✅' ? 'border-success text-success bg-success/10' : 'border-white/20 focus:border-primary focus:ring-4 focus:ring-primary/20 text-foreground')
                }`}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TypingQuiz;