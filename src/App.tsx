import { useState, useMemo, useEffect } from 'react';
import { kanjiList } from './data';
import Flashcard from './components/Flashcard';
import AdvancedQuiz from './components/AdvancedQuiz';
import LessonSelector from './components/LessonSelector';
import Dashboard from './components/Dashboard';
import KanjiList from './components/KanjiList';
import { useProgress } from './store/useProgress';
import { Moon, Sun, LayoutDashboard, Layers, PlayCircle, List } from 'lucide-react';
import { Button } from './components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type AppMode = 'dashboard' | 'flashcards' | 'quiz' | 'list';

function App() {
  const [mode, setMode] = useState<AppMode>('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  const { progress, updateKanji, markMastered, resetProgress, isLoaded } = useProgress();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const maxLesson = useMemo(() => Math.max(...kanjiList.map(k => k.lesson)), []);

  const filteredKanji = useMemo(() => {
    if (selectedLesson === 'all') return kanjiList;
    return kanjiList.filter(k => k.lesson === selectedLesson);
  }, [selectedLesson]);

  const handleNextCard = () => setCurrentCardIndex((prev) => (prev + 1) % filteredKanji.length);
  const handlePrevCard = () => setCurrentCardIndex((prev) => (prev - 1 + filteredKanji.length) % filteredKanji.length);

  const handleQuizResult = (kanjiId: number, isCorrect: boolean) => {
    updateKanji(kanjiId, isCorrect);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'list', label: 'Daftar', icon: List },
    { id: 'flashcards', label: 'Belajar', icon: Layers },
    { id: 'quiz', label: 'Kuis', icon: PlayCircle },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-12 space-y-10">
          <div className="flex justify-between items-center px-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black tracking-tighter text-primary"
            >
              Kanji
            </motion.h1>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full w-14 h-14 bg-secondary/50"
            >
              {theme === 'light' ? <Moon className="w-7 h-7" /> : <Sun className="w-7 h-7" />}
            </Button>
          </div>
          
          <nav className="flex p-2 bg-card border-2 rounded-3xl shadow-md overflow-hidden overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id as AppMode)}
                className={`relative flex flex-1 items-center justify-center gap-3 px-6 py-6 rounded-2xl text-sm font-black transition-all duration-300 min-w-fit ${
                  mode === item.id 
                    ? 'text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                }`}
              >
                {mode === item.id && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-4 h-4 z-10" />
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </header>

        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {mode === 'dashboard' ? (
                 <Dashboard 
                   kanjiList={kanjiList} 
                   progress={progress} 
                   onNavigate={(m) => setMode(m as AppMode)} 
                   onReset={resetProgress}
                 />
              ) : mode === 'list' ? (
                 <KanjiList kanjiList={kanjiList} progress={progress} />
              ) : (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-card/50 p-4 rounded-2xl border border-dashed">
                    <span className="text-sm font-bold text-muted-foreground">Pilih Materi:</span>
                    <LessonSelector 
                      selectedLesson={selectedLesson} 
                      onSelectLesson={(lesson) => {
                        setSelectedLesson(lesson);
                        setCurrentCardIndex(0);
                      }} 
                      maxLesson={maxLesson} 
                    />
                  </div>

                  {filteredKanji.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-3xl border shadow-inner">
                      <p className="text-xl font-medium text-muted-foreground">Kanji tidak ditemukan.</p>
                    </div>
                  ) : mode === 'flashcards' ? (
                    <div className="flex flex-col items-center space-y-6">
                      <div className="bg-primary/5 px-4 py-1 rounded-full text-xs font-bold text-primary tracking-widest uppercase">
                        Kartu {currentCardIndex + 1} dari {filteredKanji.length}
                      </div>
                      <Flashcard 
                         key={filteredKanji[currentCardIndex].id}
                         kanji={filteredKanji[currentCardIndex]} 
                         progress={progress[filteredKanji[currentCardIndex].id]}
                         onMarkMastered={() => markMastered(filteredKanji[currentCardIndex].id)}
                         onNext={handleNextCard}
                      />
                      <div className="flex gap-4 w-full max-w-sm">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-2 h-12 rounded-xl font-bold"
                          onClick={handlePrevCard}
                        >
                          Sebelumnya
                        </Button>
                        <Button 
                          className="flex-1 h-12 rounded-xl font-bold shadow-lg"
                          onClick={handleNextCard}
                        >
                          Selanjutnya
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <AdvancedQuiz key={selectedLesson} kanjiList={filteredKanji} onResult={handleQuizResult} />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;