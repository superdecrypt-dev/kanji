import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, FileText } from 'lucide-react';
import { sentenceList } from '../sentenceData';
import type { SentenceQuizItem } from '../sentenceData';

const SentenceQuiz: React.FC = () => {
  const [currentSentence, setCurrentSentence] = useState<SentenceQuizItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const loadNewQuestion = () => {
    if (sentenceList.length === 0) return;
    const randomSentence = sentenceList[Math.floor(Math.random() * sentenceList.length)];
    
    // Pick 3 random wrong options
    const shuffledWrong = [...randomSentence.wrongOptions].sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [randomSentence.target, ...shuffledWrong].sort(() => Math.random() - 0.5);
    
    setCurrentSentence(randomSentence);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsWrong(false);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null || !currentSentence) return;

    const isCorrect = option === currentSentence.target;
    setSelectedAnswer(option);
    
    if (!isCorrect) {
      setIsWrong(true);
    }
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    setTimeout(() => {
      loadNewQuestion();
    }, 2000);
  };

  if (!currentSentence) return <div className="text-center py-20">Memuat...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
          <FileText size={18} /> Kalimat Rumpang
        </div>
        <div className="text-primary font-black text-sm uppercase tracking-widest">
          Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span>
        </div>
      </div>

      <motion.div key={currentSentence.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-8 ring-destructive/10' : 'border-success ring-8 ring-success/20') : 'border-white/10'}`}>
          <CardContent className="p-8 sm:p-12 text-center space-y-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            
            <p className="text-muted-foreground font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] opacity-60 relative z-10">Lengkapi Kalimat</p>
            
            <motion.div 
              animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="font-black leading-relaxed tracking-tighter relative z-10 text-3xl sm:text-4xl text-primary drop-shadow-2xl"
            >
              {currentSentence.sentence}
            </motion.div>

            {selectedAnswer && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-muted-foreground font-medium italic relative z-10 text-sm sm:text-base">
                "{currentSentence.translation}"
              </motion.div>
            )}

            <AnimatePresence>
              {isWrong && selectedAnswer && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-destructive/20 border border-destructive/30 p-4 rounded-xl relative z-10">
                  <p className="text-[10px] font-black uppercase text-destructive tracking-widest mb-1">Jawaban Benar:</p>
                  <p className="text-xl font-black text-destructive">{currentSentence.target}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {options.map((option, index) => {
          const isSelected = option === selectedAnswer;
          const isCorrect = option === currentSentence.target;

          let btnVariant: 'outline' | 'success' | 'destructive' | 'glass' = 'glass';
          if (selectedAnswer) {
            if (isCorrect) btnVariant = 'success';
            else if (isSelected) btnVariant = 'destructive';
          }
          
          return (
            <motion.div key={index} whileHover={!selectedAnswer ? { scale: 1.02, y: -2 } : {}} whileTap={!selectedAnswer ? { scale: 0.98 } : {}}>
              <Button 
                variant={btnVariant} 
                className={`w-full h-20 sm:h-24 text-xl sm:text-2xl font-black transition-all duration-300 border-2 rounded-[1.25rem] sm:rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50' : 'disabled:opacity-100'} ${selectedAnswer && isCorrect && !isSelected ? 'border-success/50 bg-success/10' : ''}`} 
                onClick={() => handleAnswerClick(option)} 
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
                  {selectedAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 shrink-0 absolute left-4" />}
                  {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-4 h-4 sm:w-6 sm:h-6 animate-shake shrink-0 absolute left-4" />}
                  <span>{option}</span>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SentenceQuiz;