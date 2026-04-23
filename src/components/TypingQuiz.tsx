import React, { useState, useRef, useMemo } from 'react';
import type { Kanji } from '../data';
import { kotobaList, type KotobaWord, getKotobaCategoryLabel } from '../kotobaData';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, SkipForward } from 'lucide-react';
import { pickAdaptiveKanji, pickAdaptiveByKey, getMasteryLevel, getMasteryColor, getMasteryLabel } from '../hooks/useProgress';
import type { KanjiProgress, KotobaProgress } from '../hooks/useProgress';
import LessonSelector from './LessonSelector';
import { getAcceptedReadingAnswers, getReadingHintBase, formatReadingDisplay, kanaToRomaji } from '../kanjiReadings';

interface TypingQuizProps {
  kanjiList: Kanji[];
  progress: Record<number, KanjiProgress>;
  kotobaProgress: Record<string, KotobaProgress>;
  onAnswer: (kanjiId: number, isCorrect: boolean) => void;
  onKotobaAnswer: (kotobaWord: string, isCorrect: boolean) => void;
}

type QuestionMode = 'meaning' | 'reading' | 'mixed';
type ReadingType = 'kunyomi' | 'onyomi';
type QuizType = 'kanji' | 'kotoba';

type QuizState =
  | {
      type: 'kanji';
      kanji: Kanji;
      isMeaning: boolean;
      readingType?: ReadingType;
    }
  | {
      type: 'kotoba';
      kotoba: KotobaWord;
      isMeaning: boolean;
    };

const normalizeAnswer = (str: string | undefined | null): string => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
};

const splitAnswerOptions = (str: string | undefined | null): string[] => {
  if (!str) return [];
  return str
    .split(/[\/,、]/)
    .map(option => normalizeAnswer(option))
    .filter(Boolean);
};

const getMeaningAnswers = (str: string | undefined | null): string[] => {
  const answers = splitAnswerOptions(str).flatMap(option => {
    const withoutNotes = normalizeAnswer(option.replace(/\s*\([^)]*\)/g, ''));
    return withoutNotes && withoutNotes !== option ? [option, withoutNotes] : [option];
  });

  return Array.from(new Set(answers));
};

const formatKotobaReadingDisplay = (reading: string): string => {
  const romaji = kanaToRomaji(reading);
  return `${reading} (${romaji})`;
};

const createKanjiQuestion = (
  kanjiList: Kanji[],
  questionMode: QuestionMode,
  progressData: Record<number, KanjiProgress>,
  recentIds: number[],
  selectedLessons: number[]
): QuizState | null => {
  const filteredKanji = selectedLessons.length === 0
    ? kanjiList
    : kanjiList.filter(k => selectedLessons.includes(k.lesson));

  if (filteredKanji.length === 0) return null;

  let randomKanji: Kanji;
  if (progressData && Object.keys(progressData).length > 0) {
    const picked = pickAdaptiveKanji(filteredKanji, progressData, recentIds, 1);
    randomKanji = picked[0] || filteredKanji[Math.floor(Math.random() * filteredKanji.length)];
  } else {
    randomKanji = filteredKanji[Math.floor(Math.random() * filteredKanji.length)];
  }

  let isMeaning: boolean;
  if (questionMode === 'meaning') isMeaning = true;
  else if (questionMode === 'reading') isMeaning = false;
  else isMeaning = Math.random() > 0.5;

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

  return { type: 'kanji', kanji: randomKanji, isMeaning, readingType };
};

const createKotobaQuestion = (
  questionMode: QuestionMode,
  recentWords: string[],
  progressData: Record<string, KotobaProgress>
): QuizState | null => {
  if (kotobaList.length === 0) return null;

  const picked = Object.keys(progressData).length > 0
    ? pickAdaptiveByKey(kotobaList, progressData, recentWords, (item) => item.word, 1)
    : [];
  const pool = kotobaList.filter((item) => !recentWords.includes(item.word));
  const source = pool.length > 0 ? pool : kotobaList;
  const kotoba = picked[0] || source[Math.floor(Math.random() * source.length)];

  const isMeaning =
    questionMode === 'meaning' ? true : questionMode === 'reading' ? false : Math.random() > 0.5;

  return { type: 'kotoba', kotoba, isMeaning };
};

