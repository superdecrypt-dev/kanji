import React, { useMemo, useState } from 'react';
import type { Kanji } from '../data';
import type { ProgressState } from '../store/useProgress';
import { BookOpen, Trophy, Clock, Target, Zap, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface DashboardProps {
  kanjiList: Kanji[];
  progress: ProgressState;
  onNavigate: (mode: 'flashcards' | 'quiz' | 'list') => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ kanjiList, progress, onNavigate, onReset }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      className="space-y-16 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {[
          { label: 'Baru', value: stats.newKanji, icon: Target, color: 'text-primary', bg: 'bg-primary/20' },
          { label: 'Belajar', value: stats.learning, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/20' },
          { label: 'Review', value: stats.reviewDue, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/20' },
          { label: 'Hafal', value: stats.mastered, icon: Trophy, color: 'text-success', bg: 'bg-success/20' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="group overflow-hidden border-glass-border/40 bg-glass/20 backdrop-blur-2xl shadow-2xl hover:bg-glass/40">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-5">
                <div className={`p-5 rounded-3xl ${stat.bg} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                  <stat.icon className={`w-10 h-10 ${stat.color} drop-shadow-sm`} />
                </div>
                <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-70">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 justify-center items-stretch sm:items-center px-2 pt-6">
        <Button 
          size="lg" 
          className="flex-1 sm:max-w-md gap-4 shadow-2xl hover:scale-[1.03] active:scale-95 transition-all font-black text-xl rounded-3xl h-20"
          onClick={() => onNavigate('flashcards')}
        >
          <BookOpen className="w-8 h-8" /> Mulai Menghafal
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1 sm:max-w-md gap-4 border-4 hover:bg-secondary transition-all font-black text-xl rounded-3xl h-20"
          onClick={() => onNavigate('quiz')}
        >
          <Zap className="w-8 h-8 text-orange-500 fill-orange-500" /> Ambil Kuis
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Keseluruhan Progres
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Target N4 (248 Kanji)</span>
                <span>{Math.round(((stats.mastered + stats.learning) / kanjiList.length) * 100)}%</span>
              </div>
              <Progress 
                value={((stats.mastered + stats.learning) / kanjiList.length) * 100} 
                className="h-3"
              />
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span>{stats.mastered} Hafal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>{stats.learning} Belajar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-10 flex justify-center">
        {!showResetConfirm ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-destructive gap-2 opacity-50 hover:opacity-100 transition-all"
            onClick={() => setShowResetConfirm(true)}
          >
            <Trash2 className="w-4 h-4" /> Reset Progres Belajar
          </Button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-destructive/10 p-6 rounded-3xl border-2 border-destructive/20 flex flex-col items-center gap-4 text-center max-w-sm"
          >
            <div className="flex items-center gap-2 text-destructive font-black uppercase tracking-tighter">
              <AlertTriangle className="w-5 h-5" /> Hapus Semua Data?
            </div>
            <p className="text-xs font-bold text-muted-foreground">Tindakan ini akan menghapus seluruh status hafalan dan progres kuis Anda secara permanen.</p>
            <div className="flex gap-3 w-full">
              <Button 
                variant="destructive" 
                className="flex-1 h-12 rounded-xl font-bold"
                onClick={() => {
                  onReset();
                  setShowResetConfirm(false);
                }}
              >
                Ya, Reset
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-12 rounded-xl font-bold border-2"
                onClick={() => setShowResetConfirm(false)}
              >
                Batal
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;