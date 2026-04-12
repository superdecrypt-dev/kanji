import React, { useState } from 'react';
import type { Kanji } from '../data';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';

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

// Database Kosakata Jukugo JLPT N4 & N5 (100+ Entri)
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
  { word: "音楽", reading: "おんgあく", meaning: "musik" },
  { word: "病院", reading: "びょういん", meaning: "rumah sakit" },
  { word: "病気", reading: "びょうき", meaning: "penyakit" },
  { word: "映画", reading: "えいが", meaning: "film" },
  { word: "新聞", reading: "しんぶん", meaning: "koran" },
  { word: "地下鉄", reading: "ちかてつ", meaning: "kereta bawah tanah" },
  { word: "買い物", reading: "かいもの", meaning: "belanja" },
  { word: "料理", reading: "りょうり", meaning: "masakan" },
  { word: "理科", reading: "りか", meaning: "IPA" },
  { word: "数学", reading: "すうがく", meaning: "matematika" },
  { word: "文学", reading: "ぶんがく", meaning: "sastra" },
  { word: "安心", reading: "あんしん", meaning: "lega / tenang" },
  { word: "安全", reading: "あんぜん", meaning: "aman" },
  { word: "高校", reading: "こうこう", meaning: "SMA" },
  { word: "社長", reading: "しゃちょう", meaning: "direktur" },
  { word: "男子", reading: "だんし", meaning: "pria" },
  { word: "女子", reading: "じょし", meaning: "wanita" },
  { word: "男女", reading: "だんじょ", meaning: "pria dan wanita" },
  { word: "休日", reading: "きゅうじつ", meaning: "hari libur" },
  { word: "外出", reading: "がいしゅつ", meaning: "pergi keluar" },
  { word: "勉強", reading: "べんきょう", meaning: "belajar" },
  { word: "朝食", reading: "ちょうしょく", meaning: "sarapan" },
  { word: "夕食", reading: "ゆうしょく", meaning: "makan malam" },
  { word: "昼食", reading: "ちゅうしょく", meaning: "makan siang" },
  { word: "出発", reading: "しゅっぱつ", meaning: "keberangkatan" },
  { word: "到着", reading: "とうちゃく", meaning: "kedatangan" },
  { word: "準備", reading: "じゅんび", meaning: "persiapan" },
  { word: "連絡", reading: "れんらく", meaning: "hubungi / kontak" },
  { word: "反対", reading: "はんたい", meaning: "berlawanan / setuju" },
  { word: "賛成", reading: "さんせい", meaning: "setuju" },
  { word: "意味", reading: "いみ", meaning: "arti" },
  { word: "注意", reading: "ちゅうい", meaning: "perhatian / peringatan" },
  { word: "意見", reading: "いけん", meaning: "pendapat" },
  { word: "計画", reading: "けいかく", meaning: "rencana" },
  { word: "経験", reading: "けいけん", meaning: "pengalaman" },
  { word: "経済", reading: "けいざい", meaning: "ekonomi" },
  { word: "生活", reading: "せいかつ", meaning: "kehidupan" },
  { word: "活動", reading: "かつどう", meaning: "aktivitas" },
  { word: "運動", reading: "うんどう", meaning: "olahraga" },
  { word: "動物", reading: "どうぶつ", meaning: "hewan" },
  { word: "場所", reading: "ばしょ", meaning: "tempat" },
  { word: "場合", reading: "ばあい", meaning: "kasus / situasi" },
  { word: "建物", reading: "たてもの", meaning: "bangunan" },
  { word: "説明", reading: "せつめい", meaning: "penjelasan" },
  { word: "発明", reading: "はつめい", meaning: "penemuan" },
  { word: "空気", reading: "くうき", meaning: "udara" },
  { word: "空港", reading: "くうこう", meaning: "bandara" },
  { word: "港町", reading: "みなとまち", meaning: "kota pelabuhan" },
  { word: "海岸", reading: "かいがん", meaning: "pantai" },
  { word: "世界", reading: "せかい", meaning: "dunia" },
  { word: "季節", reading: "きせつ", meaning: "musim" },
  { word: "天気", reading: "てんき", meaning: "cuaca" },
  { word: "気分", reading: "きぶん", meaning: "perasaan" },
  { word: "平和", reading: "へいわ", meaning: "perdamaian" },
  { word: "理由", reading: "りゆう", meaning: "alasan" },
  { word: "自由", reading: "じゆう", meaning: "bebas" },
  { word: "関係", reading: "かんけい", meaning: "hubungan" },
  { word: "方法", reading: "ほうほう", meaning: "metode / cara" },
  { word: "利用", reading: "りよう", meaning: "penggunaan" },
  { word: "目的", reading: "もくてき", meaning: "tujuan" },
  { word: "特別", reading: "とくべつ", meaning: "khusus" },
  { word: "別々", reading: "べつべつ", meaning: "terpisah" },
  { word: "急行", reading: "きゅうこう", meaning: "kereta cepat" },
  { word: "特急", reading: "とっきゅう", meaning: "ekspres terbatas" },
  { word: "全部", reading: "ぜんぶ", meaning: "semua" },
  { word: "一部分", reading: "いちぶぶん", meaning: "sebagian" },
  { word: "心配", reading: "しんぱい", meaning: "khawatir" },
  { word: "交通", reading: "こうつう", meaning: "lalu lintas" },
  { word: "道具", reading: "どうぐ", meaning: "alat" },
  { word: "具合", reading: "ぐあい", meaning: "kondisi" },
  { word: "都合", reading: "つごう", meaning: "kenyamanan waktu" },
  { word: "気分", reading: "きぶん", meaning: "suasana hati" },
  { word: "電気", reading: "でんき", meaning: "listrik" },
  { word: "人気", reading: "にんき", meaning: "populer" },
  { word: "元気", reading: "げんき", meaning: "sehat" }
];

