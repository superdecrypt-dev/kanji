import React, { useState } from 'react';
import type { Kanji } from '../data';
import type { KanjiProgress } from '../store/useProgress';
import { CheckCircle2 } from 'lucide-react';
import './Flashcard.css';

interface FlashcardProps {
  kanji: Kanji;
  progress?: KanjiProgress;
  onMarkMastered: () => void;
  onNext: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ kanji, progress, onMarkMastered, onNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isMastered = progress?.level === 5;

  return (
    <div className="flashcard-wrapper">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        aria-label={`Flashcard for ${kanji.kanji}. Click or press enter to flip.`}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            {isMastered && <CheckCircle2 className="mastered-icon" size={24} />}
            <span className="kanji-text">{kanji.kanji}</span>
          </div>
          <div className="flashcard-back">
            <h3>{kanji.meaning}</h3>
            <p><strong>Kun:</strong> {kanji.kunyomi || '-'} {kanji.kunyomi_romaji ? `(${kanji.kunyomi_romaji})` : ''}</p>
            <p><strong>On:</strong> {kanji.onyomi || '-'} {kanji.onyomi_romaji ? `(${kanji.onyomi_romaji})` : ''}</p>
            <p className="lesson-badge">Lesson {kanji.lesson}</p>
            {progress && progress.level > 0 && !isMastered && (
              <p className="srs-level">Level: {progress.level}</p>
            )}
          </div>
        </div>
      </div>
      
      {isFlipped && (
        <div className="flashcard-actions">
           {!isMastered && (
             <button 
               className="btn-master"
               onClick={(e) => { e.stopPropagation(); onMarkMastered(); onNext(); }}
             >
               <CheckCircle2 size={16} /> Mark as Mastered
             </button>
           )}
        </div>
      )}
    </div>
  );
};

export default Flashcard;