import React from 'react';
import { motion } from 'framer-motion';

interface LessonSelectorProps {
  selectedLessons: number[];
  onSelectLessons: (lessons: number[]) => void;
  maxLesson: number;
}

const LessonSelector: React.FC<LessonSelectorProps> = ({ 
  selectedLessons, 
  onSelectLessons, 
  maxLesson 
}) => {
  const lessons = Array.from({ length: maxLesson }, (_, i) => i + 1);
  const isAllSelected = selectedLessons.length === 0;

  const toggleLesson = (lesson: number) => {
    if (selectedLessons.includes(lesson)) {
      onSelectLessons(selectedLessons.filter(l => l !== lesson));
    } else {
      onSelectLessons([...selectedLessons, lesson]);
    }
  };

  const selectAll = () => onSelectLessons([]);

  return (
    <div 
      className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar snap-x md:flex-wrap md:overflow-visible md:pb-0"
      data-testid="lesson-selector"
    >
      <button
        data-testid="lesson-select-all"
        onClick={selectAll}
        className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold transition-all snap-center select-none cursor-pointer whitespace-nowrap border ${
          isAllSelected 
            ? 'bg-foreground text-background border-foreground' 
            : 'bg-background text-foreground border-border hover:border-foreground/30'
        }`}
      >
        Semua
      </button>
      {lessons.map(lesson => {
        const isSelected = selectedLessons.includes(lesson);
        return (
          <motion.button
            key={lesson}
            data-testid={`lesson-${lesson}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLesson(lesson)}
            className={`inline-flex items-center justify-center px-3.5 py-2 rounded-full text-sm font-medium transition-all snap-center select-none cursor-pointer whitespace-nowrap border ${
              isSelected 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-background text-foreground border-border hover:border-foreground/30'
            }`}
          >
            L{lesson}
          </motion.button>
        );
      })}
    </div>
  );
};

export default LessonSelector;
