import { useState, useEffect, useCallback } from 'react';

export interface KanjiProgress {
  correct: number;
  wrong: number;
  lastReviewed: string;
}

export type KotobaProgress = KanjiProgress;

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

const STORAGE_KEY = 'kanji-progress-v1';
const KOTOBA_STORAGE_KEY = 'kotoba-progress-v1';

function loadProgress(): Record<number, KanjiProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: Record<number, KanjiProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadKotobaProgress(): Record<string, KotobaProgress> {
  try {
    const raw = localStorage.getItem(KOTOBA_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveKotobaProgress(data: Record<string, KotobaProgress>) {
  localStorage.setItem(KOTOBA_STORAGE_KEY, JSON.stringify(data));
}

export function getMasteryLevel(p: KanjiProgress | undefined): MasteryLevel {
  if (!p || (p.correct === 0 && p.wrong === 0)) return 'new';
  const total = p.correct + p.wrong;
  const accuracy = p.correct / total;
  if (p.correct >= 8 && accuracy >= 0.8) return 'mastered';
  if (p.correct >= 3) return 'reviewing';
  return 'learning';
}

export function getMasteryColor(level: MasteryLevel): string {
  switch (level) {
    case 'mastered': return 'bg-green-500';
    case 'reviewing': return 'bg-blue-500';
    case 'learning': return 'bg-orange-500';
    case 'new': return 'bg-neutral-300 dark:bg-neutral-600';
  }
}

export function getMasteryLabel(level: MasteryLevel): string {
  switch (level) {
    case 'mastered': return 'Dikuasai';
    case 'reviewing': return 'Mengulang';
    case 'learning': return 'Belajar';
    case 'new': return 'Belum';
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<number, KanjiProgress>>(loadProgress);
  const [kotobaProgress, setKotobaProgress] = useState<Record<string, KotobaProgress>>(loadKotobaProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveKotobaProgress(kotobaProgress);
  }, [kotobaProgress]);

  const recordAnswer = useCallback((kanjiId: number, isCorrect: boolean) => {
    setProgress(prev => {
      const current = prev[kanjiId] || { correct: 0, wrong: 0, lastReviewed: '' };
      return {
        ...prev,
        [kanjiId]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          wrong: current.wrong + (isCorrect ? 0 : 1),
          lastReviewed: new Date().toISOString(),
        }
      };
    });
  }, []);

  const getProgress = useCallback((kanjiId: number): KanjiProgress | undefined => {
    return progress[kanjiId];
  }, [progress]);

  const recordKotobaAnswer = useCallback((kotobaWord: string, isCorrect: boolean) => {
    setKotobaProgress(prev => {
      const current = prev[kotobaWord] || { correct: 0, wrong: 0, lastReviewed: '' };
      return {
        ...prev,
        [kotobaWord]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          wrong: current.wrong + (isCorrect ? 0 : 1),
          lastReviewed: new Date().toISOString(),
        }
      };
    });
  }, []);

  const getKotobaProgress = useCallback((kotobaWord: string): KotobaProgress | undefined => {
    return kotobaProgress[kotobaWord];
  }, [kotobaProgress]);

  const getOverallStats = useCallback(() => {
    const entries = Object.values(progress);
    const totalReviewed = entries.filter(p => p.correct + p.wrong > 0).length;
    const mastered = entries.filter(p => getMasteryLevel(p) === 'mastered').length;
    const reviewing = entries.filter(p => getMasteryLevel(p) === 'reviewing').length;
    const learning = entries.filter(p => getMasteryLevel(p) === 'learning').length;
    const totalCorrect = entries.reduce((sum, p) => sum + p.correct, 0);
    const totalWrong = entries.reduce((sum, p) => sum + p.wrong, 0);
    const totalAnswers = totalCorrect + totalWrong;
    return {
      totalReviewed,
      mastered,
      reviewing,
      learning,
      accuracy: totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0,
    };
  }, [progress]);

  const getOverallKotobaStats = useCallback(() => {
    const entries = Object.values(kotobaProgress);
    const totalReviewed = entries.filter(p => p.correct + p.wrong > 0).length;
    const mastered = entries.filter(p => getMasteryLevel(p) === 'mastered').length;
    const reviewing = entries.filter(p => getMasteryLevel(p) === 'reviewing').length;
    const learning = entries.filter(p => getMasteryLevel(p) === 'learning').length;
    const totalCorrect = entries.reduce((sum, p) => sum + p.correct, 0);
    const totalWrong = entries.reduce((sum, p) => sum + p.wrong, 0);
    const totalAnswers = totalCorrect + totalWrong;
    return {
      totalReviewed,
      mastered,
      reviewing,
      learning,
      accuracy: totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0,
    };
  }, [kotobaProgress]);

  const getCombinedStats = useCallback(() => {
    const kanjiEntries = Object.values(progress);
    const kotobaEntries = Object.values(kotobaProgress);
    const entries = [...kanjiEntries, ...kotobaEntries];
    const totalReviewed = entries.filter(p => p.correct + p.wrong > 0).length;
    const mastered = entries.filter(p => getMasteryLevel(p) === 'mastered').length;
    const reviewing = entries.filter(p => getMasteryLevel(p) === 'reviewing').length;
    const learning = entries.filter(p => getMasteryLevel(p) === 'learning').length;
    const totalCorrect = entries.reduce((sum, p) => sum + p.correct, 0);
    const totalWrong = entries.reduce((sum, p) => sum + p.wrong, 0);
    const totalAnswers = totalCorrect + totalWrong;
    return {
      totalReviewed,
      mastered,
      reviewing,
      learning,
      accuracy: totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0,
    };
  }, [progress, kotobaProgress]);

  const resetProgress = useCallback(() => {
    setProgress({});
    setKotobaProgress({});
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(KOTOBA_STORAGE_KEY);
  }, []);

  return {
    progress,
    kotobaProgress,
    recordAnswer,
    recordKotobaAnswer,
    getProgress,
    getKotobaProgress,
    getOverallStats,
    getOverallKotobaStats,
    getCombinedStats,
    resetProgress
  };
}

// Adaptive quiz: pick kanji weighted by weakness
export function pickAdaptiveKanji<T extends { id: number }>(
  kanjiList: T[],
  progress: Record<number, KanjiProgress>,
  recentIds: number[],
  count: number = 1
): T[] {
  if (kanjiList.length === 0) return [];

  const weighted = kanjiList.map(k => {
    const p = progress[k.id];
    const level = getMasteryLevel(p);
    const isRecent = recentIds.includes(k.id);

    let weight: number;
    switch (level) {
      case 'new': weight = 3; break;
      case 'learning': weight = 5; break;      // highest priority
      case 'reviewing': weight = 2; break;
      case 'mastered': weight = 0.5; break;
    }

    // Boost recently wrong answers
    if (p && p.wrong > 0) {
      const accuracy = p.correct / (p.correct + p.wrong);
      if (accuracy < 0.5) weight *= 1.5;
    }

    // Reduce recent items
    if (isRecent) weight *= 0.2;

    return { kanji: k, weight };
  });

  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
  const results: T[] = [];
  const usedIds = new Set<number>();

  for (let i = 0; i < count && usedIds.size < kanjiList.length; i++) {
    let rand = Math.random() * totalWeight;
    for (const item of weighted) {
      if (usedIds.has(item.kanji.id)) continue;
      rand -= item.weight;
      if (rand <= 0) {
        results.push(item.kanji);
        usedIds.add(item.kanji.id);
        break;
      }
    }
    // Fallback
    if (results.length <= i) {
      const remaining = kanjiList.filter(k => !usedIds.has(k.id));
      if (remaining.length > 0) {
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        results.push(pick);
        usedIds.add(pick.id);
      }
    }
  }

  return results;
}

export function pickAdaptiveByKey<T>(
  items: T[],
  progress: Record<string, KotobaProgress>,
  recentKeys: string[],
  getKey: (item: T) => string,
  count: number = 1
): T[] {
  if (items.length === 0) return [];

  const weighted = items.map(item => {
    const key = getKey(item);
    const p = progress[key];
    const level = getMasteryLevel(p);
    const isRecent = recentKeys.includes(key);

    let weight: number;
    switch (level) {
      case 'new': weight = 3; break;
      case 'learning': weight = 5; break;
      case 'reviewing': weight = 2; break;
      case 'mastered': weight = 0.5; break;
    }

    if (p && p.wrong > 0) {
      const accuracy = p.correct / (p.correct + p.wrong);
      if (accuracy < 0.5) weight *= 1.5;
    }

    if (isRecent) weight *= 0.2;

    return { item, key, weight };
  });

  const results: T[] = [];
  const usedKeys = new Set<string>();

  for (let i = 0; i < count && usedKeys.size < items.length; i++) {
    const available = weighted.filter(entry => !usedKeys.has(entry.key));
    const totalWeight = available.reduce((sum, entry) => sum + entry.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const entry of available) {
      rand -= entry.weight;
      if (rand <= 0) {
        results.push(entry.item);
        usedKeys.add(entry.key);
        break;
      }
    }

    if (results.length <= i) {
      const remaining = available.filter(entry => !usedKeys.has(entry.key));
      if (remaining.length > 0) {
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        results.push(pick.item);
        usedKeys.add(pick.key);
      }
    }
  }

  return results;
}
