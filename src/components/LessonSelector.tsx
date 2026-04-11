import React from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

interface LessonSelectorProps {
  selectedLesson: number | 'all';
  onSelectLesson: (lesson: number | 'all') => void;
  maxLesson: number;
}

const LessonSelector: React.FC<LessonSelectorProps> = ({ 
  selectedLesson, 
  onSelectLesson, 
  maxLesson 
}) => {
  const lessons = Array.from({ length: maxLesson }, (_, i) => i + 1);

  return (
    <div className="relative group min-w-[240px]">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none group-hover:scale-110 transition-transform">
        <BookOpen size={18} />
      </div>
      <select
        value={selectedLesson}
        onChange={(e) => {
          const val = e.target.value;
          onSelectLesson(val === 'all' ? 'all' : parseInt(val, 10));
        }}
        className="w-full pl-14 pr-12 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 cursor-pointer appearance-none font-black text-sm uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/20 text-foreground shadow-xl"
      >
        <option value="all" className="bg-background text-foreground">Semua Materi (1-{maxLesson})</option>
        {lessons.map(lesson => (
          <option key={lesson} value={lesson} className="bg-background text-foreground">
            Pelajaran {lesson}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors">
        <ChevronDown size={18} />
      </div>
    </div>
  );
};

export default LessonSelector;