const TypingQuiz: React.FC<TypingQuizProps> = ({ kanjiList, progress: progressData, kotobaProgress: kotobaProgressData, onAnswer, onKotobaAnswer }) => {
  const [quizType, setQuizType] = useState<QuizType>('kanji');
  const [questionMode, setQuestionMode] = useState<QuestionMode>('mixed');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(() => createKanjiQuestion(kanjiList, 'mixed', progressData, [], []));
  const [input, setInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectAnim, setIsCorrectAnim] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [recentKotoba, setRecentKotoba] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), [kanjiList]);

  const filteredKanji = useMemo(() => {
    return selectedLessons.length === 0 ? kanjiList : kanjiList.filter(k => selectedLessons.includes(k.lesson));
  }, [kanjiList, selectedLessons]);

  const loadNewQuestion = (
    nextSelectedLessons = selectedLessons,
    nextMode = questionMode,
    recentKanji = recentIds,
    recentWords = recentKotoba,
    nextQuizType = quizType
  ) => {
    const nextQuestion = nextQuizType === 'kanji'
      ? createKanjiQuestion(kanjiList, nextMode, progressData, recentKanji, nextSelectedLessons)
      : createKotobaQuestion(nextMode, recentWords, kotobaProgressData);
    if (!nextQuestion) return;
    setQuizState(nextQuestion);
    setInput('');
    setIsWrong(false);
    setShowAnswer(false);
    setIsCorrectAnim(false);
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizState || !input.trim() || showAnswer || isCorrectAnim) return;

    const userAns = normalizeAnswer(input);
    let isCorrect = false;

    if (quizState.isMeaning) {
      const validMeanings = getMeaningAnswers(quizState.type === 'kanji' ? quizState.kanji.meaning : quizState.kotoba.meaning);
      isCorrect = validMeanings.some(m => m === userAns);
    } else {
      if (quizState.type === 'kanji') {
        const validReadings = getAcceptedReadingAnswers(quizState.kanji, quizState.readingType === 'kunyomi' ? 'kunyomi' : 'onyomi');
        isCorrect = validReadings.some(r => r === userAns);
      } else {
        const validReadings = Array.from(new Set([
          normalizeAnswer(quizState.kotoba.reading),
          normalizeAnswer(kanaToRomaji(quizState.kotoba.reading)),
        ])).filter(Boolean);
        isCorrect = validReadings.some(r => r === userAns);
      }
    }

    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    if (quizState.type === 'kanji') {
      onAnswer(quizState.kanji.id, isCorrect);
      const newRecent = [...recentIds.slice(-14), quizState.kanji.id];
      setRecentIds(newRecent);
      setTimeout(() => loadNewQuestion(undefined, undefined, newRecent, undefined, 'kanji'), isCorrect ? 800 : 2500);
    } else {
      onKotobaAnswer(quizState.kotoba.word, isCorrect);
      const newRecentKotoba = [...recentKotoba.slice(-14), quizState.kotoba.word];
      setRecentKotoba(newRecentKotoba);
      setTimeout(() => loadNewQuestion(undefined, undefined, undefined, newRecentKotoba, 'kotoba'), isCorrect ? 800 : 2500);
    }

    if (isCorrect) {
      setIsCorrectAnim(true);
    } else {
      setIsWrong(true);
      setShowAnswer(true);
    }
  };

  const handleSkip = () => {
    if (!quizState || showAnswer || isCorrectAnim) return;
    setIsWrong(true);
    setShowAnswer(true);
    setScore(prev => ({ total: prev.total + 1, correct: prev.correct }));
    if (quizState.type === 'kanji') {
      onAnswer(quizState.kanji.id, false);
      const newRecent = [...recentIds.slice(-14), quizState.kanji.id];
      setRecentIds(newRecent);
      setTimeout(() => loadNewQuestion(undefined, undefined, newRecent, undefined, 'kanji'), 2500);
    } else {
      onKotobaAnswer(quizState.kotoba.word, false);
      const newRecentKotoba = [...recentKotoba.slice(-14), quizState.kotoba.word];
      setRecentKotoba(newRecentKotoba);
      setTimeout(() => loadNewQuestion(undefined, undefined, undefined, newRecentKotoba, 'kotoba'), 2500);
    }
  };

  const handleModeChange = (newMode: QuestionMode) => {
    setQuestionMode(newMode);
    setScore({ correct: 0, total: 0 });
    setRecentIds([]);
    setRecentKotoba([]);
    loadNewQuestion(selectedLessons, newMode, [], [], quizType);
  };

  const handleLessonChange = (lessons: number[]) => {
    setSelectedLessons(lessons);
    setScore({ correct: 0, total: 0 });
    setRecentIds([]);
    loadNewQuestion(lessons, questionMode, [], recentKotoba, 'kanji');
  };

  const handleQuizTypeChange = (newType: QuizType) => {
    setQuizType(newType);
    setScore({ correct: 0, total: 0 });
    setRecentIds([]);
    setRecentKotoba([]);
    setShowHint(false);
    setSelectedLessons(newType === 'kanji' ? selectedLessons : []);
    loadNewQuestion(selectedLessons, questionMode, [], [], newType);
  };

  const getHintText = (): string => {
    if (!quizState) return '';
    if (quizState.isMeaning) {
      const meaning = quizState.type === 'kanji' ? quizState.kanji.meaning : quizState.kotoba.meaning;
      if (meaning.length <= 2) return meaning[0] + '...';
      return meaning.substring(0, Math.ceil(meaning.length / 3)) + '...';
    } else {
      const reading = quizState.type === 'kanji'
        ? quizState.readingType === 'kunyomi' 
          ? getReadingHintBase(quizState.kanji, 'kunyomi')
          : getReadingHintBase(quizState.kanji, 'onyomi')
        : kanaToRomaji(quizState.kotoba.reading);
      if (!reading) return '...';
      const first = reading.trim();
      return first.substring(0, Math.ceil(first.length / 3)) + '...';
    }
  };

  if (!quizState) return <div className="text-center py-16 text-muted-foreground font-bold">Memuat...</div>;

  const isKanjiQuiz = quizState.type === 'kanji';
  const { isMeaning } = quizState;
  const itemText = isKanjiQuiz ? quizState.kanji.kanji : quizState.kotoba.word;
  const meaningText = isKanjiQuiz ? quizState.kanji.meaning : quizState.kotoba.meaning;
  const readingType = isKanjiQuiz ? quizState.readingType : undefined;
  const currentKanji = isKanjiQuiz ? quizState.kanji : null;
  const currentKotobaProgress = !isKanjiQuiz ? kotobaProgressData[quizState.kotoba.word] : undefined;
  const questionLabel = isMeaning 
    ? 'Ketik Arti (Bahasa Indonesia)' 
    : isKanjiQuiz
      ? `Ketik ${readingType === 'kunyomi' ? 'Kunyomi' : 'Onyomi'} (Romaji/Kana)`
      : 'Ketik Cara Baca (Romaji/Kana)';
  
  const correctAnswersDisplay = isMeaning 
    ? meaningText
    : isKanjiQuiz
      ? readingType === 'kunyomi'
        ? formatReadingDisplay(quizState.kanji, 'kunyomi')
        : formatReadingDisplay(quizState.kanji, 'onyomi')
      : formatKotobaReadingDisplay(quizState.kotoba.reading);

  const p = currentKanji ? progressData[currentKanji.id] : undefined;
  const level = currentKanji ? getMasteryLevel(p) : null;
  const masteryColorClass = currentKanji && level ? getMasteryColor(level) : '';
  const masteryLabelText = currentKanji && level ? getMasteryLabel(level) : '';
  const kotobaLevel = currentKotobaProgress ? getMasteryLevel(currentKotobaProgress) : 'new';
  const kotobaMasteryColorClass = getMasteryColor(kotobaLevel);
  const kotobaMasteryLabelText = getMasteryLabel(kotobaLevel);
  const kotobaCategoryLabel = !isKanjiQuiz ? getKotobaCategoryLabel(quizState.kotoba.word) : '';

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-5" data-testid="typing-quiz">
      {/* Lesson Filter */}
      <div className="flex flex-col gap-4">
        {quizType === 'kanji' && (
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Pilih Pelajaran</p>
            <LessonSelector
              selectedLessons={selectedLessons}
              onSelectLessons={handleLessonChange}
              maxLesson={maxLesson}
            />
          </div>
        )}

        <div className="flex flex-col gap-3 items-center">
          <div className="flex p-1 bg-secondary rounded-xl border border-border" data-testid="typing-type-selector">
            <button
              data-testid="typing-type-kanji"
              className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                quizType === 'kanji'
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => handleQuizTypeChange('kanji')}
            >
              Kanji
            </button>
            <button
              data-testid="typing-type-kotoba"
              className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                quizType === 'kotoba'
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => handleQuizTypeChange('kotoba')}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Kotoba
            </button>
          </div>

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
        </div>
      </div>

      {(quizType === 'kanji' ? filteredKanji.length === 0 : kotobaList.length === 0) ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
          <p className="text-lg font-bold text-muted-foreground">{quizType === 'kanji' ? 'Kanji tidak ditemukan.' : 'Kotoba tidak ditemukan.'}</p>
        </div>
      ) : (
        <>
          {/* Score */}
          <div className="flex justify-between items-center px-4 py-3 bg-card border border-border rounded-xl" data-testid="typing-quiz-score">
            <div className="text-sm font-bold text-foreground">
              Skor: <span className="text-lg ml-1 text-primary">{score.correct}</span><span className="text-muted-foreground">/{score.total}</span>
            </div>
            <div className="text-xs font-bold text-muted-foreground">
              {Math.round((score.correct / (score.total || 1)) * 100)}% benar
            </div>
          </div>

          {/* Question Card */}
          <motion.div key={`${quizState.type}-${itemText}-${isMeaning ? 'm' : 'r'}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className={`bg-card border-2 rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-10 text-center transition-all duration-300 ${
              showAnswer ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : (isCorrectAnim ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-border')
            }`} data-testid="typing-question-card">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">{questionLabel}</p>
              
              <motion.div 
                animate={isWrong ? { x: [-8, 8, -8, 8, 0] } : {}}
                className={`font-bold text-primary leading-none font-jp mb-2 ${
                  isKanjiQuiz ? 'text-5xl sm:text-6xl md:text-8xl' : 'text-4xl sm:text-5xl md:text-6xl'
                }`}
                data-testid="typing-kanji-display"
              >
                {itemText}
              </motion.div>

              {/* Kanji Info */}
              <div className="flex items-center justify-center gap-2 mb-5">
                {currentKanji ? (
                  <>
                    <span className={`w-2 h-2 rounded-full ${masteryColorClass}`} />
                    <span className="text-[10px] font-bold text-muted-foreground">{masteryLabelText}</span>
                    <span className="text-[10px] text-muted-foreground">L{currentKanji.lesson}</span>
                    {p && <span className="text-[10px] text-muted-foreground">{p.correct}/{p.correct + p.wrong} benar</span>}
                  </>
                ) : (
                  <>
                    <span className={`w-2 h-2 rounded-full ${kotobaMasteryColorClass}`} />
                    <span className="text-[10px] font-bold text-muted-foreground">{kotobaMasteryLabelText}</span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {kotobaCategoryLabel}
                    </span>
                    {currentKotobaProgress && <span className="text-[10px] text-muted-foreground">{currentKotobaProgress.correct}/{currentKotobaProgress.correct + currentKotobaProgress.wrong} benar</span>}
                  </>
                )}
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
