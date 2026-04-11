import React, { useState } from 'react';
import type { Kanji } from '../data';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { AudioButton } from './AudioPlayer';

interface FlashcardProps {
  kanji: Kanji;
}

const Flashcard: React.FC<FlashcardProps> = ({ kanji }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div 
        className="relative w-full h-96 cursor-pointer perspective-1000"
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
              <Badge variant="outline" className="opacity-50 font-black border-white/20 px-4 py-1 rounded-full">L{kanji.lesson}</Badge>
            </div>
            
            <div className="flex items-center justify-center h-full relative z-10">
              <motion.span 
                className="text-[11rem] font-bold text-foreground drop-shadow-2xl"
                layoutId="kanji-text"
              >
                {kanji.kanji}
              </motion.span>
            </div>
            
            <div className="absolute bottom-10 text-muted-foreground/60 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em]">
              <RefreshCcw className="w-4 h-4 animate-spin-slow" /> Balik Kartu
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-[40px] border-2 border-primary/30 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-10 text-center space-y-8 overflow-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-black">Terjemahan</span>
              <h3 className="text-5xl font-black text-foreground tracking-tighter drop-shadow-sm">{kanji.meaning}</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 w-full pt-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] flex items-center justify-between shadow-inner hover:bg-white/20 transition-all">
                <div className="text-left">
                  <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1.5 opacity-70">Kunyomi</p>
                  <p className="text-2xl font-bold leading-tight">{kanji.kunyomi || '-'}</p>
                  {kanji.kunyomi_romaji && <p className="text-xs text-primary/70 font-black mt-1.5 italic tracking-wide">{kanji.kunyomi_romaji}</p>}
                </div>
                {kanji.kunyomi && <AudioButton text={kanji.kunyomi.replace(/\//g, ',')} />}
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] flex items-center justify-between shadow-inner hover:bg-white/20 transition-all">
                <div className="text-left">
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1.5 opacity-70">Onyomi</p>
                  <p className="text-2xl font-bold leading-tight">{kanji.onyomi || '-'}</p>
                  {kanji.onyomi_romaji && <p className="text-xs text-primary/70 font-black mt-1.5 italic tracking-wide">{kanji.onyomi_romaji}</p>}
                </div>
                {kanji.onyomi && <AudioButton text={kanji.onyomi.replace(/\//g, ',')} />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcard;