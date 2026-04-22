import React, { useState } from 'react';
import type { Kanji } from '../data';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  kanji: Kanji;
}

const Flashcard: React.FC<FlashcardProps> = ({ kanji }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto" data-testid="flashcard">
      <div 
        className="relative w-full aspect-[3/4] max-h-[60vh] cursor-pointer perspective-1000"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        data-testid="flashcard-flip-area"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden bg-card border border-border rounded-2xl md:rounded-3xl flex flex-col items-center justify-center p-6 overflow-hidden shadow-sm">
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">L{kanji.lesson}</span>
            </div>
            
            <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold text-foreground leading-none font-jp" data-testid="flashcard-kanji">
              {kanji.kanji}
            </span>
            
            <div className="absolute bottom-5 md:bottom-8 text-muted-foreground flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <RefreshCcw className="w-3.5 h-3.5" /> Ketuk untuk balik
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 backface-hidden bg-card border border-primary/20 rounded-2xl md:rounded-3xl flex flex-col items-center p-5 sm:p-7 overflow-hidden shadow-sm"
            style={{ transform: 'rotateY(180deg)' }}
          >
            {/* Meaning */}
            <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 text-center" data-testid="flashcard-meaning">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Arti</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                {kanji.meaning}
              </h3>
            </div>

            {/* Readings */}
            <div className="w-full space-y-2.5 sm:space-y-3 flex-1">
              <div className="bg-secondary/50 border border-border p-3.5 sm:p-4 rounded-xl">
                <div className="text-left">
                  <p className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Kunyomi</p>
                  <p className="text-base sm:text-lg font-bold font-jp">{kanji.kunyomi || '-'}</p>
                  {kanji.kunyomi_romaji && <p className="text-xs text-muted-foreground font-medium mt-1 italic">{kanji.kunyomi_romaji}</p>}
                </div>
              </div>
              <div className="bg-secondary/50 border border-border p-3.5 sm:p-4 rounded-xl">
                <div className="text-left">
                  <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Onyomi</p>
                  <p className="text-base sm:text-lg font-bold font-jp">{kanji.onyomi || '-'}</p>
                  {kanji.onyomi_romaji && <p className="text-xs text-muted-foreground font-medium mt-1 italic">{kanji.onyomi_romaji}</p>}
                </div>
              </div>
            </div>

            <div className="mt-3 opacity-30">
              <RefreshCcw className="w-5 h-5 mx-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcard;
