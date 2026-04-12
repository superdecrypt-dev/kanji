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

// Database Kosakata Jukugo JLPT N4 & N5 (250 Entri = 500 Variasi Soal)
const jukugoList = [
  { word: "毎日", reading: "まいにち", meaning: "setiap hari" },
  { word: "来年", reading: "らいねん", meaning: "tahun depan" },
  { word: "今年", reading: "ことし", meaning: "tahun ini" },
  { word: "今日", reading: "きょう", meaning: "hari ini" },
  { word: "明日", reading: "あした", meaning: "besok" },
  { word: "時計", reading: "tokei", meaning: "jam" },
  { word: "時間", reading: "jikan", meaning: "waktu" },
  { word: "会社", reading: "kaisha", meaning: "perusahaan" },
  { word: "社会", reading: "shakai", meaning: "masyarakat" },
  { word: "学校", reading: "gakkou", meaning: "sekolah" },
  { word: "学生", reading: "gakusei", meaning: "siswa" },
  { word: "大学", reading: "daigaku", meaning: "universitas" },
  { word: "有名", reading: "yuumei", meaning: "terkenal" },
  { word: "名前", reading: "namae", meaning: "nama" },
  { word: "午前", reading: "gozen", meaning: "pagi (AM)" },
  { word: "午後", reading: "gogo", meaning: "sore (PM)" },
  { word: "電気", reading: "denki", meaning: "listrik" },
  { word: "電車", reading: "densha", meaning: "kereta listrik" },
  { word: "電話", reading: "denwa", meaning: "telepon" },
  { word: "会話", reading: "kaiwa", meaning: "percakapan" },
  { word: "食事", reading: "shokuji", meaning: "makanan / makan" },
  { word: "食堂", reading: "shokudou", meaning: "kantin" },
  { word: "自動車", reading: "jidousha", meaning: "mobil" },
  { word: "自分", reading: "jibun", meaning: "diri sendiri" },
  { word: "自転車", reading: "jitensha", meaning: "sepeda" },
  { word: "家族", reading: "kazoku", meaning: "keluarga" },
  { word: "旅行", reading: "ryokou", meaning: "perjalanan" },
  { word: "写真", reading: "shashin", meaning: "foto" },
  { word: "英語", reading: "eigo", meaning: "bahasa Inggris" },
  { word: "日本語", reading: "nihongo", meaning: "bahasa Jepang" },
  { word: "音楽", reading: "ongaku", meaning: "musik" },
  { word: "病院", reading: "byouin", meaning: "rumah sakit" },
  { word: "病気", reading: "byouki", meaning: "penyakit" },
  { word: "映画", reading: "eiga", meaning: "film" },
  { word: "新聞", reading: "shinbun", meaning: "koran" },
  { word: "地下鉄", reading: "chikatetsu", meaning: "kereta bawah tanah" },
  { word: "買い物", reading: "kaimono", meaning: "belanja" },
  { word: "料理", reading: "ryouri", meaning: "masakan" },
  { word: "理科", reading: "rika", meaning: "IPA" },
  { word: "数学", reading: "suugaku", meaning: "matematika" },
  { word: "文学", reading: "bungaku", meaning: "sastra" },
  { word: "安心", reading: "anshin", meaning: "lega" },
  { word: "安全", reading: "anzen", meaning: "aman" },
  { word: "高校", reading: "koukou", meaning: "SMA" },
  { word: "社長", reading: "shachou", meaning: "direktur" },
  { word: "男子", reading: "danshi", meaning: "pria" },
  { word: "女子", reading: "joshi", meaning: "wanita" },
  { word: "男女", reading: "danjo", meaning: "pria dan wanita" },
  { word: "休日", reading: "kyuujitsu", meaning: "hari libur" },
  { word: "外出", reading: "gaishutsu", meaning: "pergi keluar" },
  { word: "勉強", reading: "benkyou", meaning: "belajar" },
  { word: "朝食", reading: "choushoku", meaning: "sarapan" },
  { word: "夕食", reading: "yuushoku", meaning: "makan malam" },
  { word: "昼食", reading: "chuushoku", meaning: "makan siang" },
  { word: "出発", reading: "shuppatsu", meaning: "keberangkatan" },
  { word: "到着", reading: "touchaku", meaning: "kedatangan" },
  { word: "準備", reading: "junbi", meaning: "persiapan" },
  { word: "連絡", reading: "renraku", meaning: "kontak" },
  { word: "反対", reading: "hantai", meaning: "berlawanan" },
  { word: "賛成", reading: "sansei", meaning: "setuju" },
  { word: "意味", reading: "imi", meaning: "arti" },
  { word: "注意", reading: "chuui", meaning: "perhatian" },
  { word: "意見", reading: "iken", meaning: "pendapat" },
  { word: "計画", reading: "keikaku", meaning: "rencana" },
  { word: "経験", reading: "keiken", meaning: "pengalaman" },
  { word: "経済", reading: "keizai", meaning: "ekonomi" },
  { word: "生活", reading: "seikatsu", meaning: "kehidupan" },
  { word: "活動", reading: "katsudou", meaning: "aktivitas" },
  { word: "運動", reading: "undou", meaning: "olahraga" },
  { word: "動物", reading: "doubutsu", meaning: "hewan" },
  { word: "場所", reading: "basho", meaning: "tempat" },
  { word: "場合", reading: "baai", meaning: "situasi" },
  { word: "建物", reading: "tatemono", meaning: "bangunan" },
  { word: "説明", reading: "setsumei", meaning: "penjelasan" },
  { word: "発明", reading: "hatsumei", meaning: "penemuan" },
  { word: "空気", reading: "kuuki", meaning: "udara" },
  { word: "空港", reading: "kuukou", meaning: "bandara" },
  { word: "海岸", reading: "kaigan", meaning: "pantai" },
  { word: "世界", reading: "sekai", meaning: "dunia" },
  { word: "季節", reading: "kisetsu", meaning: "musim" },
  { word: "天気", reading: "tenki", meaning: "cuaca" },
  { word: "気分", reading: "kibun", meaning: "perasaan" },
  { word: "平和", reading: "heiwa", meaning: "perdamaian" },
  { word: "理由", reading: "riyuu", meaning: "alasan" },
  { word: "自由", reading: "jiyuu", meaning: "bebas" },
  { word: "関係", reading: "kankei", meaning: "hubungan" },
  { word: "方法", reading: "houhou", meaning: "metode" },
  { word: "利用", reading: "riyou", meaning: "penggunaan" },
  { word: "目的", reading: "mokuteki", meaning: "tujuan" },
  { word: "特別", reading: "tokubetsu", meaning: "khusus" },
  { word: "全部", reading: "zenbu", meaning: "semua" },
  { word: "部分", reading: "bubun", meaning: "bagian" },
  { word: "心配", reading: "shinpai", meaning: "khawatir" },
  { word: "交通", reading: "koutsuu", meaning: "lalu lintas" },
  { word: "道具", reading: "dougu", meaning: "alat" },
  { word: "都合", reading: "tsugou", meaning: "kenyamanan" },
  { word: "人気", reading: "ninki", meaning: "populer" },
  { word: "元気", reading: "genki", meaning: "sehat" },
  { word: "最後", reading: "saigo", meaning: "terakhir" },
  { word: "最初", reading: "saisho", meaning: "pertama" },
  { word: "最高", reading: "saikou", meaning: "terbaik" },
  { word: "最近", reading: "saikin", meaning: "akhir-akhir ini" },
  { word: "最低", reading: "saitei", meaning: "terendah" },
  { word: "最近", reading: "saikin", meaning: "baru-baru ini" },
  { word: "辞書", reading: "jisho", meaning: "kamus" },
  { word: "図書", reading: "tosho", meaning: "buku" },
  { word: "図書館", reading: "toshokan", meaning: "perpustakaan" },
  { word: "大使館", reading: "taishikan", meaning: "kedutaan" },
  { word: "映画館", reading: "eigakan", meaning: "bioskop" },
  { word: "美術館", reading: "bijutsukan", meaning: "museum seni" },
  { word: "博物館", reading: "hakubutsukan", meaning: "museum" },
  { word: "体育館", reading: "taiikukan", meaning: "gymnasium" },
  { word: "旅館", reading: "ryokan", meaning: "penginapan Jepang" },
  { word: "練習", reading: "renshuu", meaning: "latihan" },
  { word: "自習", reading: "jishuu", meaning: "belajar mandiri" },
  { word: "予習", reading: "yoshuu", meaning: "persiapan belajar" },
  { word: "復習", reading: "fukushuu", meaning: "mengulang pelajaran" },
  { word: "宿題", reading: "shukudai", meaning: "PR" },
  { word: "問題", reading: "mondai", meaning: "masalah / soal" },
  { word: "話題", reading: "wadai", meaning: "topik pembicaraan" },
  { word: "質問", reading: "shitsumon", meaning: "pertanyaan" },
  { word: "訪問", reading: "houmon", meaning: "kunjungan" },
  { word: "入院", reading: "nyuuin", meaning: "rawat inap" },
  { word: "退院", reading: "taiin", meaning: "keluar RS" },
  { word: "院長", reading: "inchou", meaning: "kepala RS" },
  { word: "場所", reading: "basho", meaning: "tempat" },
  { word: "近所", reading: "kinjo", meaning: "lingkungan sekitar" },
  { word: "住所", reading: "juusho", meaning: "alamat" },
  { word: "長所", reading: "chousho", meaning: "kelebihan" },
  { word: "短所", reading: "tansho", meaning: "kekurangan" },
  { word: "便所", reading: "benjo", meaning: "toilet" },
  { word: "役所", reading: "yakusho", meaning: "kantor pemerintah" },
  { word: "台所", reading: "daidokoro", meaning: "dapur" },
  { word: "案内", reading: "annai", meaning: "panduan" },
  { word: "家内", reading: "kanai", meaning: "istri (sendiri)" },
  { word: "以内", reading: "inai", meaning: "dalam jangka" },
  { word: "以外", reading: "igai", meaning: "selain" },
  { word: "都内", reading: "tonai", meaning: "dalam kota" },
  { word: "車内", reading: "shanai", meaning: "dalam mobil/kereta" },
  { word: "内部", reading: "naibu", meaning: "bagian dalam" },
  { word: "外部", reading: "gaibu", meaning: "bagian luar" },
  { word: "海外", reading: "kaigai", meaning: "luar negeri" },
  { word: "外国", reading: "gaikoku", meaning: "negara asing" },
  { word: "外国人", reading: "gaikokujin", meaning: "orang asing" },
  { word: "外食", reading: "gaishoku", meaning: "makan di luar" },
  { word: "中心", reading: "chuushin", meaning: "pusat" },
  { word: "中学", reading: "chuugaku", meaning: "SMP" },
  { word: "高校", reading: "koukou", meaning: "SMA" },
  { word: "校長", reading: "kouchou", meaning: "kepala sekolah" },
  { word: "学校", reading: "gakkou", meaning: "sekolah" },
  { word: "小学校", reading: "shougakkou", meaning: "SD" },
  { word: "中学校", reading: "chuugakkou", meaning: "SMP (lengkap)" },
  { word: "入館", reading: "nyuukan", meaning: "masuk gedung" },
  { word: "入口", reading: "iriguchi", meaning: "pintu masuk" },
  { word: "出口", reading: "deguchi", meaning: "pintu keluar" },
  { word: "入園", reading: "nyuuen", meaning: "masuk taman" },
  { word: "公園", reading: "kouen", meaning: "taman" },
  { word: "動物園", reading: "doubutsuen", meaning: "kebun binatang" },
  { word: "遊園地", reading: "yuuenchi", meaning: "taman bermain" },
  { word: "地面", reading: "jimen", meaning: "permukaan tanah" },
  { word: "地図", reading: "chizu", meaning: "peta" },
  { word: "地下", reading: "chika", meaning: "bawah tanah" },
  { word: "地理", reading: "chiri", meaning: "geografi" },
  { word: "科学", reading: "kagaku", meaning: "sains" },
  { word: "学者", reading: "gakusha", meaning: "sarjana" },
  { word: "作者", reading: "sakusha", meaning: "penulis" },
  { word: "医者", reading: "isha", meaning: "dokter" },
  { word: "読者", reading: "dokusha", meaning: "pembaca" },
  { word: "若者", reading: "wakamono", meaning: "anak muda" },
  { word: "料理", reading: "ryouri", meaning: "masakan" },
  { word: "理由", reading: "riyuu", meaning: "alasan" },
  { word: "物理", reading: "butsuri", meaning: "fisika" },
  { word: "心理", reading: "shinri", meaning: "psikologi" },
  { word: "理解", reading: "rikai", meaning: "paham" },
  { word: "解決", reading: "kaiketsu", meaning: "solusi" },
  { word: "決心", reading: "kesshin", meaning: "tekad" },
  { word: "決定", reading: "kettei", meaning: "keputusan" },
  { word: "定休日", reading: "teikyuubi", meaning: "hari libur tetap" },
  { word: "予定", reading: "yotei", meaning: "rencana / jadwal" },
  { word: "予約", reading: "yoyaku", meaning: "reservasi" },
  { word: "約束", reading: "yakusoku", meaning: "janji" },
  { word: "婚約", reading: "konyaku", meaning: "pertunangan" },
  { word: "要約", reading: "youyaku", meaning: "ringkasan" },
  { word: "表現", reading: "hyougen", meaning: "ekspresi" },
  { word: "現在", reading: "genzai", meaning: "saat ini" },
  { word: "現金", reading: "genkin", meaning: "uang tunai" },
  { word: "現代", reading: "gendai", meaning: "era modern" },
  { word: "代理", reading: "dairi", meaning: "perwakilan" },
  { word: "代金", reading: "daikin", meaning: "biaya" },
  { word: "時代", reading: "jidai", meaning: "era / zaman" },
  { word: "電気", reading: "denki", meaning: "listrik" },
  { word: "電力", reading: "denryoku", meaning: "tenaga listrik" },
  { word: "電池", reading: "denchi", meaning: "baterai" },
  { word: "池", reading: "ike", meaning: "kolam" },
  { word: "水槽", reading: "suisou", meaning: "tangki air" },
  { word: "水道", reading: "suidou", meaning: "saluran air" },
  { word: "書道", reading: "shodou", meaning: "kaligrafi" },
  { word: "茶道", reading: "sadou", meaning: "upacara teh" },
  { word: "柔道", reading: "juudou", meaning: "judo" },
  { word: "剣道", reading: "kendou", meaning: "kendo" },
  { word: "北海道", reading: "hokkaido", meaning: "Hokkaido" },
  { word: "道路", reading: "douro", meaning: "jalan raya" },
  { word: "線路", reading: "senro", meaning: "jalur kereta" },
  { word: "通路", reading: "tsuuro", meaning: "lorong" },
  { word: "迷路", reading: "meiro", meaning: "labirin" },
  { word: "生活", reading: "seikatsu", meaning: "kehidupan" },
  { word: "活気", reading: "kakki", meaning: "semangat" },
  { word: "活用", reading: "katsuyou", meaning: "aplikasi / penggunaan" },
  { word: "活躍", reading: "katsuyaku", meaning: "peran aktif" },
  { word: "自分", reading: "jibun", meaning: "diri sendiri" },
  { word: "自由", reading: "jiyuu", meaning: "bebas" },
  { word: "自信", reading: "jishin", meaning: "percaya diri" },
  { word: "自転車", reading: "jitensha", meaning: "sepeda" },
  { word: "自動", reading: "jidou", meaning: "otomatis" },
  { word: "自動車", reading: "jidousha", meaning: "mobil" },
  { word: "自習", reading: "jishuu", meaning: "belajar mandiri" },
  { word: "自然", reading: "shizen", meaning: "alam" },
  { word: "突然", reading: "totsuzen", meaning: "tiba-tiba" },
  { word: "全然", reading: "zenzen", meaning: "sama sekali tidak" },
  { word: "天然", reading: "tennen", meaning: "alami" },
  { word: "工場", reading: "koujou", meaning: "pabrik" },
  { word: "工具", reading: "kougu", meaning: "peralatan" },
  { word: "工夫", reading: "kufu", meaning: "akal / ide" },
  { word: "工芸", reading: "kougei", meaning: "kerajinan tangan" },
  { word: "人工", reading: "jinkou", meaning: "buatan manusia" },
  { word: "文章", reading: "bunshou", meaning: "kalimat / teks" },
  { word: "文化", reading: "bunka", meaning: "budaya" },
  { word: "文法", reading: "bunpou", meaning: "tata bahasa" },
  { word: "文字", reading: "moji", meaning: "huruf" },
  { word: "文学", reading: "bungaku", meaning: "sastra" },
  { word: "見学", reading: "kengaku", meaning: "kunjungan studi" },
  { word: "発見", reading: "hakken", meaning: "penemuan" },
  { word: "意見", reading: "iken", meaning: "pendapat" },
  { word: "見物", reading: "kenbutsu", meaning: "tamasya" },
  { word: "見舞い", reading: "mimai", meaning: "menjenguk" },
  { word: "物語", reading: "monogatari", meaning: "cerita" },
  { word: "敬語", reading: "keigo", meaning: "bahasa hormat" },
  { word: "単語", reading: "tango", meaning: "kosakata" },
  { word: "国語", reading: "kokugo", meaning: "bahasa nasional" },
  { word: "用語", reading: "yougo", meaning: "istilah" },
  { word: "言葉", reading: "kotoba", meaning: "kata-kata" },
  { word: "千葉", reading: "chiba", meaning: "Chiba" },
  { word: "葉書", reading: "hagaki", meaning: "kartu pos" },
  { word: "読書", reading: "dokusho", meaning: "membaca buku" },
  { word: "書き取り", reading: "kakitori", meaning: "dikte" },
  { word: "書店", reading: "shoten", meaning: "toko buku" },
  { word: "店員", reading: "tenin", meaning: "pegawai toko" },
  { word: "売店", reading: "baiten", meaning: "kios" },
  { word: "本店", reading: "honten", meaning: "toko pusat" },
  { word: "喫茶店", reading: "kissaten", meaning: "kafe" },
  { word: "百貨店", reading: "hyakkaten", meaning: "toserba" },
  { word: "飲食店", reading: "inshokuten", meaning: "restoran" },
  { word: "運動", reading: "undou", meaning: "olahraga" },
  { word: "運賃", reading: "unchin", meaning: "ongkos" },
  { word: "運転", reading: "unten", meaning: "mengemudi" },
  { word: "幸運", reading: "kouun", meaning: "keberuntungan" },
  { word: "不運", reading: "fuun", meaning: "nasib buruk" },
  { word: "会場", reading: "kaijou", meaning: "tempat acara" },
  { word: "場面", reading: "bamen", meaning: "adegan" },
  { word: "面会", reading: "menkai", meaning: "pertemuan" },
  { word: "面積", reading: "menseki", meaning: "luas area" },
  { word: "真面目", reading: "majime", meaning: "serius" },
  { word: "正直", reading: "shoujiki", meaning: "jujur" },
  { word: "直接", reading: "chokusetsu", meaning: "langsung" },
  { word: "直後", reading: "chokugo", meaning: "segera setelah" },
  { word: "直前", reading: "chokuzen", meaning: "tepat sebelum" },
  { word: "特急", reading: "tokkyuu", meaning: "ekspres" },
  { word: "特売", reading: "tokubai", meaning: "obral" },
  { word: "特有", reading: "tokuyuu", meaning: "khas" },
  { word: "特色", reading: "tokushoku", meaning: "karakteristik" }
];

