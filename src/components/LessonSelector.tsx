import React from 'react';
import './LessonSelector.css';

interface LessonSelectorProps {
  selectedLesson: number | 'all';
  onSelectLesson: (lesson: number | 'all') => void;
  maxLesson: number;
}

const LessonSelector: React.FC<LessonSelectorProps> = ({ selectedLesson, onSelectLesson, maxLesson }) => {
  const lessons = Array.from({ length: maxLesson }, (_, i) => i + 1);

  return (
    <div className="lesson-selector">
      <label htmlFor="lesson-select">Select Lesson: </label>
      <select 
        id="lesson-select" 
        value={selectedLesson} 
        onChange={(e) => {
          const val = e.target.value;
          onSelectLesson(val === 'all' ? 'all' : parseInt(val, 10));
        }}
      >
        <option value="all">All Lessons (1-{maxLesson})</option>
        {lessons.map(lesson => (
          <option key={lesson} value={lesson}>
            Lesson {lesson}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LessonSelector;