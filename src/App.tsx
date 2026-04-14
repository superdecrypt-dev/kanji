import { useState, useMemo, useEffect } from 'react';
import { kanjiList } from './data';
import Flashcard from './components/Flashcard';
import AdvancedQuiz from './components/AdvancedQuiz';
import LessonSelector from './components/LessonSelector';
import KanjiList from './components/KanjiList';
import TypingQuiz from './components/TypingQuiz';
import SentenceQuiz from './components/SentenceQuiz';
import { Moon, Sun, List, Layers, PlayCircle, Keyboard, FileText, ChevronRight, Shuffle, RefreshCcw, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from './hooks/useProgress';

type AppMode = 'list' | 'flashcards' | 'quiz' | 'typing' | 'sentences';

const navItems = [
  { id: 'list', label: 'Daftar', fullLabel: 'Daftar Kanji', icon: List },
  { id: 'flashcards', label: 'Kartu', fullLabel: 'Flashcards', icon: Layers },
  { id: 'quiz', label: 'Kuis', fullLabel: 'Latihan Kuis', icon: PlayCircle },
  { id: 'typing', label: 'Ketik', fullLabel: 'Kuis Ketik', icon: Keyboard },
  { id: 'sentences', label: 'Kalimat', fullLabel: 'Kalimat Rumpang', icon: FileText },
];

function App() {
  const [mode, setMode] = useState<AppMode>('list');
  const [selectedLessons, setSelectedLessons] = useState<number[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { progress, recordAnswer, getOverallStats, resetProgress } = useProgress();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), []);

  const filteredKanji = useMemo(() => {
    let list = selectedLessons.length === 0 ? kanjiList : kanjiList.filter(k => selectedLessons.includes(k.lesson));
    if (isShuffled) {
      void shuffleSeed;
      return [...list].sort(() => Math.random() - 0.5);
    }
    return list;
  }, [selectedLessons, isShuffled, shuffleSeed]);

  const handleNextCard = () => setCurrentCardIndex((prev) => (prev + 1) % filteredKanji.length);
  const handlePrevCard = () => setCurrentCardIndex((prev) => (prev - 1 + filteredKanji.length) % filteredKanji.length);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-150 flex" data-testid="app-container">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-border bg-background z-40" data-testid="desktop-sidebar">
        <div className="flex items-center gap-3 px-6 pt-8 pb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl font-jp">漢</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Kanji</h1>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              data-testid={`sidebar-nav-${item.id}`}
              onClick={() => setMode(item.id as AppMode)}
              className={`w-full relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group ${
                mode === item.id 
                  ? 'text-primary bg-primary/8' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {mode === item.id && (
                <motion.div
                  layoutId="active-sidebar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <item.icon className={`w-5 h-5 transition-colors ${mode === item.id ? 'text-primary' : ''}`} />
              <span className="flex-1 text-left">{item.fullLabel}</span>
              {mode === item.id && <ChevronRight className="w-4 h-4 text-primary opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="px-4 pb-8 pt-4 border-t border-border">
          <button
            data-testid="desktop-theme-toggle"
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span>{theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full min-h-screen pb-20 md:pb-0 md:pl-64" data-testid="main-content">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 px-4 py-3 flex items-center justify-between bg-background/90 backdrop-blur-lg border-b border-border" data-testid="mobile-header">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-jp">漢</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight">{navItems.find(i => i.id === mode)?.fullLabel}</span>
          </div>
          <button
            data-testid="mobile-theme-toggle"
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
          </button>
        </header>

        <main className="max-w-4xl mx-auto w-full px-4 py-5 md:px-8 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Desktop Page Title */}
              <div className="hidden md:flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                  {navItems.find(i => i.id === mode)?.fullLabel}
                </h2>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {filteredKanji.length} Kanji
                </div>
              </div>

              {/* Progress Summary */}
              {mode !== 'list' && (
                <ProgressBar stats={getOverallStats()} totalKanji={kanjiList.length} onReset={resetProgress} />
              )}

              {mode === 'list' ? (
                <KanjiList kanjiList={kanjiList} progress={progress} />
              ) : mode === 'typing' ? (
                <TypingQuiz kanjiList={kanjiList} progress={progress} onAnswer={recordAnswer} />
              ) : mode === 'sentences' ? (
                <SentenceQuiz />
              ) : (
                <div className="space-y-6 md:space-y-8">
                  {/* Lesson Selector */}
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Pilih Pelajaran</p>
                    <LessonSelector 
                      selectedLessons={selectedLessons} 
                      onSelectLessons={(lessons) => {
                        setSelectedLessons(lessons);
                        setCurrentCardIndex(0);
                      }} 
                      maxLesson={maxLesson} 
                    />
                  </div>

                  {filteredKanji.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl" data-testid="empty-state">
                      <p className="text-lg font-bold text-muted-foreground">Kanji tidak ditemukan.</p>
                    </div>
                  ) : mode === 'flashcards' ? (
                    <div className="flex flex-col items-center space-y-5">
                      {/* Card Counter & Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-muted-foreground" data-testid="flashcard-counter">
                          {currentCardIndex + 1} / {filteredKanji.length}
                        </span>
                        <button 
                          data-testid="shuffle-btn"
                          className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${isShuffled ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}`}
                          onClick={() => {
                            if (!isShuffled) {
                              setIsShuffled(true);
                              setShuffleSeed(Date.now());
                            } else {
                              setIsShuffled(false);
                            }
                            setCurrentCardIndex(0);
                          }}
                          title={isShuffled ? "Matikan Acak" : "Acak Kartu"}
                        >
                          <Shuffle className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                          {isShuffled && (
                            <motion.button 
                              data-testid="reshuffle-btn"
                              initial={{ opacity: 0, scale: 0.8 }} 
                              animate={{ opacity: 1, scale: 1 }} 
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-primary hover:bg-primary/5 transition-all"
                              onClick={() => {
                                setShuffleSeed(Date.now());
                                setCurrentCardIndex(0);
                              }}
                              title="Acak Ulang"
                            >
                              <RefreshCcw className="w-4 h-4" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Flashcard */}
                      <Flashcard 
                        key={filteredKanji[currentCardIndex].id}
                        kanji={filteredKanji[currentCardIndex]} 
                      />

                      {/* Navigation Buttons */}
                      <div className="flex gap-3 w-full max-w-sm">
                        <button 
                          data-testid="flashcard-prev-btn"
                          className="flex-1 h-12 md:h-14 rounded-xl font-bold text-sm border border-border bg-background hover:bg-secondary text-foreground transition-all active:scale-[0.98]"
                          onClick={handlePrevCard}
                        >
                          Sebelumnya
                        </button>
                        <button 
                          data-testid="flashcard-next-btn"
                          className="flex-1 h-12 md:h-14 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 shadow-[0_4px_14px_0_rgba(229,57,53,0.3)] transition-all active:scale-[0.98]"
                          onClick={handleNextCard}
                        >
                          Lanjut
                        </button>
                      </div>
                    </div>
                  ) : (
                    <AdvancedQuiz key={selectedLessons.join(',')} kanjiList={filteredKanji} progress={progress} onAnswer={recordAnswer} />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-xl border-t border-border z-50 pb-safe" data-testid="mobile-bottom-nav">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              data-testid={`bottom-nav-${item.id}`}
              onClick={() => setMode(item.id as AppMode)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
                mode === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className={`w-5 h-5 ${mode === item.id ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-[10px] font-bold ${mode === item.id ? 'text-primary' : ''}`}>{item.label}</span>
              {mode === item.id && (
                <motion.div
                  layoutId="active-bottom-nav"
                  className="absolute top-0 w-12 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function ProgressBar({ stats, totalKanji, onReset }: { stats: ReturnType<ReturnType<typeof useProgress>['getOverallStats']>; totalKanji: number; onReset: () => void }) {
  const [showInfo, setShowInfo] = useState(false);
  const { mastered, reviewing, learning, accuracy } = stats;
  const newCount = totalKanji - mastered - reviewing - learning;
  const masteredPct = (mastered / totalKanji) * 100;
  const reviewingPct = (reviewing / totalKanji) * 100;
  const learningPct = (learning / totalKanji) * 100;

  if (mastered + reviewing + learning === 0) return null;

  return (
    <div className="mb-6 p-4 bg-card border border-border rounded-xl" data-testid="progress-bar">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Progress Belajar</span>
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className="w-5 h-5 flex items-center justify-center rounded-full border border-border text-muted-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors text-[10px] font-bold"
            data-testid="progress-info-btn"
          >
            ?
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-muted-foreground">{accuracy}% akurasi</span>
          <button onClick={onReset} className="text-muted-foreground/50 hover:text-destructive transition-colors" title="Reset Progress" data-testid="reset-progress-btn">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="mb-3 p-3 bg-secondary/50 border border-border rounded-lg text-xs text-muted-foreground space-y-1.5" data-testid="progress-info-panel">
          <p className="font-bold text-foreground text-[11px]">Cara kerja status:</p>
          <p><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" /><strong>Belum</strong></span> — Belum pernah menjawab</p>
          <p><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /><strong>Belajar</strong></span> — Benar kurang dari 3 kali</p>
          <p><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /><strong>Mengulang</strong></span> — Benar 3–7 kali</p>
          <p><span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /><strong>Dikuasai</strong></span> — Benar 8+ kali dengan akurasi ≥ 80%</p>
          <p className="text-muted-foreground/60 italic pt-1">Status dihitung otomatis dari jawaban kuis.</p>
        </div>
      )}

      <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden flex">
        {masteredPct > 0 && <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${masteredPct}%` }} />}
        {reviewingPct > 0 && <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${reviewingPct}%` }} />}
        {learningPct > 0 && <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${learningPct}%` }} />}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[10px] font-bold">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" />Dikuasai {mastered}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Mengulang {reviewing}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" />Belajar {learning}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />Belum {newCount}</span>
      </div>
    </div>
  );
}

export default App;
