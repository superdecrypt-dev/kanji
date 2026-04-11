import React, { useState } from 'react';
import type { Kanji } from '../data';
import type { KanjiProgress } from '../store/useProgress';
import { CheckCircle2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FlashcardProps {
  kanji: Kanji;
  progress?: KanjiProgress;
  onMarkMastered: () => void;
  onNext: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ kanji, progress, onMarkMastered, onNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isMastered = progress?.level === 5;

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-8">
      <div 
        className="relative w-full h-80 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden bg-card border-2 border-border rounded-2xl shadow-xl flex flex-col items-center justify-center p-6">
            <div className="absolute top-4 right-4 flex gap-2">
              {isMastered && <CheckCircle2 className="text-success w-6 h-6" />}
              <Badge variant="outline" className="opacity-50">L{kanji.lesson}</Badge>
            </div>
            
            <motion.span 
              className="text-9xl font-bold text-foreground"
              layoutId="kanji-text"
            >
              {kanji.kanji}
            </motion.span>
            
            <div className="absolute bottom-6 text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <RefreshCcw className="w-4 h-4" /> Ketuk untuk membalik
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 backface-hidden bg-card border-2 border-primary/20 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center space-y-4"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="space-y-1">
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Arti</span>
              <h3 className="text-3xl font-extrabold text-primary">{kanji.meaning}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full pt-4">
              <div className="bg-secondary/30 p-3 rounded-xl">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Kunyomi</p>
                <p className="text-lg font-medium">{kanji.kunyomi || '-'}</p>
                {kanji.kunyomi_romaji && <p className="text-sm text-primary/70">{kanji.kunyomi_romaji}</p>}
              </div>
              <div className="bg-secondary/30 p-3 rounded-xl">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Onyomi</p>
                <p className="text-lg font-medium">{kanji.onyomi || '-'}</p>
                {kanji.onyomi_romaji && <p className="text-sm text-primary/70">{kanji.onyomi_romaji}</p>}
              </div>
            </div>

            {progress && progress.level > 0 && !isMastered && (
              <Badge variant="secondary" className="mt-4">SRS Level {progress.level}</Badge>
            )}
          </div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-3 w-full"
          >
             {!isMastered && (
               <Button 
                 variant="success"
                 className="flex-1 gap-2 shadow-lg h-12"
                 onClick={(e) => { e.stopPropagation(); onMarkMastered(); onNext(); }}
               >
                 <CheckCircle2 size={18} /> Tandai Hafal
               </Button>
             )}
             <Button 
               variant="outline"
               className="flex-1 h-12 border-2"
               onClick={(e) => { e.stopPropagation(); onNext(); }}
             >
               Lanjut
             </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Flashcard;