function createNewQuestion(kanjiList: Kanji[], type: 'kanji' | 'jukugo', recentWords: string[]): QuizState {
  if (type === 'kanji') {
    if (kanjiList.length === 0) return { currentWord: null, options: [], mode: 'kanjiToMeaning', selectedAnswer: null };
    const targetKanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    const modes: QuizMode[] = ['kanjiToMeaning', 'kanjiToReading'];
    const currentMode = modes[Math.floor(Math.random() * modes.length)];
    
    let correctAnswer = '';
    if (currentMode === 'kanjiToMeaning') {
      correctAnswer = targetKanji.meaning;
    } else {
      // Randomly pick between Onyomi and Kunyomi if both exist
      const availableReadings = [];
      if (targetKanji.onyomi) availableReadings.push(targetKanji.onyomi);
      if (targetKanji.kunyomi) availableReadings.push(targetKanji.kunyomi);
      
      if (availableReadings.length > 1) {
        correctAnswer = availableReadings[Math.floor(Math.random() * availableReadings.length)];
      } else {
        correctAnswer = availableReadings[0] || targetKanji.meaning;
      }
    }
    
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
      const randomWrong = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      if (randomWrong.id === targetKanji.id) continue;
      
      let wrongText = '';
      if (currentMode === 'kanjiToMeaning') {
        wrongText = randomWrong.meaning;
      } else {
        // Distractors should also be a mix of On/Kun from other kanji
        const rReadings = [];
        if (randomWrong.onyomi) rReadings.push(randomWrong.onyomi);
        if (randomWrong.kunyomi) rReadings.push(randomWrong.kunyomi);
        wrongText = rReadings.length > 0 ? rReadings[Math.floor(Math.random() * rReadings.length)] : randomWrong.meaning;
      }
      
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
          <button onClick={() => switchQuizType('kanji')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${quizType === 'kanji' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}>Kuis Kanji</button>
          <button onClick={() => switchQuizType('jukugo')} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${quizType === 'jukugo' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}><BookOpen size={14} /> Jukugo (250+)</button>
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