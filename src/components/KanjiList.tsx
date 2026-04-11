import React, { useState, useMemo } from 'react';
import type { Kanji } from '../data';
import type { ProgressState } from '../store/useProgress';
import { Search, CheckCircle2 } from 'lucide-react';
import './KanjiList.css';

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
                          (k.kunyomi && k.kunyomi.includes(term)) || 
                          (k.onyomi && k.onyomi.includes(term));
      return matchLesson && matchSearch;
    });
  }, [kanjiList, lessonFilter, searchTerm]);

  return (
    <div className="kanji-list-container">
      <div className="list-controls">
        <div className="search-box">
          <label htmlFor="searchInput" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0' }}>Search Kanji</label>
          <Search className="search-icon" size={20} aria-hidden="true" />
          <input 
            id="searchInput"
            type="text" 
            placeholder="Search kanji, meaning, reading..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="lesson-filter"
          value={lessonFilter} 
          onChange={(e) => {
            const val = e.target.value;
            setLessonFilter(val === 'all' ? 'all' : parseInt(val, 10));
          }}
        >
          <option value="all">All Lessons</option>
          {Array.from({ length: maxLesson }, (_, i) => i + 1).map(l => (
            <option key={l} value={l}>Lesson {l}</option>
          ))}
        </select>
      </div>

      <div className="kanji-grid">
        {filteredList.map(kanji => {
          const p = progress[kanji.id];
          const isMastered = p?.level === 5;
          return (
            <div key={kanji.id} className={`kanji-list-card ${isMastered ? 'mastered' : ''}`}>
              <div className="kanji-char">{kanji.kanji}</div>
              <div className="kanji-details">
                <h4>{kanji.meaning}</h4>
                <div className="readings">
                  {kanji.kunyomi && <span className="reading kun" title="Kunyomi">{kanji.kunyomi} {kanji.kunyomi_romaji ? `(${kanji.kunyomi_romaji})` : ''}</span>}
                  {kanji.onyomi && <span className="reading on" title="Onyomi">{kanji.onyomi} {kanji.onyomi_romaji ? `(${kanji.onyomi_romaji})` : ''}</span>}
                </div>
                <div className="card-footer">
                  <span className="lesson-tag">L{kanji.lesson}</span>
                  {isMastered && <span title="Mastered"><CheckCircle2 size={16} className="status-icon" /></span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredList.length === 0 && (
        <div className="no-results">No kanji found matching your search.</div>
      )}
    </div>
  );
};

export default KanjiList;