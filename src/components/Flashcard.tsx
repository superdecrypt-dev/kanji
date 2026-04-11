import React, { useState } from 'react';
import type { Kanji } from '../data';
import type { KanjiProgress } from '../store/useProgress';
import { CheckCircle2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AudioButton } from './AudioPlayer';

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
          transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            
            <div className="absolute top-6 right-6 flex gap-2">
              {isMastered && <CheckCircle2 className="text-success w-7 h-7" />}
              <Badge variant="outline" className="opacity-50 font-black border-white/20">L{kanji.lesson}</Badge>
            </div>
            
            <div className="flex items-center justify-center h-full relative z-10">
              <motion.span 
                className="text-[10rem] font-bold text-foreground drop-shadow-2xl"
                layoutId="kanji-text"
              >
                {kanji.kanji}
              </motion.span>
            </div>
            
            <div className="absolute bottom-8 text-muted-foreground/60 flex items-center gap-3 text-sm font-black uppercase tracking-widest">
              <RefreshCcw className="w-5 h-5 animate-spin-slow" /> Ketuk untuk membalik
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-3xl border-2 border-primary/30 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-10 text-center space-y-6 overflow-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-black opacity-60">Terjemahan</span>
              <h3 className="text-4xl font-black text-primary tracking-tighter">{kanji.meaning}</h3>
            </div>

            <div className="grid grid-cols-1 gap-5 w-full pt-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center justify-between shadow-inner">
                <div className="text-left">
                  <p className="text-[10px] font-black text-orange-500/70 uppercase tracking-widest mb-1">Kunyomi</p>
                  <p className="text-xl font-bold leading-tight">{kanji.kunyomi || '-'}</p>
                  {kanji.kunyomi_romaji && <p className="text-xs text-primary/70 font-black mt-1 italic opacity-70">{kanji.kunyomi_romaji}</p>}
                </div>
                {kanji.kunyomi && <AudioButton text={kanji.kunyomi.replace(/\//g, ',').replace(/-/g, '')} className="h-10 w-10 bg-white/5" />}
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center justify-between shadow-inner">
                <div className="text-left">
                  <p className="text-[10px] font-black text-blue-500/70 uppercase tracking-widest mb-1">Onyomi</p>
                  <p className="text-xl font-bold leading-tight">{kanji.onyomi || '-'}</p>
                  {kanji.onyomi_romaji && <p className="text-xs text-primary/70 font-black mt-1 italic opacity-70">{kanji.onyomi_romaji}</p>}
                </div>
                {kanji.onyomi && <AudioButton text={kanji.onyomi.replace(/\//g, ',').replace(/-/g, '')} className="h-10 w-10 bg-white/5" />}
              </div>
            </div>

            {progress && progress.level > 0 && !isMastered && (
              <Badge variant="secondary" className="mt-4 bg-primary/10 text-primary border-none font-black">SRS LEVEL {progress.level}</Badge>
            )}
          </div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex gap-4 w-full"
          >
             {!isMastered && (
               <Button 
                 variant="success"
                 className="flex-[2] gap-3 shadow-xl h-16 rounded-2xl text-lg"
                 onClick={(e) => { e.stopPropagation(); onMarkMastered(); onNext(); }}
               >
                 <CheckCircle2 size={22} /> Tandai Hafal
               </Button>
             )}
             <Button 
               variant="outline"
               className="flex-1 h-16 rounded-2xl border-2 text-lg"
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