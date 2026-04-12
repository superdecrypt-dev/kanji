import React, { useState } from 'react';
import type { Kanji } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AdvancedQuizProps {
  kanjiList: Kanji[];
}

type QuizMode = 'kanjiToMeaning' | 'kanjiToReading';

interface QuizState {
  currentWord: { word: string; reading: string; meaning: string } | null;
  options: string[];
  mode: QuizMode;
  selectedAnswer: string | null;
}

const jukugoList = [
  { word: "毎日", reading: "まいにち", meaning: "setiap hari" },
  { word: "来年", reading: "らいねん", meaning: "tahun depan" },
  { word: "今年", reading: "ことし", meaning: "tahun ini" },
  { word: "今日", reading: "きょう", meaning: "hari ini" },
  { word: "明日", reading: "あした", meaning: "besok" },
  { word: "時計", reading: "とけい", meaning: "jam" },
  { word: "時間", reading: "じかん", meaning: "waktu" },
  { word: "会社", reading: "かいしゃ", meaning: "perusahaan" },
  { word: "社会", reading: "しゃかい", meaning: "masyarakat" },
  { word: "学校", reading: "がっこう", meaning: "sekolah" },
  { word: "学生", reading: "がくせい", meaning: "siswa" },
  { word: "大学", reading: "だいがく", meaning: "universitas" },
  { word: "有名", reading: "ゆうめい", meaning: "terkenal" },
  { word: "名前", reading: "なまえ", meaning: "nama" },
  { word: "午前", reading: "ごぜん", meaning: "pagi (AM)" },
  { word: "午後", reading: "ごご", meaning: "sore (PM)" },
  { word: "電気", reading: "でんき", meaning: "listrik" },
  { word: "電車", reading: "でんしゃ", meaning: "kereta listrik" },
  { word: "電話", reading: "でんわ", meaning: "telepon" },
  { word: "会話", reading: "かいわ", meaning: "percakapan" },
  { word: "食事", reading: "しょくじ", meaning: "makanan / makan" },
  { word: "食堂", reading: "しょくどう", meaning: "ruang makan / kantin" },
  { word: "自動車", reading: "じどうしゃ", meaning: "mobil" },
  { word: "自分", reading: "じぶん", meaning: "diri sendiri" },
  { word: "自転車", reading: "じてんしゃ", meaning: "sepeda" },
  { word: "家族", reading: "かぞく", meaning: "keluarga" },
  { word: "旅行", reading: "りょこう", meaning: "perjalanan / wisata" },
  { word: "写真", reading: "しゃしん", meaning: "foto" },
  { word: "英語", reading: "えいご", meaning: "bahasa Inggris" },
  { word: "日本語", reading: "にほんご", meaning: "bahasa Jepang" },
  { word: "音楽", reading: "おんがく", meaning: "musik" },
  { word: "病院", reading: "びょういん", meaning: "rumah sakit" },
  { word: "病気", reading: "びょうき", meaning: "penyakit" },
  { word: "映画", reading: "えいが", meaning: "film" },
  { word: "新聞", reading: "しんぶん", meaning: "koran" },
  { word: "地下鉄", reading: "ちかてつ", meaning: "kereta bawah tanah" },
  { word: "買い物", reading: "かいもの", meaning: "belanja" },
  { word: "料理", reading: "りょうり", meaning: "masakan" },
  { word: "理科", reading: "りか", meaning: "ilmu pengetahuan alam (IPA)" },
  { word: "数学", reading: "すうがく", meaning: "matematika" },
  { word: "文学", reading: "ぶんがく", meaning: "sastra" },
  { word: "安心", reading: "あんしん", meaning: "lega / tenang" },
  { word: "安全", reading: "あんぜん", meaning: "aman" },
  { word: "高校", reading: "こうこう", meaning: "SMA" },
  { word: "社長", reading: "しゃちょう", meaning: "presiden direktur" },
  { word: "男子", reading: "だんし", meaning: "anak laki-laki / pria" },
  { word: "女子", reading: "じょし", meaning: "anak perempuan / wanita" },
  { word: "男女", reading: "だんじょ", meaning: "pria dan wanita" },
  { word: "休日", reading: "きゅうじつ", meaning: "hari libur" },
  { word: "外出", reading: "がいしゅつ", meaning: "pergi keluar" }
];

function createNewQuestion(kanjiList: Kanji[], type: 'kanji' | 'jukugo'): QuizState {
  if (type === 'kanji') {
    if (kanjiList.length === 0) return { currentWord: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };

    const randomIndex = Math.floor(Math.random() * kanjiList.length);
    const targetKanji = kanjiList[randomIndex];
    
    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];

    let correctAnswer = '';
    let getOptionText: (k: Kanji) => string = () => '';

    switch (currentMode) {
      case 'kanjiToMeaning':
        correctAnswer = targetKanji.meaning;
        getOptionText = (k) => k.meaning;
        break;
      case 'kanjiToReading':
        correctAnswer = targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning;
        getOptionText = (k) => k.onyomi || k.kunyomi || k.meaning;
        break;
    }

    const wrongAnswers = new Set<string>();
    let maxTries = 50;
    while (wrongAnswers.size < 3 && maxTries > 0) {
      maxTries--;
      const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      if (randomWrong.id === targetKanji.id) continue;
      
      const wrongText = getOptionText(randomWrong);
      if (wrongText && wrongText !== correctAnswer) {
        wrongAnswers.add(wrongText);
      }
    }

    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return {
      currentWord: { word: targetKanji.kanji, reading: targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning, meaning: targetKanji.meaning },
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  } else {
    // Jukugo logic
    const randomIndex = Math.floor(Math.random() * jukugoList.length);
    const targetWord = jukugoList[randomIndex];
    
    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];

    let correctAnswer = '';
    let getOptionText: (k: typeof jukugoList[0]) => string = () => '';

    switch (currentMode) {
      case 'kanjiToMeaning':
        correctAnswer = targetWord.meaning;
        getOptionText = (k) => k.meaning;
        break;
      case 'kanjiToReading':
        correctAnswer = targetWord.reading;
        getOptionText = (k) => k.reading;
        break;
    }

    const wrongAnswers = new Set<string>();
    let maxTries = 50;
    while (wrongAnswers.size < 3 && maxTries > 0) {
      maxTries--;
      const randomWrong = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      if (randomWrong.word === targetWord.word) continue;
      
      const wrongText = getOptionText(randomWrong);
      if (wrongText && wrongText !== correctAnswer) {
        wrongAnswers.add(wrongText);
      }
    }

    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return {
      currentWord: targetWord,
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  }
}

