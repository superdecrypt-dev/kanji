import { useState } from 'react';

export interface KanjiProgress {
  level: number; // 0 = new/learning, 1-4 = intervals, 5 = mastered
  nextReview: number; // timestamp
  correctCount: number;
  incorrectCount: number;
}

export type ProgressState = Record<number, KanjiProgress>;

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('n4-kanji-progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    return {};
  });
  const isLoaded = true;



  const updateKanji = (kanjiId: number, isCorrect: boolean) => {
    setProgress((prev) => {
      const current = prev[kanjiId] || { level: 0, nextReview: 0, correctCount: 0, incorrectCount: 0 };
      
      let newLevel = current.level;
      let newNextReview = current.nextReview;

      if (isCorrect) {
        newLevel = Math.min(5, current.level + 1);
      } else {
        newLevel = Math.max(0, current.level - 1); // Penality on wrong answer
      }

      // Intervals (ms): 1m, 10m, 2h, 12h, 24h
      const intervals = [0, 60 * 1000, 10 * 60 * 1000, 2 * 60 * 60 * 1000, 12 * 60 * 60 * 1000, 24 * 60 * 60 * 1000];
      if (newLevel > 0 && newLevel < 5) {
        newNextReview = Date.now() + intervals[newLevel];
      } else if (newLevel === 5) {
        newNextReview = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days review for mastered
      } else {
        newNextReview = Date.now();
      }

      const newState = {
        ...prev,
        [kanjiId]: {
          level: newLevel,
          nextReview: newNextReview,
          correctCount: current.correctCount + (isCorrect ? 1 : 0),
          incorrectCount: current.incorrectCount + (isCorrect ? 0 : 1),
        }
      };
      
      // we need to save to localstorage too
      localStorage.setItem('n4-kanji-progress', JSON.stringify(newState));
      return newState;
    });
  };

  const markMastered = (kanjiId: number) => {
    setProgress((prev) => {
       const newState = {
        ...prev,
        [kanjiId]: {
          level: 5,
          nextReview: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
          correctCount: (prev[kanjiId]?.correctCount || 0) + 1,
          incorrectCount: prev[kanjiId]?.incorrectCount || 0,
        }
      };
      localStorage.setItem('n4-kanji-progress', JSON.stringify(newState));
      return newState;
    });
  };

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem('n4-kanji-progress');
  };

  return { progress, updateKanji, markMastered, resetProgress, isLoaded };
}