function createNewQuestion(kanjiList: Kanji[], type: 'kanji' | 'jukugo', recentWords: string[]): QuizState {
  if (type === 'kanji') {
    if (kanjiList.length === 0) return { currentWord: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };
    const targetKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];
    let correctAnswer = currentMode === 'kanjiToMeaning' ? targetKanji.meaning : (targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning);
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      if (randomWrong.id === targetKanji.id) continue;
      const wrongText = currentMode === 'kanjiToMeaning' ? randomWrong.meaning : (randomWrong.onyomi || randomWrong.kunyomi || randomWrong.meaning);
      if (wrongText && wrongText !== correctAnswer) wrongAnswers.add(wrongText);
    }
    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);
    return {
      currentWord: { word: targetKanji.kanji, reading: targetKanji.onyomi || targetKanji.kunyomi || targetKanji.meaning, meaning: targetKanji.meaning },
      mode: currentMode,
      options: allOptions,
      selectedAnswer: null
    };
  } else {
    // Jukugo logic (Local Database)
    let targetWord = jukugoList[Math.floor(Math.random() * jukugoList.length)];
    // Prevent immediate repeats
    let tries = 0;
    while (recentWords.includes(targetWord.word) && tries < 10) {
      targetWord = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      tries++;
    }

    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];
    let correctAnswer = currentMode === 'kanjiToMeaning' ? targetWord.meaning : targetWord.reading;

    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const randomWrong = jukugoList[Math.floor(Math.random() * jukugoList.length)];
      if (randomWrong.word === targetWord.word) continue;
      const wrongText = currentMode === 'kanjiToMeaning' ? randomWrong.meaning : randomWrong.reading;
      if (wrongText && wrongText !== correctAnswer) wrongAnswers.add(wrongText);
    }
    const allOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);
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
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(() => createNewQuestion(kanjiList, 'kanji', []));
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isWrong, setIsWrong] = useState(false);

  const handleAnswerClick = (option: string) => {
    if (!quizState || quizState.selectedAnswer !== null || !quizState.currentWord) return;

    let correctAnswer = quizState.mode === 'kanjiToMeaning' ? quizState.currentWord.meaning : quizState.currentWord.reading;
    const isCorrect = option === correctAnswer;
    
    setQuizState(prev => prev ? { ...prev, selectedAnswer: option } : null);
    if (!isCorrect) setIsWrong(true);
    
    setScore(prev => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));

    setTimeout(() => {
      setIsWrong(false);
      const newRecent = [...recentWords.slice(-14), quizState.currentWord!.word];
      setRecentWords(newRecent);
      setQuizState(createNewQuestion(kanjiList, quizType, newRecent));
    }, 1500);
  };

  const switchQuizType = (newType: 'kanji' | 'jukugo') => {
    if (quizType === newType) return;
    setQuizType(newType);
    setScore({ correct: 0, total: 0 });
    setIsWrong(false);
    setQuizState(createNewQuestion(kanjiList, newType, []));
  };

  if (!quizState || !quizState.currentWord) return <div className="text-center py-20">Memuat...</div>;

  const { currentWord, options, mode, selectedAnswer } = quizState;
  const questionText = mode === 'kanjiToMeaning' ? `Apa arti dari ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?` : `Cara baca ${quizType === 'kanji' ? 'Kanji' : 'Kosakata'} ini?`;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <div className="flex justify-center mb-6">
        <div className="flex p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
          <button onClick={() => switchQuizType('kanji')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${quizType === 'kanji' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground'}`}>Kuis Kanji</button>
          <button onClick={() => switchQuizType('jukugo')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${quizType === 'jukugo' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground'}`}><BookOpen size={14} /> Jukugo (100+)</button>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
        <div className="text-primary font-black text-sm uppercase tracking-widest">Skor: <span className="text-xl ml-2">{score.correct} / {score.total}</span></div>
        <div className="text-muted-foreground text-xs font-black uppercase tracking-widest opacity-60">Akurasi: {Math.round((score.correct / (score.total || 1)) * 100)}%</div>
      </div>
      
      <motion.div key={currentWord.word + mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={`overflow-hidden border-2 transition-all duration-500 bg-glass/10 backdrop-blur-3xl shadow-2xl ${selectedAnswer ? (isWrong ? 'border-destructive ring-8 ring-destructive/10' : 'border-success ring-8 ring-success/20') : 'border-white/10'}`}>
          <CardContent className="p-16 text-center space-y-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${selectedAnswer ? (isWrong ? 'bg-destructive' : 'bg-success') : 'bg-primary'}`} />
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] opacity-60 relative z-10">{questionText}</p>
            <div className="font-black leading-tight tracking-tighter relative z-10 text-[5rem] sm:text-[7rem] text-primary drop-shadow-2xl">{currentWord.word}</div>
            <AnimatePresence>{isWrong && selectedAnswer && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-success/20 border border-success/30 p-4 rounded-2xl relative z-10">
                <p className="text-[10px] font-black uppercase text-success tracking-widest mb-1">Jawaban Benar:</p>
                <p className="text-xl font-black text-success">{mode === 'kanjiToMeaning' ? currentWord.meaning : currentWord.reading}</p>
              </motion.div>
            )}</AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option, index) => {
          const isCorrect = option === (mode === 'kanjiToMeaning' ? currentWord.meaning : currentWord.reading);
          const isSelected = option === selectedAnswer;
          let btnVariant: 'outline' | 'success' | 'destructive' | 'glass' = 'glass';
          if (selectedAnswer) {
            if (isCorrect) btnVariant = 'success';
            else if (isSelected) btnVariant = 'destructive';
          }
          return (
            <motion.div key={index} whileHover={!selectedAnswer ? { scale: 1.02, y: -2 } : {}} whileTap={!selectedAnswer ? { scale: 0.98 } : {}}>
              <Button variant={btnVariant} className={`w-full h-24 text-xl font-black transition-all duration-300 border-2 rounded-[1.5rem] shadow-lg ${!selectedAnswer ? 'border-white/10 hover:border-primary/50' : 'disabled:opacity-100'} ${selectedAnswer && isCorrect && !isSelected ? 'border-success/50 bg-success/10' : ''}`} onClick={() => handleAnswerClick(option)} disabled={selectedAnswer !== null}>
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