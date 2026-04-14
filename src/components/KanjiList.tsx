import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Kanji } from '../data';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LessonSelector from './LessonSelector';

interface KanjiListProps {
  kanjiList: Kanji[];
}

const KanjiList: React.FC<KanjiListProps> = ({ kanjiList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [displayLimit, setDisplayLimit] = useState(20);
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

  useEffect(() => {
    const scrollRoot = document.querySelector('main')?.parentElement;
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
  }, [displayLimit, filteredList.length]);

  useEffect(() => {
    setDisplayLimit(20);
  }, [searchTerm, selectedLessons]);

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <LessonSelector 
          selectedLessons={selectedLessons} 
          onSelectLessons={setSelectedLessons} 
          maxLesson={maxLesson} 
        />
      </div>

      {/* Kanji Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {displayedItems.map((kanji, index) => (
          <motion.div
            key={kanji.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
            data-testid={`kanji-card-${kanji.id}`}
          >
            <div className="group bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-5 flex gap-4 hover:border-foreground/20 transition-all duration-200 h-full">
              {/* Kanji Character */}
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-secondary text-2xl md:text-3xl font-bold font-jp text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                {kanji.kanji}
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base md:text-lg text-foreground truncate tracking-tight" data-testid={`kanji-meaning-${kanji.id}`}>
                  {kanji.meaning}
                </h4>
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
                <div className="mt-2">
                  <span className="text-[10px] font-medium text-muted-foreground/50">N4-L{kanji.lesson}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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
