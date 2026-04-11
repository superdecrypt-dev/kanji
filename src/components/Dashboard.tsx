import React, { useMemo, useState } from 'react';
import type { Kanji } from '../data';
import type { ProgressState, AppMetadata } from '../store/useProgress';
import { BookOpen, Trophy, Clock, Target, Zap, Trash2, AlertTriangle, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface DashboardProps {
  kanjiList: Kanji[];
  progress: ProgressState;
  metadata: AppMetadata;
  onNavigate: (mode: 'flashcards' | 'quiz' | 'list') => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ kanjiList, progress, metadata, onNavigate, onReset }) => {
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
      className="space-y-12 py-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Streak & Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="bg-gradient-to-br from-primary/20 to-purple-500/10 border-primary/20 rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Flame className="w-32 h-32 text-primary" />
            </div>
            <CardContent className="p-10 relative z-10 flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/30">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Daily Study Streak</span>
              </div>
              <h3 className="text-6xl font-black tracking-tighter mb-2 italic">
                {metadata.streak} <span className="text-2xl font-bold not-italic opacity-60">Hari</span>
              </h3>
              <p className="text-sm font-bold text-muted-foreground opacity-80">
                {metadata.streak > 0 
                  ? "Luar biasa! Pertahankan semangat belajar Anda setiap hari." 
                  : "Mulai belajar hari ini untuk membangun streak Anda!"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full bg-orange-500/10 border-orange-500/20 rounded-[2.5rem] hover:bg-orange-500/20">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center h-full space-y-4">
              <div className="p-5 bg-orange-500 rounded-[2rem] shadow-xl shadow-orange-500/20">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-black tracking-tighter">{stats.reviewDue}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Review Hari Ini</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:bg-orange-500/10"
                onClick={() => onNavigate('flashcards')}
              >
                Mulai Review
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: 'Belum Dipelajari', value: stats.newKanji, icon: Target, color: 'text-primary', bg: 'bg-primary/20' },
          { label: 'Sedang Dipelajari', value: stats.learning, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/20' },
          { label: 'Sudah Hafal', value: stats.mastered, icon: Trophy, color: 'text-success', bg: 'bg-success/20' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="group overflow-hidden border-white/10 bg-white/5 backdrop-blur-2xl rounded-[2rem] hover:bg-white/10">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black opacity-60">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-stretch sm:items-center pt-4">
        <Button 
          size="lg" 
          className="flex-1 sm:max-w-md gap-4 shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all font-black text-xl rounded-[2rem] h-24"
          onClick={() => onNavigate('flashcards')}
        >
          <BookOpen className="w-8 h-8" /> Mulai Menghafal
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex-1 sm:max-w-md gap-4 border-4 hover:bg-white/10 transition-all font-black text-xl rounded-[2rem] h-24"
          onClick={() => onNavigate('quiz')}
        >
          <Zap className="w-8 h-8 text-orange-500 fill-orange-500" /> Ambil Kuis
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-xl">
          <CardHeader className="pb-2 p-8">
            <CardTitle className="text-lg flex items-center gap-3 font-black uppercase tracking-widest opacity-70">
              <Zap className="w-5 h-5 text-primary" /> Keseluruhan Progres N4
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                <span className="opacity-60 text-xs">Total Penguasaan</span>
                <span className="text-primary">{Math.round(((stats.mastered + stats.learning) / kanjiList.length) * 100)}%</span>
              </div>
              <Progress 
                value={((stats.mastered + stats.learning) / kanjiList.length) * 100} 
                className="h-4 bg-white/5 border border-white/5"
              />
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground pt-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-success shadow-lg shadow-success/20" />
                <span>{stats.mastered} Hafal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/20" />
                <span>{stats.learning} Belajar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-8 flex justify-center">
        {!showResetConfirm ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-destructive gap-2 opacity-30 hover:opacity-100 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
            onClick={() => setShowResetConfirm(true)}
          >
            <Trash2 className="w-4 h-4" /> Reset Progres Belajar
          </Button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-destructive/10 p-8 rounded-[2.5rem] border-2 border-destructive/20 flex flex-col items-center gap-6 text-center max-w-sm"
          >
            <div className="flex items-center gap-3 text-destructive font-black uppercase tracking-tighter text-xl">
              <AlertTriangle className="w-6 h-6" /> Hapus Data?
            </div>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">Tindakan ini akan menghapus seluruh status hafalan, streak, dan progres Anda secara permanen.</p>
            <div className="flex gap-4 w-full">
              <Button 
                variant="destructive" 
                className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest"
                onClick={() => {
                  onReset();
                  setShowResetConfirm(false);
                }}
              >
                Hapus
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-2"
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