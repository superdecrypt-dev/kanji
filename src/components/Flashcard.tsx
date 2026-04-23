import React, { useState } from 'react';
import type { Kanji } from '../data';
import type { KotobaWord } from '../kotobaData';
import { getKotobaCategoryLabel } from '../kotobaData';
import { kanaToRomaji } from '../kanjiReadings';
import { kotobaExampleSentences } from '../kotobaExampleSentences';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

type FlashcardItem =
  | { type: 'kanji'; id: string; kanji: Kanji }
  | { type: 'kotoba'; id: string; kotoba: KotobaWord };

interface FlashcardProps {
  item: FlashcardItem;
}

const Flashcard: React.FC<FlashcardProps> = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  const isKanji = item.type === 'kanji';
  const frontText = isKanji ? item.kanji.kanji : item.kotoba.word;
  const meaning = isKanji ? item.kanji.meaning : item.kotoba.meaning;
  const kotobaRomaji = isKanji ? '' : kanaToRomaji(item.kotoba.reading);
  const kotobaCategoryLabel = isKanji ? '' : getKotobaCategoryLabel(item.kotoba.word);
  const kotobaSentences = isKanji ? [] : kotobaExampleSentences[item.kotoba.word] || [];
  const firstKotobaSentence = kotobaSentences[0];
  const frontTextSize = isKanji
    ? 'text-[6rem] sm:text-[8rem] md:text-[10rem]'
    : 'text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem]';

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
            {isKanji ? (
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">L{item.kanji.lesson}</span>
              </div>
            ) : (
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <div className="text-right space-y-1">
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">KOTOBA</span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {kotobaCategoryLabel}
                  </span>
                </div>
              </div>
            )}
            
            <span className={`${frontTextSize} font-bold text-foreground leading-none font-jp text-center break-all`} data-testid="flashcard-kanji">
              {frontText}
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
                {meaning}
              </h3>
            </div>

            {/* Readings */}
            <div className="w-full space-y-2.5 sm:space-y-3 flex-1">
              {isKanji ? (
                <>
                  <div className="bg-secondary/50 border border-border p-3.5 sm:p-4 rounded-xl">
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Kunyomi</p>
                      <p className="text-base sm:text-lg font-bold font-jp">{item.kanji.kunyomi || '-'}</p>
                      {item.kanji.kunyomi_romaji && <p className="text-xs text-muted-foreground font-medium mt-1 italic">{item.kanji.kunyomi_romaji}</p>}
                    </div>
                  </div>
                  <div className="bg-secondary/50 border border-border p-3.5 sm:p-4 rounded-xl">
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Onyomi</p>
                      <p className="text-base sm:text-lg font-bold font-jp">{item.kanji.onyomi || '-'}</p>
                      {item.kanji.onyomi_romaji && <p className="text-xs text-muted-foreground font-medium mt-1 italic">{item.kanji.onyomi_romaji}</p>}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-secondary/50 border border-border p-3.5 sm:p-4 rounded-xl">
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Reading</p>
                    <p className="text-base sm:text-lg font-bold font-jp">{item.kotoba.reading}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1 italic">{kotobaRomaji}</p>
                  </div>
                </div>
              )}
            </div>

            {!isKanji && firstKotobaSentence && (
              <div className="w-full mt-2 bg-secondary/40 border border-border rounded-xl p-3 text-left">
                <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Contoh Kalimat</p>
                <p className="text-sm font-bold font-jp text-foreground">{firstKotobaSentence.japanese}</p>
                <p className="text-[11px] text-muted-foreground font-jp mt-1">{firstKotobaSentence.reading}</p>
                <p className="text-[11px] text-muted-foreground italic mt-1">{firstKotobaSentence.meaning}</p>
              </div>
            )}

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
