import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Kanji } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, SkipForward } from 'lucide-react';
import { pickAdaptiveKanji, getMasteryLevel, getMasteryColor, getMasteryLabel } from '../hooks/useProgress';
import type { KanjiProgress } from '../hooks/useProgress';
import LessonSelector from './LessonSelector';

interface TypingQuizProps {
  kanjiList: Kanji[];
  progress: Record<number, KanjiProgress>;
  onAnswer: (kanjiId: number, isCorrect: boolean) => void;
}

type QuestionMode = 'meaning' | 'reading' | 'mixed';
type ReadingType = 'kunyomi' | 'onyomi';

interface QuizState {
  kanji: Kanji;
  isMeaning: boolean;
  readingType?: ReadingType; // only set when isMeaning is false
}

const splitJapaneseStr = (str: string | undefined | null): string[] => {
  if (!str) return [];
  return str.split(/[,/]/).map(s => s.trim().toLowerCase()).filter(Boolean);
};

const TypingQuiz: React.FC<TypingQuizProps> = ({ kanjiList, progress: progressData, onAnswer }) => {
  const [questionMode, setQuestionMode] = useState<QuestionMode>('mixed');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [input, setInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectAnim, setIsCorrectAnim] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), [kanjiList]);

  const filteredKanji = useMemo(() => {
    return selectedLessons.length === 0 ? kanjiList : kanjiList.filter(k => selectedLessons.includes(k.lesson));
  }, [kanjiList, selectedLessons]);

  const loadNewQuestion = (list?: Kanji[], mode?: QuestionMode) => {
    const useList = list || filteredKanji;
    const useMode = mode || questionMode;
    if (useList.length === 0) return;

    let randomKanji: Kanji;
    if (progressData && Object.keys(progressData).length > 0) {
      const picked = pickAdaptiveKanji(useList, progressData, recentIds, 1);
      randomKanji = picked[0] || useList[Math.floor(Math.random() * useList.length)];
    } else {
      randomKanji = useList[Math.floor(Math.random() * useList.length)];
    }

    let isMeaning: boolean;
    if (useMode === 'meaning') isMeaning = true;
    else if (useMode === 'reading') isMeaning = false;
    else isMeaning = Math.random() > 0.5;

    // For reading questions, pick kunyomi or onyomi specifically
    let readingType: ReadingType | undefined;
    if (!isMeaning) {
      const hasKun = !!randomKanji.kunyomi;
      const hasOn = !!randomKanji.onyomi;
      if (hasKun && hasOn) {
        readingType = Math.random() > 0.5 ? 'kunyomi' : 'onyomi';
      } else if (hasKun) {
        readingType = 'kunyomi';
      } else {
        readingType = 'onyomi';
      }
    }

    setQuizState({ kanji: randomKanji, isMeaning, readingType });
    setInput('');
    setIsWrong(false);
    setShowAnswer(false);
    setIsCorrectAnim(false);
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    loadNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredKanji]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizState || !input.trim() || showAnswer || isCorrectAnim) return;

    const userAns = input.trim().toLowerCase();
    let isCorrect = false;

    if (quizState.isMeaning) {
      const validMeanings = splitJapaneseStr(quizState.kanji.meaning);
      isCorrect = validMeanings.some(m => m === userAns || m.includes(userAns) || userAns.includes(m));
    } else {
      // Validate against specific reading type
      let validReadings: string[];
      if (quizState.readingType === 'kunyomi') {
        validReadings = [
          ...splitJapaneseStr(quizState.kanji.kunyomi_romaji),
          ...splitJapaneseStr(quizState.kanji.kunyomi),
        ];
      } else {
        validReadings = [
          ...splitJapaneseStr(quizState.kanji.onyomi_romaji),
          ...splitJapaneseStr(quizState.kanji.onyomi),
        ];
      }
      isCorrect = validReadings.some(r => r === userAns);
    }

    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    onAnswer(quizState.kanji.id, isCorrect);
    setRecentIds(prev => [...prev.slice(-14), quizState.kanji.id]);

    if (isCorrect) {
      setIsCorrectAnim(true);
      setTimeout(() => loadNewQuestion(), 800);
    } else {
      setIsWrong(true);
      setShowAnswer(true);
      setTimeout(() => loadNewQuestion(), 2500);
    }
  };

  const handleSkip = () => {
    if (!quizState || showAnswer || isCorrectAnim) return;
    setIsWrong(true);
    setShowAnswer(true);
    setScore(prev => ({ total: prev.total + 1, correct: prev.correct }));
    onAnswer(quizState.kanji.id, false);
    setRecentIds(prev => [...prev.slice(-14), quizState.kanji.id]);
    setTimeout(() => loadNewQuestion(), 2500);
  };

  const handleModeChange = (newMode: QuestionMode) => {
    setQuestionMode(newMode);
    setScore({ correct: 0, total: 0 });
    setRecentIds([]);
    loadNewQuestion(undefined, newMode);
  };

  const handleLessonChange = (lessons: number[]) => {
    setSelectedLessons(lessons);
    setScore({ correct: 0, total: 0 });
    setRecentIds([]);
  };

  const getHintText = (): string => {
    if (!quizState) return '';
    if (quizState.isMeaning) {
      const meaning = quizState.kanji.meaning;
      if (meaning.length <= 2) return meaning[0] + '...';
      return meaning.substring(0, Math.ceil(meaning.length / 3)) + '...';
    } else {
      const reading = quizState.readingType === 'kunyomi' 
        ? (quizState.kanji.kunyomi_romaji || quizState.kanji.kunyomi || '')
        : (quizState.kanji.onyomi_romaji || quizState.kanji.onyomi || '');
      if (!reading) return '...';
      const first = reading.split(/[,/]/)[0].trim();
      return first.substring(0, Math.ceil(first.length / 3)) + '...';
    }
  };

  if (!quizState) return <div className="text-center py-16 text-muted-foreground font-bold">Memuat...</div>;

  const { kanji, isMeaning, readingType } = quizState;
  const questionLabel = isMeaning 
    ? 'Ketik Arti (Bahasa Indonesia)' 
    : `Ketik ${readingType === 'kunyomi' ? 'Kunyomi' : 'Onyomi'} (Romaji/Kana)`;
  
  const correctAnswersDisplay = isMeaning 
    ? kanji.meaning 
    : readingType === 'kunyomi'
      ? [kanji.kunyomi, kanji.kunyomi_romaji ? `(${kanji.kunyomi_romaji})` : ''].filter(Boolean).join(' ')
      : [kanji.onyomi, kanji.onyomi_romaji ? `(${kanji.onyomi_romaji})` : ''].filter(Boolean).join(' ');

  const p = progressData[kanji.id];
  const level = getMasteryLevel(p);
  const masteryColorClass = getMasteryColor(level);
  const masteryLabelText = getMasteryLabel(level);

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-5" data-testid="typing-quiz">
      {/* Lesson Filter */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Pilih Pelajaran</p>
        <LessonSelector
          selectedLessons={selectedLessons}
          onSelectLessons={handleLessonChange}
          maxLesson={maxLesson}
        />
      </div>

      {filteredKanji.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
          <p className="text-lg font-bold text-muted-foreground">Kanji tidak ditemukan.</p>
        </div>
      ) : (
        <>
          {/* Mode Selector */}
          <div className="flex items-center justify-between">
            <div className="flex p-1 bg-secondary rounded-lg border border-border" data-testid="typing-mode-selector">
              {(['meaning', 'reading', 'mixed'] as QuestionMode[]).map(m => (
                <button
                  key={m}
                  data-testid={`typing-mode-${m}`}
                  onClick={() => handleModeChange(m)}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${questionMode === m ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {m === 'meaning' ? 'Arti' : m === 'reading' ? 'Baca' : 'Campur'}
                </button>
              ))}
            </div>
            <div className="text-sm font-bold text-foreground" data-testid="typing-quiz-score">
              <span className="text-primary">{score.correct}</span><span className="text-muted-foreground">/{score.total}</span>
              {score.total > 0 && <span className="text-xs text-muted-foreground ml-2">{Math.round((score.correct / score.total) * 100)}%</span>}
            </div>
          </div>

          {/* Question Card */}
          <motion.div key={kanji.id + (isMeaning ? 'm' : 'r')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className={`bg-card border-2 rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-10 text-center transition-all duration-300 ${
              showAnswer ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : (isCorrectAnim ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-border')
            }`} data-testid="typing-question-card">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">{questionLabel}</p>
              
              <motion.div 
                animate={isWrong ? { x: [-8, 8, -8, 8, 0] } : {}}
                className="text-5xl sm:text-6xl md:text-8xl font-bold text-primary leading-none font-jp mb-2"
                data-testid="typing-kanji-display"
              >
                {kanji.kanji}
              </motion.div>

              {/* Kanji Info */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className={`w-2 h-2 rounded-full ${masteryColorClass}`} />
                <span className="text-[10px] font-bold text-muted-foreground">{masteryLabelText}</span>
                <span className="text-[10px] text-muted-foreground">N4-L{kanji.lesson}</span>
                {p && <span className="text-[10px] text-muted-foreground">{p.correct}/{p.correct + p.wrong} benar</span>}
              </div>

              <AnimatePresence>
                {isCorrectAnim && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-green-600 dark:text-green-400 font-bold text-lg mb-4" data-testid="correct-feedback">
                    Benar!
                  </motion.div>
                )}
                {showAnswer && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-3 rounded-xl mb-4" data-testid="wrong-answer-reveal">
                    <p className="text-[10px] font-bold uppercase text-red-700 dark:text-red-400 tracking-widest mb-1">Jawaban Benar</p>
                    <p className="text-lg font-bold text-red-900 dark:text-red-300 font-jp">{correctAnswersDisplay}</p>
                  </motion.div>
                )}
                {showHint && !showAnswer && !isCorrectAnim && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 px-4 py-2 rounded-xl mb-4" data-testid="hint-display">
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-400 font-jp">{getHintText()}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={showAnswer || isCorrectAnim}
                  placeholder="Ketik jawaban..."
                  data-testid="typing-input"
                  className={`w-full text-center text-lg font-bold px-4 py-3.5 rounded-xl bg-background border-2 outline-none transition-all placeholder:text-muted-foreground/40 ${
                    showAnswer ? 'border-red-400 text-red-600' : 
                    (isCorrectAnim ? 'border-green-500 text-green-600' : 'border-border focus:border-foreground focus:ring-2 focus:ring-foreground/5 text-foreground')
                  }`}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </form>

              {/* Action Buttons */}
              {!showAnswer && !isCorrectAnim && (
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    data-testid="hint-btn"
                    onClick={() => setShowHint(true)}
                    disabled={showHint}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all border ${showHint ? 'border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    {showHint ? 'Petunjuk aktif' : 'Petunjuk'}
                  </button>
                  <button
                    data-testid="skip-btn"
                    onClick={handleSkip}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                    Lewati
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default TypingQuiz;
