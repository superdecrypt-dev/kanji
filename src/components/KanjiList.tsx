import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Kanji } from '../data';
import { Search, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LessonSelector from './LessonSelector';
import { getMasteryLevel, getMasteryColor, getMasteryLabel } from '../hooks/useProgress';
import type { KanjiProgress } from '../hooks/useProgress';
import { exampleSentences } from '../exampleSentences';

interface KanjiListProps {
  kanjiList: Kanji[];
  progress: Record<number, KanjiProgress>;
}

const KanjiList: React.FC<KanjiListProps> = ({ kanjiList, progress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [expandedId, setExpandedId] = useState<number | null>(null);
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayLimit < filteredList.length) {
          setDisplayLimit((prev) => Math.min(prev + 20, filteredList.length));
        }
      },
      { threshold: 0.01, root: scrollRoot || null, rootMargin: '400px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [displayLimit, filteredList.length, scrollRoot]);

  const displayedItems = useMemo(() => filteredList.slice(0, displayLimit), [filteredList, displayLimit]);

  return (
    <div className="space-y-5 md:space-y-8" data-testid="kanji-list">
      {/* Search & Filter */}
      <div className="space-y-3 md:space-y-4">
        <div className="relative" data-testid="kanji-search">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari kanji, arti, cara baca..." 
            data-testid="kanji-search-input"
            className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-card border border-border rounded-xl focus:border-foreground focus:ring-2 focus:ring-foreground/5 outline-none transition-all placeholder:text-muted-foreground/60 font-medium text-sm"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <LessonSelector 
          selectedLessons={selectedLessons} 
          onSelectLessons={handleLessonChange} 
          maxLesson={maxLesson} 
        />
      </div>

      {/* Kanji Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {displayedItems.map((kanji, index) => {
          const p = progress[kanji.id];
          const level = getMasteryLevel(p);
          const colorClass = getMasteryColor(level);
          const label = getMasteryLabel(level);
          const sentences = exampleSentences[kanji.kanji] || [];
          const isExpanded = expandedId === kanji.id;

          return (
            <motion.div
              key={kanji.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
              data-testid={`kanji-card-${kanji.id}`}
            >
              <div className={`group bg-card border border-border rounded-xl md:rounded-2xl hover:border-foreground/20 transition-all duration-200 h-full ${isExpanded ? 'ring-1 ring-primary/20' : ''}`}>
                {/* Main Card Content */}
                <div 
                  className="p-4 md:p-5 flex gap-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : kanji.id)}
                  data-testid={`kanji-card-toggle-${kanji.id}`}
                >
                  {/* Kanji Character */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                    <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-secondary text-2xl md:text-3xl font-bold font-jp text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      {kanji.kanji}
                      {/* Mastery dot */}
                      <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${colorClass}`} title={label} data-testid={`mastery-${kanji.id}`} />
                    </div>
                  </div>
                  
                  {/* Info */}
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

                {/* Example Sentences (Expandable) */}
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

      {/* Loader */}
      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {displayLimit < filteredList.length && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold" data-testid="loading-indicator">
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat...
          </div>
        )}
      </div>
      
      {filteredList.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl" data-testid="no-results">
          <Search className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-base font-bold text-muted-foreground">Kanji tidak ditemukan.</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
};

export default KanjiList;
