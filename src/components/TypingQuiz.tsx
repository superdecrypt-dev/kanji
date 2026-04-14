import React, { useState, useEffect, useRef } from 'react';
import type { Kanji } from '../data';
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
  const [isCorrectAnim, setIsCorrectAnim] = useState(false);
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
    setIsCorrectAnim(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanjiList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizState || !input.trim() || showAnswer || isCorrectAnim) return;

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
      setIsCorrectAnim(true);
      setTimeout(() => loadNewQuestion(), 800);
    } else {
      setIsWrong(true);
      setShowAnswer(true);
      setTimeout(() => loadNewQuestion(), 2500);
    }
  };

  if (!quizState) return <div className="text-center py-16 text-muted-foreground font-bold">Memuat...</div>;

  const { kanji, isMeaning } = quizState;
  const questionLabel = isMeaning ? 'Ketik Arti (Bahasa Indonesia)' : 'Ketik Cara Baca (Romaji/Kana)';
  const correctAnswersDisplay = isMeaning 
    ? kanji.meaning 
    : [kanji.onyomi_romaji, kanji.kunyomi_romaji].filter(Boolean).join(' / ');

  return (
    <div className="max-w-2xl mx-auto space-y-5 md:space-y-6" data-testid="typing-quiz">
      {/* Score Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-card border border-border rounded-xl" data-testid="typing-quiz-score">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Keyboard size={16} className="text-primary" />
          <span>Kuis Ketik</span>
        </div>
        <div className="text-sm font-bold text-foreground">
          <span className="text-primary">{score.correct}</span><span className="text-muted-foreground">/{score.total}</span>
        </div>
      </div>

      {/* Question Card */}
      <motion.div key={kanji.id + (isMeaning ? 'm' : 'r')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className={`bg-card border-2 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-center transition-all duration-300 ${
          showAnswer ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : (isCorrectAnim ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-border')
        }`} data-testid="typing-question-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{questionLabel}</p>
          
          <motion.div 
            animate={isWrong ? { x: [-8, 8, -8, 8, 0] } : {}}
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-primary leading-none font-jp mb-6"
            data-testid="typing-kanji-display"
          >
            {kanji.kanji}
          </motion.div>

          <AnimatePresence>
            {isCorrectAnim && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-green-600 dark:text-green-400 font-bold text-lg mb-4" data-testid="correct-feedback">
                Benar!
              </motion.div>
            )}
            {showAnswer && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-3 rounded-xl mb-4" data-testid="wrong-answer-reveal">
                <p className="text-[10px] font-bold uppercase text-red-700 dark:text-red-400 tracking-widest mb-1">Jawaban Benar</p>
                <p className="text-lg font-bold text-red-900 dark:text-red-300 font-jp">{correctAnswersDisplay}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={showAnswer || isCorrectAnim}
              placeholder="Ketik jawaban..."
              data-testid="typing-input"
              className={`w-full text-center text-lg font-bold px-4 py-3.5 rounded-xl bg-background border-2 outline-none transition-all placeholder:text-muted-foreground/40 ${
                showAnswer ? 'border-red-400 text-red-600' : 
                (isCorrectAnim ? 'border-green-500 text-green-600' : 'border-border focus:border-foreground focus:ring-2 focus:ring-foreground/5 text-foreground')
              }`}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default TypingQuiz;
