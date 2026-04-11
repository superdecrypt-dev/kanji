import { useState, useEffect } from 'react';

export interface KanjiProgress {
  level: number; // 0 = new/learning, 1-4 = intervals, 5 = mastered
  nextReview: number; // timestamp
  correctCount: number;
  incorrectCount: number;
}

export type ProgressState = Record<number, KanjiProgress>;

export interface AppMetadata {
  streak: number;
  lastActivityDate: string; // YYYY-MM-DD
}

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

  const [metadata, setMetadata] = useState<AppMetadata>(() => {
    const saved = localStorage.getItem('n4-kanji-metadata');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse metadata", e);
      }
    }
    return { streak: 0, lastActivityDate: '' };
  });

  const isLoaded = true;

  // Sync streak on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = metadata.lastActivityDate;

    if (lastDate && lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastDate !== yesterdayStr) {
        // Streak broken
        const newMeta = { ...metadata, streak: 0 };
        setMetadata(newMeta);
        localStorage.setItem('n4-kanji-metadata', JSON.stringify(newMeta));
      }
    }
  }, []);

  const updateMetadata = () => {
    const today = new Date().toISOString().split('T')[0];
    if (metadata.lastActivityDate === today) return;

    setMetadata((prev) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = prev.streak;
      if (prev.lastActivityDate === yesterdayStr) {
        newStreak += 1;
      } else if (!prev.lastActivityDate || prev.lastActivityDate !== today) {
        newStreak = 1;
      }

      const newMeta = { streak: newStreak, lastActivityDate: today };
      localStorage.setItem('n4-kanji-metadata', JSON.stringify(newMeta));
      return newMeta;
    });
  };

  const updateKanji = (kanjiId: number, isCorrect: boolean) => {
    updateMetadata();
    setProgress((prev) => {
      const current = prev[kanjiId] || { level: 0, nextReview: 0, correctCount: 0, incorrectCount: 0 };
      
      let newLevel = current.level;
      let newNextReview = current.nextReview;

      if (isCorrect) {
        newLevel = Math.min(5, current.level + 1);
      } else {
        newLevel = Math.max(0, current.level - 1); // Penalty on wrong answer
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
      
      localStorage.setItem('n4-kanji-progress', JSON.stringify(newState));
      return newState;
    });
  };

  const markMastered = (kanjiId: number) => {
    updateMetadata();
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
    setMetadata({ streak: 0, lastActivityDate: '' });
    localStorage.removeItem('n4-kanji-progress');
    localStorage.removeItem('n4-kanji-metadata');
  };

  return { progress, metadata, updateKanji, markMastered, resetProgress, isLoaded };
}
