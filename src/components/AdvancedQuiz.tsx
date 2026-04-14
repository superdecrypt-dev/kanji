import React, { useState } from 'react';
import type { Kanji } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { jukugoList } from '../jukugoData';
import { pickAdaptiveKanji } from '../hooks/useProgress';
import type { KanjiProgress } from '../hooks/useProgress';

interface AdvancedQuizProps {
  kanjiList: Kanji[];
  progress: Record<number, KanjiProgress>;
  onAnswer: (kanjiId: number, isCorrect: boolean) => void;
}

type QuizType = 'kanji' | 'jukugo';
type QuestionMode = 'meaning' | 'reading' | 'mixed';
type QuizMode = 'kanjiToMeaning' | 'kanjiToReading';

interface QuizState {
  currentWord: { word: string; reading: string; meaning: string } | null;
  options: string[];
  mode: QuizMode;
  selectedAnswer: string | null;
}

const splitJapaneseStr = (str: string | undefined | null): string[] => {
  if (!str) return [];
  return str.split(/[,/]/).map(s => s.trim()).filter(Boolean);
};

function createNewQuestion(kanjiList: Kanji[], type: QuizType, recentWords: string[], questionMode: QuestionMode = 'mixed', progressData?: Record<number, KanjiProgress>): QuizState {
  if (type === 'kanji') {
    if (kanjiList.length === 0) return { currentWord: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };
    
    // Use adaptive selection if progress data available
    const recentIds = kanjiList.filter(k => recentWords.includes(k.kanji)).map(k => k.id);
    let targetKanji: Kanji;
    if (progressData && Object.keys(progressData).length > 0) {
      const picked = pickAdaptiveKanji(kanjiList, progressData, recentIds, 1);
      targetKanji = picked[0] || kanjiList[Math.floor(Math.random() * kanjiList.length)];
    } else {
      targetKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      let tries = 0;
      while (recentWords.includes(targetKanji.kanji) && tries < 15 && kanjiList.length > 1) {
        targetKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
        tries++;
      }
    }

    let currentMode: QuizMode;
    if (questionMode === 'meaning') currentMode = 'kanjiToMeaning';
    else if (questionMode === 'reading') currentMode = 'kanjiToReading';
    else currentMode = Math.random() > 0.5 ? 'kanjiToMeaning' : 'kanjiToReading';
    
    const allValidReadings = [...splitJapaneseStr(targetKanji.onyomi), ...splitJapaneseStr(targetKanji.kunyomi)];
    const allValidMeanings = splitJapaneseStr(targetKanji.meaning).map(m => m.toLowerCase());

    let correctAnswer = '';
    if (currentMode === 'kanjiToMeaning') {
      correctAnswer = targetKanji.meaning;
    } else {
      const availableReadings = [];
      if (targetKanji.onyomi) availableReadings.push(targetKanji.onyomi);
      if (targetKanji.kunyomi) availableReadings.push(targetKanji.kunyomi);
      correctAnswer = availableReadings.length > 0 
        ? availableReadings[Math.floor(Math.random() * availableReadings.length)] 
        : (targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning);
    }
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      if (randomWrong.id === targetKanji.id) continue;
      let wrongText = '';
      if (currentMode === 'kanjiToMeaning') {
        wrongText = randomWrong.meaning;
        const isActuallyCorrect = allValidMeanings.some(m => wrongText.toLowerCase().includes(m) || m.includes(wrongText.toLowerCase()));
        if (isActuallyCorrect) continue;
      } else {
        const rReadings = [...splitJapaneseStr(randomWrong.onyomi), ...splitJapaneseStr(randomWrong.kunyomi)];
        wrongText = rReadings.length > 0 ? rReadings[Math.floor(Math.random() * rReadings.length)] : randomWrong.meaning;
        const wrongParts = splitJapaneseStr(wrongText);
        const isActuallyCorrect = wrongParts.some(wp => allValidReadings.includes(wp));
        if (isActuallyCorrect) continue;
      }
      if (wrongText && wrongText !== correctAnswer) wrongAnswers.add(wrongText);
    }
    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);
    return {
      currentWord: { word: targetKanji.kanji, reading: targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning, meaning: targetKanji.meaning },
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  } else {
    let targetWord = jukugoList[Math.floor(Math.random() * jukugoList.length)];
    let tries = 0;
    while (recentWords.includes(targetWord.word) && tries < 10) {
      targetWord = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      tries++;
    }

    let currentMode: QuizMode;
    if (questionMode === 'meaning') currentMode = 'kanjiToMeaning';
    else if (questionMode === 'reading') currentMode = 'kanjiToReading';
    else currentMode = Math.random() > 0.5 ? 'kanjiToMeaning' : 'kanjiToReading';
    
    let correctAnswer = currentMode === 'kanjiToMeaning' ? targetWord.meaning : targetWord.reading;
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const randomWrong = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      if (randomWrong.word === targetWord.word) continue;
      const wrongText = currentMode === 'kanjiToMeaning' ? randomWrong.meaning : randomWrong.reading;
      if (wrongText && wrongText !== correctAnswer) wrongAnswers.add(wrongText);
    }
    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);
    return {
      currentWord: targetWord,
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  }
}

