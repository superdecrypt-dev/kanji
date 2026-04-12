import React, { useState } from 'react';
import type { Kanji } from '../data';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

interface FlashcardProps {
  kanji: Kanji;
}

const Flashcard: React.FC<FlashcardProps> = ({ kanji }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto px-4">
      <div 
        className="relative w-full h-[500px] cursor-pointer perspective-1000"
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
          <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-3xl border-2 border-white/20 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
            
            <div className="absolute top-8 right-8 flex gap-2">
              <Badge variant="outline" className="opacity-50 font-black border-white/20 px-4 py-1 rounded-full text-[10px]">LEVEL N4-L{kanji.lesson}</Badge>
            </div>
            
            <div className="flex items-center justify-center h-full relative z-10">
              <motion.span 
                className="text-[12rem] font-bold text-foreground drop-shadow-2xl"
                layoutId="kanji-text"
              >
                {kanji.kanji}
              </motion.span>
            </div>
            
            <div className="absolute bottom-10 text-muted-foreground/60 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em]">
              <RefreshCcw className="w-4 h-4 animate-spin-slow" /> Ketuk untuk melihat arti
            </div>
          </div>

          {/* Back Side - IMPROVED SPACING */}
          <div 
            className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-[40px] border-2 border-primary/30 rounded-[3rem] shadow-2xl flex flex-col items-center p-8 text-center overflow-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

            {/* Header Section */}
            <div className="mt-6 mb-8 space-y-2 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-black">Terjemahan</span>
              <h3 className="text-3xl font-black text-foreground tracking-tighter leading-tight max-w-[280px] mx-auto uppercase">
                {kanji.meaning}
              </h3>
            </div>

            {/* Content Section with more gap */}
            <div className="w-full space-y-5 relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] flex items-center justify-between shadow-inner hover:bg-white/20 transition-all group">
                <div className="text-left">
                  <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1.5 opacity-70">Kunyomi</p>
                  <p className="text-xl font-bold leading-tight">{kanji.kunyomi || '-'}</p>
                  {kanji.kunyomi_romaji && <p className="text-[10px] text-foreground opacity-100 font-black mt-1.5 italic tracking-wide">{kanji.kunyomi_romaji}</p>}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] flex items-center justify-between shadow-inner hover:bg-white/20 transition-all group">
                <div className="text-left">
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1.5 opacity-70">Onyomi</p>
                  <p className="text-xl font-bold leading-tight">{kanji.onyomi || '-'}</p>
                  {kanji.onyomi_romaji && <p className="text-[10px] text-foreground opacity-100 font-black mt-1.5 italic tracking-wide">{kanji.onyomi_romaji}</p>}
                </div>
              </div>
            </div>

            <div className="mt-auto mb-4 opacity-20">
              <RefreshCcw className="w-6 h-6 mx-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcard;