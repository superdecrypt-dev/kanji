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
      const newSelection = selectedLessons.filter(l => l !== lesson);
      onSelectLessons(newSelection);
    } else {
      onSelectLessons([...selectedLessons, lesson]);
    }
  };

  const selectAll = () => {
    onSelectLessons([]);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
      <button
        onClick={selectAll}
        className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
          isAllSelected 
            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
            : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20'
        }`}
      >
        Semua
      </button>
      {lessons.map(lesson => {
        const isSelected = selectedLessons.includes(lesson);
        return (
          <motion.button
            key={lesson}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLesson(lesson)}
            className={`px-4 py-2.5 rounded-2xl text-[10px] font-black transition-all duration-300 border-2 ${
              isSelected 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20'
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