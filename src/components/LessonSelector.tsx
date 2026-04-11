import React from 'react';

interface LessonSelectorProps {
  selectedLesson: number | 'all';
  onSelectLesson: (lesson: number | 'all') => void;
  maxLesson: number;
}

const LessonSelector: React.FC<LessonSelectorProps> = ({ selectedLesson, onSelectLesson, maxLesson }) => {
  const lessons = Array.from({ length: maxLesson }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <select 
        id="lesson-select" 
        value={selectedLesson} 
        className="bg-background border-2 border-primary/20 rounded-xl px-4 py-2 text-sm font-bold text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer transition-all hover:border-primary/40"
        onChange={(e) => {
          const val = e.target.value;
          onSelectLesson(val === 'all' ? 'all' : parseInt(val, 10));
        }}
      >
        <option value="all">Semua Pelajaran (1-{maxLesson})</option>
        {lessons.map(lesson => (
          <option key={lesson} value={lesson}>
            Pelajaran {lesson}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LessonSelector;