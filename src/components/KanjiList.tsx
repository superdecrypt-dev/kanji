import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Kanji } from '../data';
import { Search, Loader2, ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LessonSelector from './LessonSelector';
import { getMasteryLevel, getMasteryColor, getMasteryLabel } from '../hooks/useProgress';
import type { KanjiProgress, KotobaProgress } from '../hooks/useProgress';
import { exampleSentences } from '../exampleSentences';
import { kotobaList, getKotobaCategoryLabel } from '../kotobaData';
import { kotobaExampleSentences } from '../kotobaExampleSentences';
import { kanaToRomaji } from '../kanjiReadings';

type ListType = 'kanji' | 'kotoba';

interface KanjiListProps {
  kanjiList: Kanji[];
  progress: Record<number, KanjiProgress>;
  kotobaProgress: Record<string, KotobaProgress>;
  listType: ListType;
  onListTypeChange: (type: ListType) => void;
}

const KanjiList: React.FC<KanjiListProps> = ({ kanjiList, progress, kotobaProgress, listType, onListTypeChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), [kanjiList]);

  const filteredList = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return kanjiList.filter(k => {
      const matchLesson = selectedLessons.length === 0 || selectedLessons.includes(k.lesson);
      const matchSearch = !term || 
                          k.kanji.includes(term) || 
                          k.meaning.toLowerCase().includes(term) || 
                          (k.kunyomi && k.kunyomi.toLowerCase().includes(term)) || 
                          (k.onyomi && k.onyomi.toLowerCase().includes(term)) ||
                          (k.kunyomi_romaji && k.kunyomi_romaji.includes(term)) ||
                          (k.onyomi_romaji && k.onyomi_romaji.includes(term));
      return matchLesson && matchSearch;
    });
  }, [kanjiList, selectedLessons, searchTerm]);

  const filteredKotobaList = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return kotobaList.filter((item) => {
      const romaji = kanaToRomaji(item.reading);
      return (
        !term ||
        item.word.includes(term) ||
        item.meaning.toLowerCase().includes(term) ||
        item.reading.toLowerCase().includes(term) ||
        romaji.includes(term)
      );
    });
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setDisplayLimit(20);
  };

  const handleLessonChange = (lessons: number[]) => {
    setSelectedLessons(lessons);
    setDisplayLimit(20);
  };

  const scrollRoot = document.querySelector('main')?.parentElement;

  useEffect(() => {
    const activeLength = listType === 'kanji' ? filteredList.length : filteredKotobaList.length;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayLimit < activeLength) {
          setDisplayLimit((prev) => Math.min(prev + 20, activeLength));
        }
      },
      { threshold: 0.01, root: scrollRoot || null, rootMargin: '400px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [displayLimit, filteredList.length, filteredKotobaList.length, listType, scrollRoot]);

  const displayedItems = useMemo(() => filteredList.slice(0, displayLimit), [filteredList, displayLimit]);
  const displayedKotobaItems = useMemo(() => filteredKotobaList.slice(0, displayLimit), [filteredKotobaList, displayLimit]);

  return (
    <div className="space-y-5 md:space-y-8" data-testid="kanji-list">
      {/* Search & Filter */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex justify-center">
          <div className="flex p-1 bg-secondary rounded-xl border border-border" data-testid="list-type-selector">
            <button
              data-testid="list-type-kanji"
              onClick={() => {
                onListTypeChange('kanji');
                setDisplayLimit(20);
              }}
              className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                listType === 'kanji' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Kanji
            </button>
            <button
              data-testid="list-type-kotoba"
              onClick={() => {
                onListTypeChange('kotoba');
                setExpandedId(null);
                setDisplayLimit(20);
              }}
              className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                listType === 'kotoba' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Kotoba
            </button>
          </div>
        </div>

        <div className="relative" data-testid="kanji-search">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder={listType === 'kanji' ? 'Cari kanji, arti, cara baca...' : 'Cari kotoba, arti, cara baca...'} 
            data-testid="kanji-search-input"
            className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-card border border-border rounded-xl focus:border-foreground focus:ring-2 focus:ring-foreground/5 outline-none transition-all placeholder:text-muted-foreground/60 font-medium text-sm"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {listType === 'kanji' && (
          <LessonSelector 
            selectedLessons={selectedLessons} 
            onSelectLessons={handleLessonChange} 
            maxLesson={maxLesson} 
          />
        )}
      </div>

      {listType === 'kanji' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {displayedItems.map((kanji, index) => {
            const p = progress[kanji.id];
            const level = getMasteryLevel(p);
            const colorClass = getMasteryColor(level);
            const label = getMasteryLabel(level);
            const sentences = exampleSentences[kanji.kanji] || [];
            const cardKey = `kanji-${kanji.id}`;
            const isExpanded = expandedId === cardKey;

            return (
              <motion.div
                key={kanji.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                data-testid={`kanji-card-${kanji.id}`}
              >
                <div className={`group bg-card border border-border rounded-xl md:rounded-2xl hover:border-foreground/20 transition-all duration-200 h-full ${isExpanded ? 'ring-1 ring-primary/20' : ''}`}>
                  <div 
                    className="p-4 md:p-5 flex gap-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : cardKey)}
                    data-testid={`kanji-card-toggle-${kanji.id}`}
                  >
                    <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                      <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-secondary text-2xl md:text-3xl font-bold font-jp text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                        {kanji.kanji}
                        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${colorClass}`} title={label} data-testid={`mastery-${kanji.id}`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-base md:text-lg text-foreground truncate tracking-tight pr-2" data-testid={`kanji-meaning-${kanji.id}`}>
                          {kanji.meaning}
                        </h4>
                        {sentences.length > 0 && (
                          <ChevronDown className={`w-4 h-4 text-muted-foreground/40 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                      <div className="mt-1.5 space-y-1">
                        {kanji.kunyomi && (
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Kun</span>
                            <span className="text-xs font-medium text-muted-foreground font-jp">{kanji.kunyomi}</span>
                            {kanji.kunyomi_romaji && <span className="text-[10px] text-muted-foreground/60 italic">({kanji.kunyomi_romaji})</span>}
                          </div>
                        )}
                        {kanji.onyomi && (
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">On</span>
                            <span className="text-xs font-medium text-muted-foreground font-jp">{kanji.onyomi}</span>
                            {kanji.onyomi_romaji && <span className="text-[10px] text-muted-foreground/60 italic">({kanji.onyomi_romaji})</span>}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-medium text-muted-foreground/50">L{kanji.lesson}</span>
                        {level !== 'new' && p && (
                          <span className="text-[10px] font-bold text-muted-foreground/40">{p.correct}/{p.correct + p.wrong} benar</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && sentences.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 md:px-5 md:pb-5 border-t border-border pt-3 space-y-2.5" data-testid={`sentences-${kanji.id}`}>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Contoh Kalimat</p>
                          {sentences.map((s, i) => (
                            <div key={i} className="bg-secondary/50 rounded-lg p-3 space-y-1">
                              <p className="text-sm font-bold font-jp text-foreground">{s.japanese}</p>
                              <p className="text-xs text-muted-foreground font-jp">{s.reading}</p>
                              <p className="text-xs text-muted-foreground italic">{s.meaning}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {displayedKotobaItems.map((item, index) => (
            <motion.div
              key={`${item.word}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
              data-testid={`kotoba-card-${index}`}
            >
              {(() => {
                const p = kotobaProgress[item.word];
                const level = getMasteryLevel(p);
                const colorClass = getMasteryColor(level);
                const label = getMasteryLabel(level);
                const cardKey = `kotoba-${item.word}-${index}`;
                const sentences = kotobaExampleSentences[item.word] || [];
                const isExpanded = expandedId === cardKey;
                const isWideWord = item.word.length >= 3;
                return (
              <div className={`group bg-card border border-border rounded-xl md:rounded-2xl hover:border-foreground/20 transition-all duration-200 h-full ${isExpanded ? 'ring-1 ring-primary/20' : ''}`}>
                <div className="p-4 md:p-5 flex items-start gap-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : cardKey)}>
                  <div className="flex-shrink-0">
                      <div
                        className={`relative flex items-center justify-center rounded-xl bg-secondary font-bold font-jp text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-200 ${
                          isWideWord
                            ? 'min-w-[4.5rem] h-14 px-2.5 md:min-w-[5.25rem] md:h-16 md:px-3 text-lg md:text-xl'
                            : 'w-14 h-14 md:w-16 md:h-16 text-xl md:text-2xl'
                        }`}
                      >
                        {item.word}
                      <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${colorClass}`} title={label} data-testid={`kotoba-mastery-${index}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-base md:text-lg text-foreground tracking-tight pr-2" data-testid={`kotoba-meaning-${index}`}>
                        {item.meaning}
                      </h4>
                      {sentences.length > 0 && (
                        <ChevronDown className={`w-4 h-4 text-muted-foreground/40 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-medium text-muted-foreground font-jp">{item.reading}</p>
                      <p className="text-[10px] text-muted-foreground/60 italic">{kanaToRomaji(item.reading)}</p>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">Kotoba</span>
                        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                          {getKotobaCategoryLabel(item.word)}
                        </span>
                        {level !== 'new' && p && (
                          <span className="text-[10px] font-bold text-muted-foreground/40">{p.correct}/{p.correct + p.wrong} benar</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && sentences.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 md:px-5 md:pb-5 border-t border-border pt-3 space-y-2.5" data-testid={`kotoba-sentences-${index}`}>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Contoh Kalimat</p>
                        {sentences.map((s, i) => (
                          <div key={i} className="bg-secondary/50 rounded-lg p-3 space-y-1">
                            <p className="text-sm font-bold font-jp text-foreground">{s.japanese}</p>
                            <p className="text-xs text-muted-foreground font-jp">{s.reading}</p>
                            <p className="text-xs text-muted-foreground italic">{s.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
                );
              })()}
            </motion.div>
          ))}
        </div>
      )}

      {/* Loader */}
      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {displayLimit < (listType === 'kanji' ? filteredList.length : filteredKotobaList.length) && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold" data-testid="loading-indicator">
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat...
          </div>
        )}
      </div>
      
      {(listType === 'kanji' ? filteredList.length === 0 : filteredKotobaList.length === 0) && (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl" data-testid="no-results">
          <Search className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-base font-bold text-muted-foreground">{listType === 'kanji' ? 'Kanji tidak ditemukan.' : 'Kotoba tidak ditemukan.'}</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
};

export default KanjiList;
