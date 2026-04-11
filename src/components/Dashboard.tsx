import React, { useMemo } from 'react';
import type { Kanji } from '../data';
import type { ProgressState } from '../store/useProgress';
import { BookOpen, Trophy, Clock, Target } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  kanjiList: Kanji[];
  progress: ProgressState;
  onNavigate: (mode: 'flashcards' | 'quiz') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ kanjiList, progress, onNavigate }) => {
  const stats = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let reviewDue = 0;
    const now = Date.now();

    kanjiList.forEach(k => {
      const p = progress[k.id];
      if (!p) return;
      if (p.level === 5) mastered++;
      else if (p.level > 0) {
        learning++;
        if (p.nextReview <= now) reviewDue++;
      }
    });

    const newKanji = kanjiList.length - mastered - learning;

    return { mastered, learning, newKanji, reviewDue };
  }, [kanjiList, progress]);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <Target className="stat-icon text-primary" />
          <div className="stat-info">
            <h3>New</h3>
            <p>{stats.newKanji}</p>
          </div>
        </div>
        <div className="stat-card">
          <BookOpen className="stat-icon text-secondary" />
          <div className="stat-info">
            <h3>Learning</h3>
            <p>{stats.learning}</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock className="stat-icon text-accent" />
          <div className="stat-info">
            <h3>Reviews Due</h3>
            <p>{stats.reviewDue}</p>
          </div>
        </div>
        <div className="stat-card">
          <Trophy className="stat-icon text-success" />
          <div className="stat-info">
            <h3>Mastered</h3>
            <p>{stats.mastered}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button 
          className="action-btn primary"
          onClick={() => onNavigate('flashcards')}
        >
          <BookOpen size={20} /> Study Flashcards
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => onNavigate('quiz')}
        >
          <Target size={20} /> Take a Quiz
        </button>
      </div>

      <div className="progress-section">
        <h3>Overall Progress</h3>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill success" 
            style={{ width: `${(stats.mastered / kanjiList.length) * 100}%` }}
          ></div>
          <div 
            className="progress-bar-fill learning" 
            style={{ width: `${(stats.learning / kanjiList.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {Math.round(((stats.mastered + stats.learning) / kanjiList.length) * 100)}% of N4 Kanji encountered.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;