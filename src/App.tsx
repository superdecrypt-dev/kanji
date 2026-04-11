import { useState, useMemo, useEffect } from 'react';
import { kanjiList } from './data';
import Flashcard from './components/Flashcard';
import AdvancedQuiz from './components/AdvancedQuiz';
import LessonSelector from './components/LessonSelector';
import Dashboard from './components/Dashboard';
import KanjiList from './components/KanjiList';
import { useProgress } from './store/useProgress';
import { Moon, Sun, LayoutDashboard, Layers, PlayCircle, List } from 'lucide-react';
import './App.css';

type AppMode = 'dashboard' | 'flashcards' | 'quiz' | 'list';

function App() {
  const [mode, setMode] = useState<AppMode>('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const { progress, updateKanji, markMastered, isLoaded } = useProgress();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
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

  if (!isLoaded) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <h1>Kanji</h1>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
        
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${mode === 'dashboard' ? 'active' : ''}`}
            onClick={() => setMode('dashboard')}
          >
             <LayoutDashboard size={18} /> <span className="hide-mobile">Dashboard</span>
          </button>
          <button 
            className={`mode-btn ${mode === 'list' ? 'active' : ''}`}
            onClick={() => setMode('list')}
          >
             <List size={18} /> <span className="hide-mobile">List</span>
          </button>
          <button 
            className={`mode-btn ${mode === 'flashcards' ? 'active' : ''}`}
            onClick={() => { setMode('flashcards'); setCurrentCardIndex(0); }}
          >
             <Layers size={18} /> <span className="hide-mobile">Study</span>
          </button>
          <button 
            className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`}
            onClick={() => setMode('quiz')}
          >
             <PlayCircle size={18} /> <span className="hide-mobile">Quiz</span>
          </button>
        </div>
      </header>

      <main className="app-main">
        {mode === 'dashboard' ? (
           <Dashboard kanjiList={kanjiList} progress={progress} onNavigate={(m) => setMode(m as AppMode)} />
        ) : mode === 'list' ? (
           <KanjiList kanjiList={kanjiList} progress={progress} />
        ) : (
          <>
            <LessonSelector 
              selectedLesson={selectedLesson} 
              onSelectLesson={(lesson) => {
                setSelectedLesson(lesson);
                setCurrentCardIndex(0);
              }} 
              maxLesson={maxLesson} 
            />

            {filteredKanji.length === 0 ? (
              <div className="no-data">No Kanji found for this selection.</div>
            ) : mode === 'flashcards' ? (
              <div className="flashcard-section">
                <p className="card-counter">
                  Card {currentCardIndex + 1} of {filteredKanji.length}
                </p>
                <Flashcard 
                   key={filteredKanji[currentCardIndex].id}
                   kanji={filteredKanji[currentCardIndex]} 
                   progress={progress[filteredKanji[currentCardIndex].id]}
                   onMarkMastered={() => markMastered(filteredKanji[currentCardIndex].id)}
                   onNext={handleNextCard}
                />
                <div className="controls">
                  <button onClick={handlePrevCard} className="nav-btn">Previous</button>
                  <button onClick={handleNextCard} className="nav-btn primary">Next</button>
                </div>
              </div>
            ) : (
              <AdvancedQuiz key={selectedLesson} kanjiList={filteredKanji} onResult={handleQuizResult} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;