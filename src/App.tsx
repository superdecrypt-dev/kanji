import { useState, useMemo, useEffect } from 'react';
import { kanjiList } from './data';
import Flashcard from './components/Flashcard';
import AdvancedQuiz from './components/AdvancedQuiz';
import LessonSelector from './components/LessonSelector';
import KanjiList from './components/KanjiList';
import { useProgress } from './store/useProgress';
import { Moon, Sun, Layers, PlayCircle, List, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from './components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type AppMode = 'flashcards' | 'quiz' | 'list';

function App() {
  const [mode, setMode] = useState<AppMode>('list');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  const { progress, metadata, updateKanji, markMastered, isLoaded } = useProgress();

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
    { id: 'list', label: 'Daftar Kanji', icon: List },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'quiz', label: 'Latihan Kuis', icon: PlayCircle },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden flex">
      {/* Decorative Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white/5 backdrop-blur-3xl border-r border-white/10 z-50 flex flex-col p-6 transition-transform duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-12 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-black text-xl">漢</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-primary">Kanji N4</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden rounded-full">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <nav className="flex-1 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setMode(item.id as AppMode);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full relative flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 group ${
                mode === item.id 
                  ? 'text-white' 
                  : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'
              }`}
            >
              {mode === item.id && (
                <motion.div
                  layoutId="active-sidebar-nav"
                  className="absolute inset-0 bg-primary shadow-lg shadow-primary/30 inner-glow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ borderRadius: '1.25rem' }}
                />
              )}
              <item.icon className={`w-5 h-5 z-10 transition-transform duration-300 ${mode === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="relative z-10 flex-1 text-left">{item.label}</span>
              {mode === item.id && <ChevronRight className="w-4 h-4 z-10 opacity-60" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between px-4 py-2 mb-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Streak: {metadata.streak} 🔥</span>
          </div>
          <Button 
            variant="secondary" 
            className="w-full justify-start gap-4 h-14 rounded-2xl border border-white/10"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span className="font-black text-xs uppercase tracking-widest">
              {theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
            </span>
          </Button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto no-scrollbar relative">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 left-0 right-0 p-4 flex items-center justify-between bg-background/50 backdrop-blur-md border-b border-white/5 z-30">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="rounded-full w-12 h-12">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter text-primary">Kanji</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full w-12 h-12">
            {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </Button>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Title for Context */}
              <div className="mb-10 max-lg:hidden flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">
                    {navItems.find(i => i.id === mode)?.label}
                  </h2>
                </div>
                <div className="bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">N4 Mastery System</span>
                </div>
              </div>

              {mode === 'list' ? (
                 <KanjiList kanjiList={kanjiList} progress={progress} />
              ) : (
                <div className="space-y-10">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border-2 border-white/10 shadow-2xl">
                    <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">Materi Pelajaran:</span>
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
                    <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed border-white/10 shadow-inner">
                      <p className="text-2xl font-black text-muted-foreground/40 uppercase tracking-tighter">Kanji tidak ditemukan.</p>
                    </div>
                  ) : mode === 'flashcards' ? (
                    <div className="flex flex-col items-center space-y-10">
                      <div className="bg-primary/10 px-6 py-2 rounded-full text-[10px] font-black text-primary tracking-[0.3em] uppercase border border-primary/20">
                        KARTU {currentCardIndex + 1} / {filteredKanji.length}
                      </div>
                      <Flashcard 
                         key={filteredKanji[currentCardIndex].id}
                         kanji={filteredKanji[currentCardIndex]} 
                         progress={progress[filteredKanji[currentCardIndex].id]}
                         onMarkMastered={() => markMastered(filteredKanji[currentCardIndex].id)}
                         onNext={handleNextCard}
                      />
                      <div className="flex gap-6 w-full max-w-sm">
                        <Button 
                          variant="secondary" 
                          className="flex-1 h-16 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10"
                          onClick={handlePrevCard}
                        >
                          Sebelumnya
                        </Button>
                        <Button 
                          className="flex-1 h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
                          onClick={handleNextCard}
                        >
                          Lanjut
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <AdvancedQuiz key={selectedLesson} kanjiList={filteredKanji} progress={progress} onResult={handleQuizResult} />
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