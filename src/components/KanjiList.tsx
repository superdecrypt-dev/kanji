import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Kanji } from '../data';
import { Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
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
    <div className="space-y-6 sm:space-y-10">
      {/* Premium Glass Search & Filter Bar */}
      <div className="flex flex-col gap-4 sm:gap-6 bg-white/5 backdrop-blur-3xl p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border-2 border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
        
        {/* Search Input */}
        <div className="relative group w-full">
          <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5 transition-transform group-focus-within:scale-110" />
          <input 
            type="text" 
            placeholder="Cari kanji, arti..." 
            className="w-full pl-12 sm:pl-14 pr-6 py-3 sm:py-4 bg-white/5 border-2 border-white/10 rounded-2xl focus:border-primary/40 focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted-foreground/40 font-bold text-sm uppercase tracking-wider"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">Pilih Materi:</span>
          <LessonSelector 
            selectedLessons={selectedLessons} 
            onSelectLessons={setSelectedLessons} 
            maxLesson={maxLesson} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {displayedItems.map((kanji) => (
          <motion.div
            key={kanji.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ willChange: 'opacity, transform' }}
          >
            <Card className="group overflow-hidden border-white/10 h-full hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-5 sm:p-8 flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[1.5rem] text-3xl sm:text-4xl font-black transition-all duration-500 shadow-xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 shadow-primary/10 group-hover:shadow-primary/30">
                    {kanji.kanji}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-black text-xl truncate pr-2 tracking-tight text-foreground uppercase italic">{kanji.meaning}</h4>
                  </div>
                  <div className="space-y-4">
                    {kanji.kunyomi && (
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black text-orange-500/60 tracking-widest leading-none mb-1.5">Kun</span>
                        <span className="text-sm font-bold leading-tight flex flex-wrap gap-1 items-center">
                          {kanji.kunyomi} 
                          <span className="text-[10px] font-black text-foreground opacity-80 lowercase italic tracking-normal ml-1">({kanji.kunyomi_romaji})</span>
                        </span>
                      </div>
                    )}
                    {kanji.onyomi && (
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black text-blue-500/60 tracking-widest leading-none mb-1.5">On</span>
                        <span className="text-sm font-bold leading-tight flex flex-wrap gap-1 items-center">
                          {kanji.onyomi} 
                          <span className="text-[10px] font-black text-foreground opacity-80 lowercase italic tracking-normal ml-1">({kanji.onyomi_romaji})</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-6 flex justify-end">
                    <Badge variant="outline" className="text-[10px] px-3 h-6 opacity-30 font-black border-white/20 tracking-tighter rounded-full">LEVEL N4-L{kanji.lesson}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div ref={loaderRef} className="h-40 flex items-center justify-center">
        {displayLimit < filteredList.length && (
          <div className="flex items-center gap-3 text-primary/50 font-black text-[10px] uppercase tracking-[0.4em] bg-white/5 px-10 py-5 rounded-full border border-white/5 shadow-xl animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin" />
            Synchronizing...
          </div>
        )}
      </div>
      
      {filteredList.length === 0 && (
        <div className="text-center py-24 text-muted-foreground bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10 shadow-inner">
          <Search className="w-16 h-16 mx-auto mb-6 opacity-10 animate-bounce" />
          <p className="text-2xl font-black uppercase tracking-tighter opacity-40">Kanji tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
};

export default KanjiList;