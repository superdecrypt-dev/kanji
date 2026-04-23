import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { sentenceList } from '../sentenceData';
import type { SentenceQuizItem } from '../sentenceData';

const createQuestion = (): { currentSentence: SentenceQuizItem | null; options: string[] } => {
  if (sentenceList.length === 0) {
    return { currentSentence: null, options: [] };
  }

  const randomSentence = sentenceList[Math.floor(Math.random() * sentenceList.length)];
  const shuffledWrong = [...randomSentence.wrongOptions].sort(() => Math.random() - 0.5).slice(0, 3);
  const allOptions = [randomSentence.target, ...shuffledWrong].sort(() => Math.random() - 0.5);

  return { currentSentence: randomSentence, options: allOptions };
};

const SentenceQuiz: React.FC = () => {
  const initialQuestion = createQuestion();
  const [currentSentence, setCurrentSentence] = useState<SentenceQuizItem | null>(initialQuestion.currentSentence);
  const [options, setOptions] = useState<string[]>(initialQuestion.options);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null || !currentSentence) return;
    const isCorrect = option === currentSentence.target;
    setSelectedAnswer(option);
    if (!isCorrect) setIsWrong(true);
    setScore(prev => ({ total: prev.total + 1, correct: prev.correct + (isCorrect ? 1 : 0) }));
    setTimeout(() => {
      const nextQuestion = createQuestion();
      setCurrentSentence(nextQuestion.currentSentence);
      setOptions(nextQuestion.options);
      setSelectedAnswer(null);
      setIsWrong(false);
    }, 2000);
  };

  if (!currentSentence) return <div className="text-center py-16 text-muted-foreground font-bold">Memuat...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-5 md:space-y-6" data-testid="sentence-quiz">
      {/* Score Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-card border border-border rounded-xl" data-testid="sentence-quiz-score">
        <div className="text-sm font-bold text-foreground">
          Skor: <span className="text-lg ml-1 text-primary">{score.correct}</span><span className="text-muted-foreground">/{score.total}</span>
        </div>
        <div className="text-xs font-bold text-muted-foreground">
          {Math.round((score.correct / (score.total || 1)) * 100)}% benar
        </div>
      </div>

      {/* Sentence Card */}
      <motion.div key={currentSentence.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className={`bg-card border-2 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 text-center transition-all duration-300 ${
          selectedAnswer ? (isWrong ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20') : 'border-border'
        }`} data-testid="sentence-question-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Lengkapi Kalimat</p>
          
          <motion.p 
            animate={isWrong && selectedAnswer ? { x: [-8, 8, -8, 8, 0] } : {}}
            className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed text-foreground font-jp"
            data-testid="sentence-display"
          >
            {currentSentence.sentence}
          </motion.p>

          {selectedAnswer && (
            <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground italic mt-4" data-testid="sentence-translation">
              "{currentSentence.translation}"
            </motion.p>
          )}

          <AnimatePresence>
            {isWrong && selectedAnswer && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 p-3 rounded-xl" data-testid="sentence-correct-answer">
                <p className="text-[10px] font-bold uppercase text-green-700 dark:text-green-400 tracking-widest mb-1">Jawaban Benar</p>
                <p className="text-lg font-bold text-green-900 dark:text-green-300 font-jp">{currentSentence.target}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-2.5 md:gap-3" data-testid="sentence-options">
        {options.map((option, index) => {
          const isSelected = option === selectedAnswer;
          const isCorrect = option === currentSentence.target;

          let borderColor = 'border-border';
          let bgColor = 'bg-card hover:border-foreground/20';
          let textColor = 'text-foreground';
          
          if (selectedAnswer) {
            if (isCorrect) {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-50 dark:bg-green-950/30';
              textColor = 'text-green-900 dark:text-green-300';
            } else if (isSelected) {
              borderColor = 'border-red-500';
              bgColor = 'bg-red-50 dark:bg-red-950/30';
              textColor = 'text-red-900 dark:text-red-300';
            } else {
              bgColor = 'bg-card opacity-50';
            }
          }
          
          return (
            <motion.button 
              key={index}
              data-testid={`sentence-option-${index}`}
              whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
              className={`w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 font-bold text-base sm:text-lg font-jp ${borderColor} ${bgColor} ${textColor} ${!selectedAnswer ? 'cursor-pointer active:scale-[0.98]' : ''}`}
              onClick={() => handleAnswerClick(option)} 
              disabled={selectedAnswer !== null}
            >
              {selectedAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
              {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0 animate-shake" />}
              <span>{option}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SentenceQuiz;