const AdvancedQuiz: React.FC<AdvancedQuizProps> = ({ kanjiList, progress: progressData, onAnswer }) => {
  const [quizType, setQuizType] = useState<QuizType>('kanji');
  const [questionMode, setQuestionMode] = useState<QuestionMode>('mixed');
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(() => createNewQuestion(kanjiList, 'kanji', [], 'mixed', progressData));
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isWrong, setIsWrong] = useState(false);

  const checkIsCorrect = (option: string, state: QuizState): boolean => {
    if (!state.currentWord) return false;
    if (quizType === 'kanji') {
      const kanjiData = kanjiList.find(k => k.kanji === state.currentWord?.word);
      if (!kanjiData) return false;
      if (state.mode === 'kanjiToMeaning') {
        const allMeanings = splitJapaneseStr(kanjiData.meaning).map(m => m.toLowerCase());
        const optParts = splitJapaneseStr(option).map(o => o.toLowerCase());
        return optParts.some(op => allMeanings.includes(op)) || allMeanings.includes(option.toLowerCase());
      } else {
        const allReadings = [...splitJapaneseStr(kanjiData.onyomi), ...splitJapaneseStr(kanjiData.kunyomi)];
        const optParts = splitJapaneseStr(option);
        return optParts.some(op => allReadings.includes(op)) || allReadings.includes(option);
      }
    } else {
      const targetCorrect = state.mode === 'kanjiToMeaning' ? state.currentWord.meaning : state.currentWord.reading;
      return option === targetCorrect;
    }
  };

  const loadNextQuestion = (type: QuizType, currentRecent: string[], qMode: QuestionMode) => {
    setQuizState(createNewQuestion(kanjiList, type, currentRecent, qMode, progressData));
  };

  const handleAnswerClick = (option: string) => {
    if (!quizState || quizState.selectedAnswer !== null || !quizState.currentWord) return;
    const isCorrect = checkIsCorrect(option, quizState);
    setQuizState(prev => prev ? { ...prev, selectedAnswer: option } : null);
    if (!isCorrect) setIsWrong(true);
    setScore(prev => ({ total: prev.total + 1, correct: prev.correct + (isCorrect ? 1 : 0) }));

    // Record progress for kanji type
    if (quizType === 'kanji') {
      const kanjiData = kanjiList.find(k => k.kanji === quizState.currentWord?.word);
      if (kanjiData) onAnswer(kanjiData.id, isCorrect);
    }

    setTimeout(() => {
      setIsWrong(false);
      const newRecent = [...recentWords.slice(-14), quizState.currentWord!.word];
      setRecentWords(newRecent);
      loadNextQuestion(quizType, newRecent, questionMode);
    }, 1500);
  };

  const switchQuizType = (newType: QuizType) => {
    if (quizType === newType) return;
    setQuizType(newType);
    setScore({ correct: 0, total: 0 });
    setIsWrong(false);
    setRecentWords([]);
    loadNextQuestion(newType, [], questionMode);
  };

  const switchQuestionMode = (newMode: QuestionMode) => {
    if (questionMode === newMode) return;
    setQuestionMode(newMode);
    setScore({ correct: 0, total: 0 });
    setIsWrong(false);
    setRecentWords([]);
    loadNextQuestion(quizType, [], newMode);
  };

  if (!quizState || !quizState.currentWord) return <div className="text-center py-16 text-muted-foreground font-bold">Memuat...</div>;

  const { currentWord, options, mode, selectedAnswer } = quizState;
  const questionText = mode === 'kanjiToMeaning' ? `Apa arti dari ${quizType === 'kanji' ? 'Kanji' : 'kata'} ini?` : `Cara baca ${quizType === 'kanji' ? 'Kanji' : 'kata'} ini?`;

  let infoCorrectAnswer = '';
  if (quizType === 'kanji') {
    const kanjiData = kanjiList.find(k => k.kanji === currentWord.word);
    infoCorrectAnswer = mode === 'kanjiToMeaning' ? kanjiData?.meaning || '' : (kanjiData?.onyomi && kanjiData?.kunyomi ? `${kanjiData.onyomi} / ${kanjiData.kunyomi}` : (kanjiData?.onyomi || kanjiData?.kunyomi || ''));
  } else {
    infoCorrectAnswer = mode === 'kanjiToMeaning' ? currentWord.meaning : currentWord.reading;
  }

  return (
    <div className="space-y-5 md:space-y-6" data-testid="advanced-quiz">
      {/* Quiz Type & Mode Toggles */}
      <div className="flex flex-col gap-3 items-center">
        <div className="flex p-1 bg-secondary rounded-xl border border-border" data-testid="quiz-type-selector">
          <button 
            data-testid="quiz-type-kanji"
            onClick={() => switchQuizType('kanji')} 
            className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold transition-all ${quizType === 'kanji' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Kanji
          </button>
          <button 
            data-testid="quiz-type-jukugo"
            onClick={() => switchQuizType('jukugo')} 
            className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${quizType === 'jukugo' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <BookOpen size={13} /> Jukugo
          </button>
        </div>

        <div className="flex p-1 bg-secondary rounded-lg border border-border" data-testid="question-mode-selector">
          {(['meaning', 'reading', 'mixed'] as QuestionMode[]).map(m => (
            <button 
              key={m}
              data-testid={`mode-${m}`}
              onClick={() => switchQuestionMode(m)} 
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${questionMode === m ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {m === 'meaning' ? 'Arti' : m === 'reading' ? 'Baca' : 'Campur'}
            </button>
          ))}
        </div>
      </div>

      {/* Score */}
      <div className="flex justify-between items-center px-4 py-3 bg-card border border-border rounded-xl" data-testid="quiz-score">
        <div className="text-sm font-bold text-foreground">
          Skor: <span className="text-lg ml-1 text-primary">{score.correct}</span><span className="text-muted-foreground">/{score.total}</span>
        </div>
        <div className="text-xs font-bold text-muted-foreground">
          {Math.round((score.correct / (score.total || 1)) * 100)}% benar
        </div>
      </div>
      
      {/* Question Card */}
      <motion.div key={currentWord.word + mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className={`bg-card border-2 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-center transition-all duration-300 ${
          selectedAnswer ? (isWrong ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20') : 'border-border'
        }`} data-testid="quiz-question-card">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{questionText}</p>
          <motion.div 
            animate={isWrong && selectedAnswer ? { x: [-8, 8, -8, 8, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary leading-none font-jp"
            data-testid="quiz-kanji-display"
          >
            {currentWord.word}
          </motion.div>

          <AnimatePresence>
            {isWrong && selectedAnswer && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 p-3 rounded-xl"
                data-testid="correct-answer-reveal"
              >
                <p className="text-[10px] font-bold uppercase text-green-700 dark:text-green-400 tracking-widest mb-1">Jawaban Benar</p>
                <p className="text-lg font-bold text-green-900 dark:text-green-300 font-jp">{infoCorrectAnswer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-2.5 md:gap-3" data-testid="quiz-options">
        {options.map((option, index) => {
          const isSelected = option === selectedAnswer;
          const isCorrectOption = checkIsCorrect(option, quizState);
          
          let borderColor = 'border-border';
          let bgColor = 'bg-card hover:border-foreground/20';
          let textColor = 'text-foreground';
          
          if (selectedAnswer) {
            if (isCorrectOption) {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-50 dark:bg-green-950/30';
              textColor = 'text-green-900 dark:text-green-300';
            } else if (isSelected) {
              borderColor = 'border-red-500';
              bgColor = 'bg-red-50 dark:bg-red-950/30';
              textColor = 'text-red-900 dark:text-red-300';
            } else {
              bgColor = 'bg-card opacity-50';
            }
          }

          return (
            <motion.button 
              key={index}
              data-testid={`quiz-option-${index}`}
              whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
              className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${borderColor} ${bgColor} ${textColor} ${!selectedAnswer ? 'cursor-pointer active:scale-[0.98]' : ''}`}
              onClick={() => handleAnswerClick(option)} 
              disabled={selectedAnswer !== null}
            >
              {selectedAnswer && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
              {selectedAnswer && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-600 shrink-0 animate-shake" />}
              <span className="font-bold text-sm md:text-base break-words font-jp">{option}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedQuiz;