const AdvancedQuiz: React.FC<AdvancedQuizProps> = ({ kanjiList }) => {
  const [quizType, setQuizType] = useState<'kanji' | 'jukugo'>('kanji');
  const [quizState, setQuizState] = useState<QuizState>(() => createNewQuestion(kanjiList, 'kanji'));
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isWrong, setIsWrong] = useState(false);

  const { currentWord, options, mode, selectedAnswer } = quizState;

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null || !currentWord) return;

    let correctAnswer = '';
    switch (mode) {
      case 'kanjiToMeaning': correctAnswer = currentWord.meaning; break;
      case 'kanjiToReading': correctAnswer = currentWord.reading; break;
    }

    const isCorrect = option === correctAnswer;
    
    setQuizState(prev => ({ ...prev, selectedAnswer: option }));
    if (!isCorrect) setIsWrong(true);
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    setTimeout(() => {
      setQuizState(createNewQuestion(kanjiList, quizType));
      setIsWrong(false);
    }, 2000);
  };

  const switchQuizType = (newType: 'kanji' | 'jukugo') => {
    if (quizType === newType) return;
    setQuizType(newType);
    setScore({ correct: 0, total: 0 });
    setQuizState(createNewQuestion(kanjiList, newType));
    setIsWrong(false);
  };

  if (!currentWord) return <div className="text-center py-20">Loading...</div>;

  let questionText = '';
  let questionDisplay = currentWord.word;
  
  switch (mode) {
    case 'kanjiToMeaning': questionText = `Apa arti dari ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?`; break;
    case 'kanjiToReading': questionText = `Bagaimana cara membaca ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?`; break;
  }

  let correctAnswer = '';
  switch (mode) {
    case 'kanjiToMeaning': correctAnswer = currentWord.meaning; break;
    case 'kanjiToReading': correctAnswer = currentWord.reading; break;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      {/* Quiz Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <button 
            onClick={() => switchQuizType('kanji')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${quizType === 'kanji' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Kuis Kanji
          </button>
          <button 
            onClick={() => switchQuizType('jukugo')}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${quizType === 'jukugo' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Kuis Kosakata (Jukugo)
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="text-primary font-black text-sm uppercase tracking-widest">
          Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span>
        </div>
        <div className="text-muted-foreground text-xs font-black uppercase tracking-widest opacity-60">
          Akurasi: {Math.round((score.correct / (score.total || 1)) * 100)}%
        </div>
      </div>
      
      <motion.div
        key={currentWord.word + mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-8 ring-destructive/10' : 'border-success ring-8 ring-success/20') : 'border-white/10'}`}>
          <CardContent className="p-16 text-center space-y-8 relative overflow-hidden">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] opacity-60 relative z-10">{questionText}</p>
            <motion.div 
              animate={isWrong ? { x: [-10, 10, -10, 10, 0], rotate: [-1, 1, -1, 1, 0] } : {}}
              className={`font-black leading-tight tracking-tighter relative z-10 text-[5rem] sm:text-[7rem] text-primary drop-shadow-2xl`}
            >
              {questionDisplay}
            </motion.div>

            <AnimatePresence>
              {isWrong && selectedAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success/20 border border-success/30 p-4 rounded-2xl relative z-10"
                >
                  <p className="text-[10px] font-black uppercase text-success tracking-widest mb-1">Jawaban Benar:</p>
                  <p className="text-xl font-black text-success">{correctAnswer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selectedAnswer;
          
          let btnVariant: 'outline' | 'success' | 'destructive' | 'glass' = 'glass';
          if (selectedAnswer) {
            if (isCorrect) btnVariant = 'success';
            else if (isSelected) btnVariant = 'destructive';
          }

          return (
            <motion.div
              key={index}
              whileHover={!selectedAnswer ? { scale: 1.02, y: -2 } : {}}
              whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
            >
              <Button 
                variant={btnVariant}
                className={`w-full h-24 text-xl font-black transition-all duration-300 border-2 rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50 hover:bg-white/10' : 'disabled:opacity-100'} ${selectedAnswer && isCorrect && !isSelected ? 'border-success/50 bg-success/10' : ''}`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center gap-4 px-2">
                  {selectedAnswer && isCorrect && <CheckCircle2 className="w-6 h-6" />}
                  {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-6 h-6 animate-shake" />}
                  <span className="truncate max-w-[200px]">{option}</span>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedQuiz;