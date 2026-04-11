import React, { useState, useMemo } from 'react';
import type { Kanji } from '../data';
import type { ProgressState } from '../store/useProgress';
import { Search, CheckCircle2, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface KanjiListProps {
  kanjiList: Kanji[];
  progress: ProgressState;
}

const KanjiList: React.FC<KanjiListProps> = ({ kanjiList, progress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lessonFilter, setLessonFilter] = useState<number | 'all'>('all');

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), [kanjiList]);

  const filteredList = useMemo(() => {
    return kanjiList.filter(k => {
      const matchLesson = lessonFilter === 'all' || k.lesson === lessonFilter;
      const term = searchTerm.toLowerCase();
      const matchSearch = k.kanji.includes(term) || 
                          k.meaning.toLowerCase().includes(term) || 
                          (k.kunyomi && k.kunyomi.toLowerCase().includes(term)) || 
                          (k.onyomi && k.onyomi.toLowerCase().includes(term)) ||
                          (k.kunyomi_romaji && k.kunyomi_romaji.includes(term)) ||
                          (k.onyomi_romaji && k.onyomi_romaji.includes(term));
      return matchLesson && matchSearch;
    });
  }, [kanjiList, lessonFilter, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-2xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari kanji, arti, atau romaji..." 
            className="w-full pl-10 pr-4 py-2 bg-secondary/20 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="text-muted-foreground w-5 h-5" />
          <select 
            className="bg-secondary/20 border-none rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            value={lessonFilter} 
            onChange={(e) => {
              const val = e.target.value;
              setLessonFilter(val === 'all' ? 'all' : parseInt(val, 10));
            }}
          >
            <option value="all">Semua Pelajaran</option>
            {Array.from({ length: maxLesson }, (_, i) => i + 1).map(l => (
              <option key={l} value={l}>Pelajaran {l}</option>
            ))}
          </select>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredList.map((kanji) => {
            const p = progress[kanji.id];
            const isMastered = p?.level === 5;
            return (
              <motion.div
                key={kanji.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 ${isMastered ? 'bg-success/5 ring-1 ring-success/20' : ''}`}>
                  <CardContent className="p-4 flex gap-4">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-xl text-3xl font-bold transition-colors ${isMastered ? 'bg-success text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                      {kanji.kanji}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg truncate pr-2">{kanji.meaning}</h4>
                        {isMastered && <CheckCircle2 className="w-5 h-5 text-success shrink-0" />}
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        {kanji.kunyomi && (
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase font-black text-orange-500/70 tracking-tighter">Kun</span>
                            <span className="text-xs font-bold leading-tight">
                              {kanji.kunyomi} <span className="text-[10px] font-medium text-muted-foreground">({kanji.kunyomi_romaji})</span>
                            </span>
                          </div>
                        )}
                        {kanji.onyomi && (
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase font-black text-blue-500/70 tracking-tighter">On</span>
                            <span className="text-xs font-bold leading-tight">
                              {kanji.onyomi} <span className="text-[10px] font-medium text-muted-foreground">({kanji.onyomi_romaji})</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto pt-2 flex justify-end">
                        <Badge variant="outline" className="text-[10px] px-1.5 h-5 opacity-50 font-black">L{kanji.lesson}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredList.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 text-muted-foreground"
        >
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Kanji tidak ditemukan.</p>
          <p className="text-sm">Coba kata kunci lain atau ubah filter pelajaran.</p>
        </motion.div>
      )}
    </div>
  );
};

export default KanjiList;