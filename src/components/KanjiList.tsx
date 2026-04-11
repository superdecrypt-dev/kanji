import React, { useState, useMemo, useEffect } from 'react';
import type { Kanji } from '../data';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { AudioButton } from './AudioPlayer';
import { Button } from './ui/button';

interface KanjiListProps {
  kanjiList: Kanji[];
}

const KanjiList: React.FC<KanjiListProps> = ({ kanjiList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lessonFilter, setLessonFilter] = useState<number | 'all'>('all');
  const [displayLimit, setDisplayLimit] = useState(20);

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), [kanjiList]);

  const filteredList = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return kanjiList.filter(k => {
      const matchLesson = lessonFilter === 'all' || k.lesson === lessonFilter;
      const matchSearch = !term || 
                          k.kanji.includes(term) || 
                          k.meaning.toLowerCase().includes(term) || 
                          (k.kunyomi && k.kunyomi.toLowerCase().includes(term)) || 
                          (k.onyomi && k.onyomi.toLowerCase().includes(term)) ||
                          (k.kunyomi_romaji && k.kunyomi_romaji.includes(term)) ||
                          (k.onyomi_romaji && k.onyomi_romaji.includes(term));
      return matchLesson && matchSearch;
    });
  }, [kanjiList, lessonFilter, searchTerm]);

  // Show more items when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
        setDisplayLimit(prev => Math.min(prev + 20, filteredList.length));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredList.length]);

  // Reset limit when searching
  useEffect(() => {
    setDisplayLimit(20);
  }, [searchTerm, lessonFilter]);

  const displayedItems = useMemo(() => filteredList.slice(0, displayLimit), [filteredList, displayLimit]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 bg-white/5 backdrop-blur-2xl p-6 rounded-[2rem] border-2 border-white/10 shadow-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 opacity-50" />
          <input 
            type="text" 
            placeholder="Cari kanji, arti, atau romaji..." 
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="text-muted-foreground w-5 h-5 opacity-50" />
          <select 
            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-primary cursor-pointer font-bold"
            value={lessonFilter} 
            onChange={(e) => {
              const val = e.target.value;
              setLessonFilter(val === 'all' ? 'all' : parseInt(val, 10));
            }}
          >
            <option value="all">Semua Materi</option>
            {Array.from({ length: maxLesson }, (_, i) => i + 1).map(l => (
              <option key={l} value={l}>Lesson {l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((kanji) => (
          <motion.div
            key={kanji.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'opacity' }}
          >
            <Card className="group overflow-hidden border-white/10 h-full">
              <CardContent className="p-6 flex gap-5">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl font-black transition-all duration-500 shadow-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    {kanji.kanji}
                  </div>
                  <AudioButton text={kanji.kanji} size={14} className="h-9 w-9 bg-white/5" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-lg truncate pr-2 tracking-tight">{kanji.meaning}</h4>
                  </div>
                  <div className="space-y-3">
                    {kanji.kunyomi && (
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-orange-500/60 tracking-widest leading-none mb-1">Kun</span>
                        <span className="text-sm font-bold leading-tight">
                          {kanji.kunyomi} <span className="text-[10px] font-medium text-muted-foreground opacity-60">({kanji.kunyomi_romaji})</span>
                        </span>
                      </div>
                    )}
                    {kanji.onyomi && (
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-blue-500/60 tracking-widest leading-none mb-1">On</span>
                        <span className="text-sm font-bold leading-tight">
                          {kanji.onyomi} <span className="text-[10px] font-medium text-muted-foreground opacity-60">({kanji.onyomi_romaji})</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex justify-end">
                    <Badge variant="outline" className="text-[10px] px-2 h-5 opacity-40 font-black border-white/20">L{kanji.lesson}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredList.length > displayLimit && (
        <div className="text-center py-10">
          <Button 
            variant="ghost" 
            onClick={() => setDisplayLimit(prev => prev + 50)}
            className="text-primary font-black animate-pulse"
          >
            Memuat lebih banyak kanji...
          </Button>
        </div>
      )}
      
      {filteredList.length === 0 && (
        <div className="text-center py-20 text-muted-foreground bg-white/5 rounded-[2.5rem] border-2 border-dashed border-white/10">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Kanji tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
};

export default KanjiList;