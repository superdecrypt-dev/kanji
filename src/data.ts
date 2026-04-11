export interface Kanji {
  id: number;
  kanji: string;
  meaning: string;
  kunyomi: string;
  onyomi: string;
  lesson: number;
  kunyomi_romaji?: string;
  onyomi_romaji?: string;
}

export const kanjiList: Kanji[] = [
  {
    "id": 1,
    "kanji": "日",
    "meaning": "matahari / hari",
    "kunyomi": "ひ / -び / -か",
    "onyomi": "ニチ / ニ (-ジツ)",
    "lesson": 1,
    "kunyomi_romaji": "hi / bi / ka",
    "onyomi_romaji": "nichi / ni (jitsu)"
  },
  {
    "id": 2,
    "kanji": "月",
    "meaning": "bulan",
    "kunyomi": "つき",
    "onyomi": "ゲツ / -ガツ",
    "lesson": 1,
    "kunyomi_romaji": "tsuki",
    "onyomi_romaji": "getsu / gatsu"
  },
  {
    "id": 3,
    "kanji": "木",
    "meaning": "pohon / kayu",
    "kunyomi": "き",
    "onyomi": "モク / ボク",
    "lesson": 1,
    "kunyomi_romaji": "ki",
    "onyomi_romaji": "moku / boku"
  },
  {
    "id": 4,
    "kanji": "山",
    "meaning": "gunung",
    "kunyomi": "やま",
    "onyomi": "サン",
    "lesson": 1,
    "kunyomi_romaji": "yama",
    "onyomi_romaji": "san"
  },
  {
    "id": 5,
    "kanji": "川",
    "meaning": "sungai",
    "kunyomi": "かわ / -がわ",
    "onyomi": "(セン)",
    "lesson": 1,
    "kunyomi_romaji": "kawa / gawa",
    "onyomi_romaji": "(sen)"
  },
  {
    "id": 6,
    "kanji": "田",
    "meaning": "sawah / ladang padi",
    "kunyomi": "た / -だ",
    "onyomi": "デン",
    "lesson": 1,
    "kunyomi_romaji": "ta / da",
    "onyomi_romaji": "den"
  },
  {
    "id": 7,
    "kanji": "人",
    "meaning": "orang / manusia",
    "kunyomi": "ひと",
    "onyomi": "ジン / ニン",
    "lesson": 1,
    "kunyomi_romaji": "hito",
    "onyomi_romaji": "jin / nin"
  },
  {
    "id": 8,
    "kanji": "口",
    "meaning": "mulut",
    "kunyomi": "くち / -ぐち",
    "onyomi": "コウ",
    "lesson": 1,
    "kunyomi_romaji": "kuchi / guchi",
    "onyomi_romaji": "kou"
  },
  {
    "id": 9,
    "kanji": "火",
    "meaning": "api",
    "kunyomi": "ひ",
    "onyomi": "カ",
    "lesson": 2,
    "kunyomi_romaji": "hi",
    "onyomi_romaji": "ka"
  },
  {
    "id": 10,
    "kanji": "水",
    "meaning": "air",
    "kunyomi": "みず",
    "onyomi": "スイ",
    "lesson": 2,
    "kunyomi_romaji": "mizu",
    "onyomi_romaji": "sui"
  },
  {
    "id": 11,
    "kanji": "金",
    "meaning": "emas / uang",
    "kunyomi": "かね",
    "onyomi": "キン",
    "lesson": 2,
    "kunyomi_romaji": "kane",
    "onyomi_romaji": "kin"
  },
  {
    "id": 12,
    "kanji": "土",
    "meaning": "tanah / bumi",
    "kunyomi": "つち",
    "onyomi": "ド",
    "lesson": 2,
    "kunyomi_romaji": "tsuchi",
    "onyomi_romaji": "do"
  },
  {
    "id": 13,
    "kanji": "子",
    "meaning": "anak",
    "kunyomi": "こ",
    "onyomi": "シ",
    "lesson": 2,
    "kunyomi_romaji": "ko",
    "onyomi_romaji": "shi"
  },
  {
    "id": 14,
    "kanji": "女",
    "meaning": "perempuan / wanita",
    "kunyomi": "おんな",
    "onyomi": "ジョ",
    "lesson": 2,
    "kunyomi_romaji": "onna",
    "onyomi_romaji": "jo"
  },
  {
    "id": 15,
    "kanji": "学",
    "meaning": "belajar / ilmu",
    "kunyomi": "(まなぶ)",
    "onyomi": "ガク / ガッ-",
    "lesson": 2,
    "kunyomi_romaji": "(manabu)",
    "onyomi_romaji": "gaku / ga"
  },
  {
    "id": 16,
    "kanji": "生",
    "meaning": "hidup / lahir",
    "kunyomi": "いきる / うまれる",
    "onyomi": "セイ",
    "lesson": 2,
    "kunyomi_romaji": "ikiru / umareru",
    "onyomi_romaji": "sei"
  },
  {
    "id": 17,
    "kanji": "私",
    "meaning": "saya / pribadi",
    "kunyomi": "わたし / わたくし",
    "onyomi": "シ",
    "lesson": 2,
    "kunyomi_romaji": "watashi / watakushi",
    "onyomi_romaji": "shi"
  },
  {
    "id": 18,
    "kanji": "一",
    "meaning": "satu",
    "kunyomi": "ひとつ",
    "onyomi": "イチ",
    "lesson": 3,
    "kunyomi_romaji": "hitotsu",
    "onyomi_romaji": "ichi"
  },
  {
    "id": 19,
    "kanji": "二",
    "meaning": "dua",
    "kunyomi": "ふたつ",
    "onyomi": "ニ",
    "lesson": 3,
    "kunyomi_romaji": "futatsu",
    "onyomi_romaji": "ni"
  },
  {
    "id": 20,
    "kanji": "三",
    "meaning": "tiga",
    "kunyomi": "みっつ",
    "onyomi": "サン",
    "lesson": 3,
    "kunyomi_romaji": "mittsu",
    "onyomi_romaji": "san"
  },
  {
    "id": 21,
    "kanji": "四",
    "meaning": "empat",
    "kunyomi": "よっつ / よん / よ",
    "onyomi": "シ",
    "lesson": 3,
    "kunyomi_romaji": "yottsu / yon / yo",
    "onyomi_romaji": "shi"
  },
  {
    "id": 22,
    "kanji": "五",
    "meaning": "lima",
    "kunyomi": "いつつ",
    "onyomi": "ゴ",
    "lesson": 3,
    "kunyomi_romaji": "itsutsu",
    "onyomi_romaji": "go"
  },
  {
    "id": 23,
    "kanji": "六",
    "meaning": "enam",
    "kunyomi": "むっつ",
    "onyomi": "ロク / ロッ-",
    "lesson": 3,
    "kunyomi_romaji": "muttsu",
    "onyomi_romaji": "roku / ro"
  },
  {
    "id": 24,
    "kanji": "七",
    "meaning": "tujuh",
    "kunyomi": "ななつ",
    "onyomi": "シチ",
    "lesson": 3,
    "kunyomi_romaji": "nanatsu",
    "onyomi_romaji": "shichi"
  },
  {
    "id": 25,
    "kanji": "八",
    "meaning": "delapan",
    "kunyomi": "やっつ",
    "onyomi": "ハチ / ハッ-",
    "lesson": 3,
    "kunyomi_romaji": "yattsu",
    "onyomi_romaji": "hachi / ha"
  },
  {
    "id": 26,
    "kanji": "九",
    "meaning": "sembilan",
    "kunyomi": "ここのつ",
    "onyomi": "ク / キュウ",
    "lesson": 3,
    "kunyomi_romaji": "kokonotsu",
    "onyomi_romaji": "ku / kyuu"
  },
  {
    "id": 27,
    "kanji": "十",
    "meaning": "sepuluh",
    "kunyomi": "とお",
    "onyomi": "ジュウ / ジッ-",
    "lesson": 3,
    "kunyomi_romaji": "too",
    "onyomi_romaji": "juu / ji"
  },
  {
    "id": 28,
    "kanji": "百",
    "meaning": "seratus",
    "kunyomi": "",
    "onyomi": "ヒャク / -ピャク",
    "lesson": 3,
    "onyomi_romaji": "hyaku / pyaku"
  },
  {
    "id": 29,
    "kanji": "千",
    "meaning": "seribu",
    "kunyomi": "ち",
    "onyomi": "セン / -ゼン",
    "lesson": 3,
    "kunyomi_romaji": "chi",
    "onyomi_romaji": "sen / zen"
  },
  {
    "id": 30,
    "kanji": "万",
    "meaning": "sepuluh ribu",
    "kunyomi": "",
    "onyomi": "マン / バン",
    "lesson": 3,
    "onyomi_romaji": "man / ban"
  },
  {
    "id": 31,
    "kanji": "円",
    "meaning": "yen / lingkaran",
    "kunyomi": "",
    "onyomi": "エン",
    "lesson": 3,
    "onyomi_romaji": "en"
  },
  {
    "id": 32,
    "kanji": "年",
    "meaning": "tahun",
    "kunyomi": "とし",
    "onyomi": "ネン",
    "lesson": 3,
    "kunyomi_romaji": "toshi",
    "onyomi_romaji": "nen"
  },
  {
    "id": 33,
    "kanji": "上",
    "meaning": "atas / naik",
    "kunyomi": "うえ / あがる / のぼる",
    "onyomi": "ジョウ",
    "lesson": 4,
    "kunyomi_romaji": "ue / agaru / noboru",
    "onyomi_romaji": "jou"
  },
  {
    "id": 34,
    "kanji": "下",
    "meaning": "bawah / turun",
    "kunyomi": "した / さがる / くだる",
    "onyomi": "カ / ゲ",
    "lesson": 4,
    "kunyomi_romaji": "shita / sagaru / kudaru",
    "onyomi_romaji": "ka / ge"
  },
  {
    "id": 35,
    "kanji": "中",
    "meaning": "tengah / dalam",
    "kunyomi": "なか",
    "onyomi": "チュウ / -ジュウ",
    "lesson": 4,
    "kunyomi_romaji": "naka",
    "onyomi_romaji": "chuu / juu"
  },
  {
    "id": 36,
    "kanji": "大",
    "meaning": "besar",
    "kunyomi": "おおきい",
    "onyomi": "ダイ / タイ",
    "lesson": 4,
    "kunyomi_romaji": "ookii",
    "onyomi_romaji": "dai / tai"
  },
  {
    "id": 37,
    "kanji": "小",
    "meaning": "kecil",
    "kunyomi": "ちいさい / こ / お",
    "onyomi": "ショウ",
    "lesson": 4,
    "kunyomi_romaji": "chiisai / ko / o",
    "onyomi_romaji": "shou"
  },
  {
    "id": 38,
    "kanji": "本",
    "meaning": "buku / akar / asal",
    "kunyomi": "もと",
    "onyomi": "ホン",
    "lesson": 4,
    "kunyomi_romaji": "moto",
    "onyomi_romaji": "hon"
  },
  {
    "id": 39,
    "kanji": "半",
    "meaning": "setengah",
    "kunyomi": "(なかば)",
    "onyomi": "ハン",
    "lesson": 4,
    "kunyomi_romaji": "(nakaba)",
    "onyomi_romaji": "han"
  },
  {
    "id": 40,
    "kanji": "分",
    "meaning": "menit / membagi / mengerti",
    "kunyomi": "わかれる / わかる / わける",
    "onyomi": "フン / -プン",
    "lesson": 4,
    "kunyomi_romaji": "wakareru / wakaru / wakeru",
    "onyomi_romaji": "fun / pun"
  },
  {
    "id": 41,
    "kanji": "力",
    "meaning": "tenaga / kekuatan",
    "kunyomi": "ちから",
    "onyomi": "リョク / リキ",
    "lesson": 4,
    "kunyomi_romaji": "chikara",
    "onyomi_romaji": "ryoku / riki"
  },
  {
    "id": 42,
    "kanji": "何",
    "meaning": "apa",
    "kunyomi": "なに / なん",
    "onyomi": "(カ)",
    "lesson": 4,
    "kunyomi_romaji": "nani / nan",
    "onyomi_romaji": "(ka)"
  },
  {
    "id": 43,
    "kanji": "明",
    "meaning": "terang / besok",
    "kunyomi": "あかるい / あける",
    "onyomi": "メイ",
    "lesson": 5,
    "kunyomi_romaji": "akarui / akeru",
    "onyomi_romaji": "mei"
  },
  {
    "id": 44,
    "kanji": "休",
    "meaning": "istirahat / libur",
    "kunyomi": "やすむ",
    "onyomi": "キュウ",
    "lesson": 5,
    "kunyomi_romaji": "yasumu",
    "onyomi_romaji": "kyuu"
  },
  {
    "id": 45,
    "kanji": "体",
    "meaning": "tubuh / badan",
    "kunyomi": "からだ",
    "onyomi": "タイ",
    "lesson": 5,
    "kunyomi_romaji": "karada",
    "onyomi_romaji": "tai"
  },
  {
    "id": 46,
    "kanji": "好",
    "meaning": "suka / bagus",
    "kunyomi": "すきな / すく",
    "onyomi": "コウ",
    "lesson": 5,
    "kunyomi_romaji": "sukina / suku",
    "onyomi_romaji": "kou"
  },
  {
    "id": 47,
    "kanji": "男",
    "meaning": "laki-laki / pria",
    "kunyomi": "おとこ",
    "onyomi": "ダン / ナン",
    "lesson": 5,
    "kunyomi_romaji": "otoko",
    "onyomi_romaji": "dan / nan"
  },
  {
    "id": 48,
    "kanji": "林",
    "meaning": "hutan kecil / pepohonan",
    "kunyomi": "はやし",
    "onyomi": "リン",
    "lesson": 5,
    "kunyomi_romaji": "hayashi",
    "onyomi_romaji": "rin"
  },
  {
    "id": 49,
    "kanji": "森",
    "meaning": "hutan lebat",
    "kunyomi": "もり",
    "onyomi": "シン",
    "lesson": 5,
    "kunyomi_romaji": "mori",
    "onyomi_romaji": "shin"
  },
  {
    "id": 50,
    "kanji": "間",
    "meaning": "antara / durasi waktu",
    "kunyomi": "あいだ / ま",
    "onyomi": "カン",
    "lesson": 5,
    "kunyomi_romaji": "aida / ma",
    "onyomi_romaji": "kan"
  },
  {
    "id": 51,
    "kanji": "畑",
    "meaning": "ladang / kebun",
    "kunyomi": "はたけ / はた",
    "onyomi": "",
    "lesson": 5,
    "kunyomi_romaji": "hatake / hata"
  },
  {
    "id": 52,
    "kanji": "岩",
    "meaning": "batu karang / tebing",
    "kunyomi": "いわ",
    "onyomi": "ガン",
    "lesson": 5,
    "kunyomi_romaji": "iwa",
    "onyomi_romaji": "gan"
  },
  {
    "id": 53,
    "kanji": "目",
    "meaning": "mata",
    "kunyomi": "め",
    "onyomi": "モク",
    "lesson": 6,
    "kunyomi_romaji": "me",
    "onyomi_romaji": "moku"
  },
  {
    "id": 54,
    "kanji": "耳",
    "meaning": "telinga",
    "kunyomi": "みみ",
    "onyomi": "ジ",
    "lesson": 6,
    "kunyomi_romaji": "mimi",
    "onyomi_romaji": "ji"
  },
  {
    "id": 55,
    "kanji": "手",
    "meaning": "tangan",
    "kunyomi": "て",
    "onyomi": "シュ",
    "lesson": 6,
    "kunyomi_romaji": "te",
    "onyomi_romaji": "shu"
  },
  {
    "id": 56,
    "kanji": "足",
    "meaning": "kaki / cukup",
    "kunyomi": "あし / たりる / たす",
    "onyomi": "ソク",
    "lesson": 6,
    "kunyomi_romaji": "ashi / tariru / tasu",
    "onyomi_romaji": "soku"
  },
  {
    "id": 57,
    "kanji": "雨",
    "meaning": "hujan",
    "kunyomi": "あめ",
    "onyomi": "ウ",
    "lesson": 6,
    "kunyomi_romaji": "ame",
    "onyomi_romaji": "u"
  },
  {
    "id": 58,
    "kanji": "竹",
    "meaning": "bambu",
    "kunyomi": "たけ",
    "onyomi": "チク",
    "lesson": 6,
    "kunyomi_romaji": "take",
    "onyomi_romaji": "chiku"
  },
  {
    "id": 59,
    "kanji": "米",
    "meaning": "beras / Amerika",
    "kunyomi": "こめ",
    "onyomi": "マイ / ベイ",
    "lesson": 6,
    "kunyomi_romaji": "kome",
    "onyomi_romaji": "mai / bei"
  },
  {
    "id": 60,
    "kanji": "貝",
    "meaning": "kerang",
    "kunyomi": "かい",
    "onyomi": "(バイ)",
    "lesson": 6,
    "kunyomi_romaji": "kai",
    "onyomi_romaji": "(bai)"
  },
  {
    "id": 61,
    "kanji": "石",
    "meaning": "batu",
    "kunyomi": "いし",
    "onyomi": "セキ",
    "lesson": 6,
    "kunyomi_romaji": "ishi",
    "onyomi_romaji": "seki"
  },
  {
    "id": 62,
    "kanji": "糸",
    "meaning": "benang",
    "kunyomi": "いと",
    "onyomi": "シ",
    "lesson": 6,
    "kunyomi_romaji": "ito",
    "onyomi_romaji": "shi"
  },
  {
    "id": 63,
    "kanji": "花",
    "meaning": "bunga",
    "kunyomi": "はな",
    "onyomi": "カ",
    "lesson": 7,
    "kunyomi_romaji": "hana",
    "onyomi_romaji": "ka"
  },
  {
    "id": 64,
    "kanji": "茶",
    "meaning": "teh",
    "kunyomi": "",
    "onyomi": "チャ / サ",
    "lesson": 7,
    "onyomi_romaji": "cha / sa"
  },
  {
    "id": 65,
    "kanji": "肉",
    "meaning": "daging",
    "kunyomi": "",
    "onyomi": "ニク",
    "lesson": 7,
    "onyomi_romaji": "niku"
  },
  {
    "id": 66,
    "kanji": "文",
    "meaning": "kalimat / sastra",
    "kunyomi": "(ふみ)",
    "onyomi": "ブン / モン",
    "lesson": 7,
    "kunyomi_romaji": "(fumi)",
    "onyomi_romaji": "bun / mon"
  },
  {
    "id": 67,
    "kanji": "字",
    "meaning": "huruf / karakter",
    "kunyomi": "",
    "onyomi": "ジ",
    "lesson": 7,
    "onyomi_romaji": "ji"
  },
  {
    "id": 68,
    "kanji": "物",
    "meaning": "barang / benda",
    "kunyomi": "もの",
    "onyomi": "ブツ / モツ",
    "lesson": 7,
    "kunyomi_romaji": "mono",
    "onyomi_romaji": "butsu / motsu"
  },
  {
    "id": 69,
    "kanji": "牛",
    "meaning": "sapi",
    "kunyomi": "うし",
    "onyomi": "ギュウ",
    "lesson": 7,
    "kunyomi_romaji": "ushi",
    "onyomi_romaji": "gyuu"
  },
  {
    "id": 70,
    "kanji": "馬",
    "meaning": "kuda",
    "kunyomi": "うま",
    "onyomi": "バ",
    "lesson": 7,
    "kunyomi_romaji": "uma",
    "onyomi_romaji": "ba"
  },
  {
    "id": 71,
    "kanji": "鳥",
    "meaning": "burung",
    "kunyomi": "とり",
    "onyomi": "チョウ",
    "lesson": 7,
    "kunyomi_romaji": "tori",
    "onyomi_romaji": "chou"
  },
  {
    "id": 72,
    "kanji": "魚",
    "meaning": "ikan",
    "kunyomi": "さかな / うお",
    "onyomi": "ギョ",
    "lesson": 7,
    "kunyomi_romaji": "sakana / uo",
    "onyomi_romaji": "gyo"
  },
  {
    "id": 73,
    "kanji": "新",
    "meaning": "baru",
    "kunyomi": "あたらしい",
    "onyomi": "シン",
    "lesson": 8,
    "kunyomi_romaji": "atarashii",
    "onyomi_romaji": "shin"
  },
  {
    "id": 74,
    "kanji": "古",
    "meaning": "lama / kuno",
    "kunyomi": "ふるい",
    "onyomi": "コ",
    "lesson": 8,
    "kunyomi_romaji": "furui",
    "onyomi_romaji": "ko"
  },
  {
    "id": 75,
    "kanji": "長",
    "meaning": "panjang / pemimpin",
    "kunyomi": "ながい",
    "onyomi": "チョウ",
    "lesson": 8,
    "kunyomi_romaji": "nagai",
    "onyomi_romaji": "chou"
  },
  {
    "id": 76,
    "kanji": "短",
    "meaning": "pendek",
    "kunyomi": "みじかい",
    "onyomi": "タン",
    "lesson": 8,
    "kunyomi_romaji": "mijikai",
    "onyomi_romaji": "tan"
  },
  {
    "id": 77,
    "kanji": "高",
    "meaning": "tinggi / mahal",
    "kunyomi": "たかい",
    "onyomi": "コウ",
    "lesson": 8,
    "kunyomi_romaji": "takai",
    "onyomi_romaji": "kou"
  },
  {
    "id": 78,
    "kanji": "安",
    "meaning": "murah / aman",
    "kunyomi": "やすい",
    "onyomi": "アン",
    "lesson": 8,
    "kunyomi_romaji": "yasui",
    "onyomi_romaji": "an"
  },
  {
    "id": 79,
    "kanji": "低",
    "meaning": "rendah",
    "kunyomi": "ひくい",
    "onyomi": "テイ",
    "lesson": 8,
    "kunyomi_romaji": "hikui",
    "onyomi_romaji": "tei"
  },
  {
    "id": 80,
    "kanji": "暗",
    "meaning": "gelap",
    "kunyomi": "くらい",
    "onyomi": "アン",
    "lesson": 8,
    "kunyomi_romaji": "kurai",
    "onyomi_romaji": "an"
  },
  {
    "id": 81,
    "kanji": "多",
    "meaning": "banyak",
    "kunyomi": "おおい",
    "onyomi": "タ",
    "lesson": 8,
    "kunyomi_romaji": "ooi",
    "onyomi_romaji": "ta"
  },
  {
    "id": 82,
    "kanji": "少",
    "meaning": "sedikit",
    "kunyomi": "すくない / すこし",
    "onyomi": "ショウ",
    "lesson": 8,
    "kunyomi_romaji": "sukunai / sukoshi",
    "onyomi_romaji": "shou"
  },
  {
    "id": 83,
    "kanji": "行",
    "meaning": "pergi / baris",
    "kunyomi": "いく / おこなう",
    "onyomi": "コウ / ギョウ",
    "lesson": 9,
    "kunyomi_romaji": "iku / okonau",
    "onyomi_romaji": "kou / gyou"
  },
  {
    "id": 84,
    "kanji": "来",
    "meaning": "datang / masa depan",
    "kunyomi": "くる / こない",
    "onyomi": "ライ",
    "lesson": 9,
    "kunyomi_romaji": "kuru / konai",
    "onyomi_romaji": "rai"
  },
  {
    "id": 85,
    "kanji": "帰",
    "meaning": "pulang / kembali",
    "kunyomi": "かえる",
    "onyomi": "キ",
    "lesson": 9,
    "kunyomi_romaji": "kaeru",
    "onyomi_romaji": "ki"
  },
  {
    "id": 86,
    "kanji": "食",
    "meaning": "makan",
    "kunyomi": "たべる",
    "onyomi": "ショク",
    "lesson": 9,
    "kunyomi_romaji": "taberu",
    "onyomi_romaji": "shoku"
  },
  {
    "id": 87,
    "kanji": "飲",
    "meaning": "minum",
    "kunyomi": "のむ",
    "onyomi": "イン",
    "lesson": 9,
    "kunyomi_romaji": "nomu",
    "onyomi_romaji": "in"
  },
  {
    "id": 88,
    "kanji": "見",
    "meaning": "melihat / menonton",
    "kunyomi": "みる / みえる",
    "onyomi": "ケン",
    "lesson": 9,
    "kunyomi_romaji": "miru / mieru",
    "onyomi_romaji": "ken"
  },
  {
    "id": 89,
    "kanji": "聞",
    "meaning": "mendengar / bertanya",
    "kunyomi": "きく / きこえる",
    "onyomi": "ブン",
    "lesson": 9,
    "kunyomi_romaji": "kiku / kikoeru",
    "onyomi_romaji": "bun"
  },
  {
    "id": 90,
    "kanji": "読",
    "meaning": "membaca",
    "kunyomi": "よむ",
    "onyomi": "ドク",
    "lesson": 9,
    "kunyomi_romaji": "yomu",
    "onyomi_romaji": "doku"
  },
  {
    "id": 91,
    "kanji": "書",
    "meaning": "menulis / buku",
    "kunyomi": "かく",
    "onyomi": "ショ",
    "lesson": 9,
    "kunyomi_romaji": "kaku",
    "onyomi_romaji": "sho"
  },
  {
    "id": 92,
    "kanji": "話",
    "meaning": "berbicara / cerita",
    "kunyomi": "はなす / はなし",
    "onyomi": "ワ",
    "lesson": 9,
    "kunyomi_romaji": "hanasu / hanashi",
    "onyomi_romaji": "wa"
  },
  {
    "id": 93,
    "kanji": "買",
    "meaning": "membeli",
    "kunyomi": "かう",
    "onyomi": "バイ",
    "lesson": 9,
    "kunyomi_romaji": "kau",
    "onyomi_romaji": "bai"
  },
  {
    "id": 94,
    "kanji": "教",
    "meaning": "mengajar / pendidikan",
    "kunyomi": "おしえる",
    "onyomi": "キョウ",
    "lesson": 9,
    "kunyomi_romaji": "oshieru",
    "onyomi_romaji": "kyou"
  },
  {
    "id": 95,
    "kanji": "朝",
    "meaning": "pagi",
    "kunyomi": "あさ",
    "onyomi": "チョウ",
    "lesson": 10,
    "kunyomi_romaji": "asa",
    "onyomi_romaji": "chou"
  },
  {
    "id": 96,
    "kanji": "昼",
    "meaning": "siang",
    "kunyomi": "ひる",
    "onyomi": "チュウ",
    "lesson": 10,
    "kunyomi_romaji": "hiru",
    "onyomi_romaji": "chuu"
  },
  {
    "id": 97,
    "kanji": "夜",
    "meaning": "malam",
    "kunyomi": "よる / よ",
    "onyomi": "ヤ",
    "lesson": 10,
    "kunyomi_romaji": "yoru / yo",
    "onyomi_romaji": "ya"
  },
  {
    "id": 98,
    "kanji": "晩",
    "meaning": "malam hari",
    "kunyomi": "",
    "onyomi": "バン",
    "lesson": 10,
    "onyomi_romaji": "ban"
  },
  {
    "id": 99,
    "kanji": "夕",
    "meaning": "sore / petang",
    "kunyomi": "ゆう",
    "onyomi": "(セキ)",
    "lesson": 10,
    "kunyomi_romaji": "yuu",
    "onyomi_romaji": "(seki)"
  },
  {
    "id": 100,
    "kanji": "方",
    "meaning": "arah / cara / orang",
    "kunyomi": "かた / -がた",
    "onyomi": "ホウ",
    "lesson": 10,
    "kunyomi_romaji": "kata / gata",
    "onyomi_romaji": "hou"
  },
  {
    "id": 101,
    "kanji": "午",
    "meaning": "tengah hari (AM/PM)",
    "kunyomi": "",
    "onyomi": "ゴ",
    "lesson": 10,
    "onyomi_romaji": "go"
  },
  {
    "id": 102,
    "kanji": "前",
    "meaning": "sebelum / depan",
    "kunyomi": "まえ",
    "onyomi": "ゼン",
    "lesson": 10,
    "kunyomi_romaji": "mae",
    "onyomi_romaji": "zen"
  },
  {
    "id": 103,
    "kanji": "後",
    "meaning": "setelah / belakang",
    "kunyomi": "あと / のち / うしろ",
    "onyomi": "ゴ / コウ",
    "lesson": 10,
    "kunyomi_romaji": "ato / nochi / ushiro",
    "onyomi_romaji": "go / kou"
  },
  {
    "id": 104,
    "kanji": "毎",
    "meaning": "setiap",
    "kunyomi": "",
    "onyomi": "マイ",
    "lesson": 10,
    "onyomi_romaji": "mai"
  },
  {
    "id": 105,
    "kanji": "週",
    "meaning": "minggu (pekan)",
    "kunyomi": "",
    "onyomi": "シュウ",
    "lesson": 10,
    "onyomi_romaji": "shuu"
  },
  {
    "id": 106,
    "kanji": "曜",
    "meaning": "hari dalam seminggu",
    "kunyomi": "",
    "onyomi": "ヨウ",
    "lesson": 10,
    "onyomi_romaji": "you"
  },
  {
    "id": 107,
    "kanji": "作",
    "meaning": "membuat",
    "kunyomi": "つくる",
    "onyomi": "サク / サ",
    "lesson": 11,
    "kunyomi_romaji": "tsukuru",
    "onyomi_romaji": "saku / sa"
  },
  {
    "id": 108,
    "kanji": "泳",
    "meaning": "berenang",
    "kunyomi": "およぐ",
    "onyomi": "エイ",
    "lesson": 11,
    "kunyomi_romaji": "oyogu",
    "onyomi_romaji": "ei"
  },
  {
    "id": 109,
    "kanji": "油",
    "meaning": "minyak",
    "kunyomi": "あぶら",
    "onyomi": "ユ",
    "lesson": 11,
    "kunyomi_romaji": "abura",
    "onyomi_romaji": "yu"
  },
  {
    "id": 110,
    "kanji": "海",
    "meaning": "laut",
    "kunyomi": "うみ",
    "onyomi": "カイ",
    "lesson": 11,
    "kunyomi_romaji": "umi",
    "onyomi_romaji": "kai"
  },
  {
    "id": 111,
    "kanji": "酒",
    "meaning": "sake / minuman keras",
    "kunyomi": "さけ",
    "onyomi": "シュ",
    "lesson": 11,
    "kunyomi_romaji": "sake",
    "onyomi_romaji": "shu"
  },
  {
    "id": 112,
    "kanji": "待",
    "meaning": "menunggu",
    "kunyomi": "まつ / まち",
    "onyomi": "タイ",
    "lesson": 11,
    "kunyomi_romaji": "matsu / machi",
    "onyomi_romaji": "tai"
  },
  {
    "id": 113,
    "kanji": "校",
    "meaning": "sekolah",
    "kunyomi": "",
    "onyomi": "コウ",
    "lesson": 11,
    "onyomi_romaji": "kou"
  },
  {
    "id": 114,
    "kanji": "時",
    "meaning": "waktu / jam",
    "kunyomi": "とき",
    "onyomi": "ジ",
    "lesson": 11,
    "kunyomi_romaji": "toki",
    "onyomi_romaji": "ji"
  },
  {
    "id": 115,
    "kanji": "言",
    "meaning": "berkata / bahasa",
    "kunyomi": "いう",
    "onyomi": "ゲン / ゴン",
    "lesson": 11,
    "kunyomi_romaji": "iu",
    "onyomi_romaji": "gen / gon"
  },
  {
    "id": 116,
    "kanji": "計",
    "meaning": "mengukur / merencanakan",
    "kunyomi": "(はかる)",
    "onyomi": "ケイ",
    "lesson": 11,
    "kunyomi_romaji": "(hakaru)",
    "onyomi_romaji": "kei"
  },
  {
    "id": 117,
    "kanji": "語",
    "meaning": "bahasa / kata",
    "kunyomi": "(かたる)",
    "onyomi": "ゴ",
    "lesson": 11,
    "kunyomi_romaji": "(kataru)",
    "onyomi_romaji": "go"
  },
  {
    "id": 118,
    "kanji": "飯",
    "meaning": "nasi / makanan",
    "kunyomi": "めし",
    "onyomi": "ハン",
    "lesson": 11,
    "kunyomi_romaji": "meshi",
    "onyomi_romaji": "han"
  },
  {
    "id": 119,
    "kanji": "宅",
    "meaning": "rumah / kediaman",
    "kunyomi": "",
    "onyomi": "タク",
    "lesson": 12,
    "onyomi_romaji": "taku"
  },
  {
    "id": 120,
    "kanji": "客",
    "meaning": "tamu / pelanggan",
    "kunyomi": "",
    "onyomi": "キャク",
    "lesson": 12,
    "onyomi_romaji": "kyaku"
  },
  {
    "id": 121,
    "kanji": "室",
    "meaning": "ruang / kamar",
    "kunyomi": "",
    "onyomi": "シツ",
    "lesson": 12,
    "onyomi_romaji": "shitsu"
  },
  {
    "id": 122,
    "kanji": "家",
    "meaning": "rumah / keluarga",
    "kunyomi": "いえ / や",
    "onyomi": "カ / ケ",
    "lesson": 12,
    "kunyomi_romaji": "ie / ya",
    "onyomi_romaji": "ka / ke"
  },
  {
    "id": 123,
    "kanji": "英",
    "meaning": "Inggris / cerdas",
    "kunyomi": "",
    "onyomi": "エイ",
    "lesson": 12,
    "onyomi_romaji": "ei"
  },
  {
    "id": 124,
    "kanji": "薬",
    "meaning": "obat",
    "kunyomi": "くすり",
    "onyomi": "ヤク",
    "lesson": 12,
    "kunyomi_romaji": "kusuri",
    "onyomi_romaji": "yaku"
  },
  {
    "id": 125,
    "kanji": "会",
    "meaning": "bertemu / perkumpulan",
    "kunyomi": "あう",
    "onyomi": "カイ",
    "lesson": 12,
    "kunyomi_romaji": "au",
    "onyomi_romaji": "kai"
  },
  {
    "id": 126,
    "kanji": "今",
    "meaning": "sekarang",
    "kunyomi": "いま",
    "onyomi": "コン",
    "lesson": 12,
    "kunyomi_romaji": "ima",
    "onyomi_romaji": "kon"
  },
  {
    "id": 127,
    "kanji": "雪",
    "meaning": "salju",
    "kunyomi": "ゆき",
    "onyomi": "セツ",
    "lesson": 12,
    "kunyomi_romaji": "yuki",
    "onyomi_romaji": "setsu"
  },
  {
    "id": 128,
    "kanji": "雲",
    "meaning": "awan",
    "kunyomi": "くも",
    "onyomi": "ウン",
    "lesson": 12,
    "kunyomi_romaji": "kumo",
    "onyomi_romaji": "un"
  },
  {
    "id": 129,
    "kanji": "電",
    "meaning": "listrik",
    "kunyomi": "",
    "onyomi": "デン",
    "lesson": 12,
    "onyomi_romaji": "den"
  },
  {
    "id": 130,
    "kanji": "売",
    "meaning": "menjual",
    "kunyomi": "うる",
    "onyomi": "バイ",
    "lesson": 12,
    "kunyomi_romaji": "uru",
    "onyomi_romaji": "bai"
  },
  {
    "id": 131,
    "kanji": "広",
    "meaning": "luas / lebar",
    "kunyomi": "ひろい",
    "onyomi": "コウ",
    "lesson": 13,
    "kunyomi_romaji": "hiroi",
    "onyomi_romaji": "kou"
  },
  {
    "id": 132,
    "kanji": "店",
    "meaning": "toko / kedai",
    "kunyomi": "みせ",
    "onyomi": "テン",
    "lesson": 13,
    "kunyomi_romaji": "mise",
    "onyomi_romaji": "ten"
  },
  {
    "id": 133,
    "kanji": "度",
    "meaning": "derajat / kali (frekuensi)",
    "kunyomi": "",
    "onyomi": "ド",
    "lesson": 13,
    "onyomi_romaji": "do"
  },
  {
    "id": 134,
    "kanji": "病",
    "meaning": "sakit / penyakit",
    "kunyomi": "",
    "onyomi": "ビョウ",
    "lesson": 13,
    "onyomi_romaji": "byou"
  },
  {
    "id": 135,
    "kanji": "疲",
    "meaning": "lelah",
    "kunyomi": "つかれる",
    "onyomi": "ヒ",
    "lesson": 13,
    "kunyomi_romaji": "tsukareru",
    "onyomi_romaji": "hi"
  },
  {
    "id": 136,
    "kanji": "痛",
    "meaning": "sakit / nyeri",
    "kunyomi": "いたい / いたむ",
    "onyomi": "ツウ",
    "lesson": 13,
    "kunyomi_romaji": "itai / itamu",
    "onyomi_romaji": "tsuu"
  },
  {
    "id": 137,
    "kanji": "屋",
    "meaning": "toko / atap / rumah",
    "kunyomi": "や",
    "onyomi": "オク",
    "lesson": 13,
    "kunyomi_romaji": "ya",
    "onyomi_romaji": "oku"
  },
  {
    "id": 138,
    "kanji": "国",
    "meaning": "negara",
    "kunyomi": "くに",
    "onyomi": "コク",
    "lesson": 13,
    "kunyomi_romaji": "kuni",
    "onyomi_romaji": "koku"
  },
  {
    "id": 139,
    "kanji": "回",
    "meaning": "berputar / kali (jumlah)",
    "kunyomi": "まわる / まわす",
    "onyomi": "カイ",
    "lesson": 13,
    "kunyomi_romaji": "mawaru / mawasu",
    "onyomi_romaji": "kai"
  },
  {
    "id": 140,
    "kanji": "困",
    "meaning": "kesulitan / bermasalah",
    "kunyomi": "こまる",
    "onyomi": "コン",
    "lesson": 13,
    "kunyomi_romaji": "komaru",
    "onyomi_romaji": "kon"
  },
  {
    "id": 141,
    "kanji": "開",
    "meaning": "membuka",
    "kunyomi": "あく / ひらく / あける",
    "onyomi": "カイ",
    "lesson": 13,
    "kunyomi_romaji": "aku / hiraku / akeru",
    "onyomi_romaji": "kai"
  },
  {
    "id": 142,
    "kanji": "閉",
    "meaning": "menutup",
    "kunyomi": "しまる / しめる / とじる",
    "onyomi": "ヘイ",
    "lesson": 13,
    "kunyomi_romaji": "shimaru / shimeru / tojiru",
    "onyomi_romaji": "hei"
  },
  {
    "id": 143,
    "kanji": "近",
    "meaning": "dekat",
    "kunyomi": "ちかい",
    "onyomi": "キン",
    "lesson": 14,
    "kunyomi_romaji": "chikai",
    "onyomi_romaji": "kin"
  },
  {
    "id": 144,
    "kanji": "遠",
    "meaning": "jauh",
    "kunyomi": "とおい",
    "onyomi": "エン",
    "lesson": 14,
    "kunyomi_romaji": "tooi",
    "onyomi_romaji": "en"
  },
  {
    "id": 145,
    "kanji": "速",
    "meaning": "cepat",
    "kunyomi": "はやい",
    "onyomi": "ソク",
    "lesson": 14,
    "kunyomi_romaji": "hayai",
    "onyomi_romaji": "soku"
  },
  {
    "id": 146,
    "kanji": "遅",
    "meaning": "lambat / terlambat",
    "kunyomi": "おそい / おくれる",
    "onyomi": "チ",
    "lesson": 14,
    "kunyomi_romaji": "osoi / okureru",
    "onyomi_romaji": "chi"
  },
  {
    "id": 147,
    "kanji": "道",
    "meaning": "jalan / rute",
    "kunyomi": "みち",
    "onyomi": "ドウ",
    "lesson": 14,
    "kunyomi_romaji": "michi",
    "onyomi_romaji": "dou"
  },
  {
    "id": 148,
    "kanji": "青",
    "meaning": "biru",
    "kunyomi": "あおい",
    "onyomi": "セイ",
    "lesson": 14,
    "kunyomi_romaji": "aoi",
    "onyomi_romaji": "sei"
  },
  {
    "id": 149,
    "kanji": "晴",
    "meaning": "cerah / cuaca baik",
    "kunyomi": "はれる / はれ",
    "onyomi": "セイ",
    "lesson": 14,
    "kunyomi_romaji": "hareru / hare",
    "onyomi_romaji": "sei"
  },
  {
    "id": 150,
    "kanji": "静",
    "meaning": "tenang / sunyi",
    "kunyomi": "しずかな",
    "onyomi": "セイ",
    "lesson": 14,
    "kunyomi_romaji": "shizukana",
    "onyomi_romaji": "sei"
  },
  {
    "id": 151,
    "kanji": "寺",
    "meaning": "kuil Buddha",
    "kunyomi": "てら",
    "onyomi": "ジ",
    "lesson": 14,
    "kunyomi_romaji": "tera",
    "onyomi_romaji": "ji"
  },
  {
    "id": 152,
    "kanji": "持",
    "meaning": "membawa / memiliki",
    "kunyomi": "もつ",
    "onyomi": "ジ",
    "lesson": 14,
    "kunyomi_romaji": "motsu",
    "onyomi_romaji": "ji"
  },
  {
    "id": 153,
    "kanji": "荷",
    "meaning": "barang bawaan / muatan",
    "kunyomi": "に",
    "onyomi": "(カ)",
    "lesson": 14,
    "kunyomi_romaji": "ni",
    "onyomi_romaji": "(ka)"
  },
  {
    "id": 154,
    "kanji": "歌",
    "meaning": "lagu / menyanyi",
    "kunyomi": "うた / うたう",
    "onyomi": "カ",
    "lesson": 14,
    "kunyomi_romaji": "uta / utau",
    "onyomi_romaji": "ka"
  },
  {
    "id": 155,
    "kanji": "友",
    "meaning": "teman",
    "kunyomi": "とも",
    "onyomi": "ユウ",
    "lesson": 15,
    "kunyomi_romaji": "tomo",
    "onyomi_romaji": "yuu"
  },
  {
    "id": 156,
    "kanji": "父",
    "meaning": "ayah",
    "kunyomi": "ちち",
    "onyomi": "フ",
    "lesson": 15,
    "kunyomi_romaji": "chichi",
    "onyomi_romaji": "fu"
  },
  {
    "id": 157,
    "kanji": "母",
    "meaning": "ibu",
    "kunyomi": "はは",
    "onyomi": "ボ",
    "lesson": 15,
    "kunyomi_romaji": "haha",
    "onyomi_romaji": "bo"
  },
  {
    "id": 158,
    "kanji": "兄",
    "meaning": "kakak laki-laki",
    "kunyomi": "あに",
    "onyomi": "ケイ / キョウ",
    "lesson": 15,
    "kunyomi_romaji": "ani",
    "onyomi_romaji": "kei / kyou"
  },
  {
    "id": 159,
    "kanji": "姉",
    "meaning": "kakak perempuan",
    "kunyomi": "あね",
    "onyomi": "シ",
    "lesson": 15,
    "kunyomi_romaji": "ane",
    "onyomi_romaji": "shi"
  },
  {
    "id": 160,
    "kanji": "弟",
    "meaning": "adik laki-laki",
    "kunyomi": "おとうと",
    "onyomi": "テイ / -ダイ",
    "lesson": 15,
    "kunyomi_romaji": "otouto",
    "onyomi_romaji": "tei / dai"
  },
  {
    "id": 161,
    "kanji": "妹",
    "meaning": "adik perempuan",
    "kunyomi": "いもうと",
    "onyomi": "マイ",
    "lesson": 15,
    "kunyomi_romaji": "imouto",
    "onyomi_romaji": "mai"
  },
  {
    "id": 162,
    "kanji": "夫",
    "meaning": "suami",
    "kunyomi": "おっと",
    "onyomi": "フ / フウ",
    "lesson": 15,
    "kunyomi_romaji": "otto",
    "onyomi_romaji": "fu / fuu"
  },
  {
    "id": 163,
    "kanji": "妻",
    "meaning": "istri",
    "kunyomi": "つま",
    "onyomi": "サイ",
    "lesson": 15,
    "kunyomi_romaji": "tsuma",
    "onyomi_romaji": "sai"
  },
  {
    "id": 164,
    "kanji": "彼",
    "meaning": "dia (laki-laki) / pacar",
    "kunyomi": "かれ / かの-",
    "onyomi": "(ヒ)",
    "lesson": 15,
    "kunyomi_romaji": "kare / kano",
    "onyomi_romaji": "(hi)"
  },
  {
    "id": 165,
    "kanji": "主",
    "meaning": "tuan / majikan / utama",
    "kunyomi": "おもな / ぬし",
    "onyomi": "シュ",
    "lesson": 15,
    "kunyomi_romaji": "omona / nushi",
    "onyomi_romaji": "shu"
  },
  {
    "id": 166,
    "kanji": "奥",
    "meaning": "dalam / istri orang lain",
    "kunyomi": "おく",
    "onyomi": "(オウ)",
    "lesson": 15,
    "kunyomi_romaji": "oku",
    "onyomi_romaji": "(ou)"
  },
  {
    "id": 167,
    "kanji": "元",
    "meaning": "asal / sumber / sehat",
    "kunyomi": "もと",
    "onyomi": "ゲン / ガン",
    "lesson": 16,
    "kunyomi_romaji": "moto",
    "onyomi_romaji": "gen / gan"
  },
  {
    "id": 168,
    "kanji": "気",
    "meaning": "semangat / cuaca / perasaan",
    "kunyomi": "",
    "onyomi": "キ",
    "lesson": 16,
    "onyomi_romaji": "ki"
  },
  {
    "id": 169,
    "kanji": "有",
    "meaning": "ada / memiliki",
    "kunyomi": "(ある)",
    "onyomi": "ユウ",
    "lesson": 16,
    "kunyomi_romaji": "(aru)",
    "onyomi_romaji": "yuu"
  },
  {
    "id": 170,
    "kanji": "名",
    "meaning": "nama / terkenal",
    "kunyomi": "な",
    "onyomi": "メイ / ミョウ",
    "lesson": 16,
    "kunyomi_romaji": "na",
    "onyomi_romaji": "mei / myou"
  },
  {
    "id": 171,
    "kanji": "親",
    "meaning": "orang tua / akrab",
    "kunyomi": "おや / したしい",
    "onyomi": "シン",
    "lesson": 16,
    "kunyomi_romaji": "oya / shitashii",
    "onyomi_romaji": "shin"
  },
  {
    "id": 172,
    "kanji": "切",
    "meaning": "memotong / habis",
    "kunyomi": "きる / きっ-",
    "onyomi": "セツ",
    "lesson": 16,
    "kunyomi_romaji": "kiru / ki",
    "onyomi_romaji": "setsu"
  },
  {
    "id": 173,
    "kanji": "便",
    "meaning": "praktis / surat / penerbangan",
    "kunyomi": "たより",
    "onyomi": "ベン / ビン",
    "lesson": 16,
    "kunyomi_romaji": "tayori",
    "onyomi_romaji": "ben / bin"
  },
  {
    "id": 174,
    "kanji": "利",
    "meaning": "keuntungan / berguna",
    "kunyomi": "(きく)",
    "onyomi": "リ",
    "lesson": 16,
    "kunyomi_romaji": "(kiku)",
    "onyomi_romaji": "ri"
  },
  {
    "id": 175,
    "kanji": "不",
    "meaning": "tidak / bukan",
    "kunyomi": "",
    "onyomi": "フ / ブ-",
    "lesson": 16,
    "onyomi_romaji": "fu / bu"
  },
  {
    "id": 176,
    "kanji": "若",
    "meaning": "muda",
    "kunyomi": "わかい",
    "onyomi": "(ジャク)",
    "lesson": 16,
    "kunyomi_romaji": "wakai",
    "onyomi_romaji": "(jaku)"
  },
  {
    "id": 177,
    "kanji": "早",
    "meaning": "awal / cepat",
    "kunyomi": "はやい",
    "onyomi": "ソウ",
    "lesson": 16,
    "kunyomi_romaji": "hayai",
    "onyomi_romaji": "sou"
  },
  {
    "id": 178,
    "kanji": "忙",
    "meaning": "sibuk",
    "kunyomi": "いそがしい",
    "onyomi": "ボウ",
    "lesson": 16,
    "kunyomi_romaji": "isogashii",
    "onyomi_romaji": "bou"
  },
  {
    "id": 179,
    "kanji": "出",
    "meaning": "keluar / mengeluarkan",
    "kunyomi": "でる / だす",
    "onyomi": "シュツ / シュッ-",
    "lesson": 17,
    "kunyomi_romaji": "deru / dasu",
    "onyomi_romaji": "shutsu / shu"
  },
  {
    "id": 180,
    "kanji": "入",
    "meaning": "masuk / memasukkan",
    "kunyomi": "はいる / いれる",
    "onyomi": "ニュウ",
    "lesson": 17,
    "kunyomi_romaji": "hairu / ireru",
    "onyomi_romaji": "nyuu"
  },
  {
    "id": 181,
    "kanji": "乗",
    "meaning": "naik (kendaraan)",
    "kunyomi": "のる / のせる",
    "onyomi": "ジョウ",
    "lesson": 17,
    "kunyomi_romaji": "noru / noseru",
    "onyomi_romaji": "jou"
  },
  {
    "id": 182,
    "kanji": "降",
    "meaning": "turun / hujan turun",
    "kunyomi": "おりる / ふる / おろす",
    "onyomi": "コウ",
    "lesson": 17,
    "kunyomi_romaji": "oriru / furu / orosu",
    "onyomi_romaji": "kou"
  },
  {
    "id": 183,
    "kanji": "着",
    "meaning": "tiba / memakai pakaian",
    "kunyomi": "つく / きる",
    "onyomi": "チャク",
    "lesson": 17,
    "kunyomi_romaji": "tsuku / kiru",
    "onyomi_romaji": "chaku"
  },
  {
    "id": 184,
    "kanji": "渡",
    "meaning": "menyeberang / menyerahkan",
    "kunyomi": "わたる / わたす",
    "onyomi": "ト",
    "lesson": 17,
    "kunyomi_romaji": "wataru / watasu",
    "onyomi_romaji": "to"
  },
  {
    "id": 185,
    "kanji": "通",
    "meaning": "melewati / pergi-pulang",
    "kunyomi": "とおる / かよう / とおす",
    "onyomi": "ツウ",
    "lesson": 17,
    "kunyomi_romaji": "tooru / kayou / toosu",
    "onyomi_romaji": "tsuu"
  },
  {
    "id": 186,
    "kanji": "走",
    "meaning": "berlari",
    "kunyomi": "はしる",
    "onyomi": "ソウ",
    "lesson": 17,
    "kunyomi_romaji": "hashiru",
    "onyomi_romaji": "sou"
  },
  {
    "id": 187,
    "kanji": "歩",
    "meaning": "berjalan",
    "kunyomi": "あるく",
    "onyomi": "ホ / -ボ",
    "lesson": 17,
    "kunyomi_romaji": "aruku",
    "onyomi_romaji": "ho / bo"
  },
  {
    "id": 188,
    "kanji": "止",
    "meaning": "berhenti / menghentikan",
    "kunyomi": "とまる / とめる",
    "onyomi": "シ",
    "lesson": 17,
    "kunyomi_romaji": "tomaru / tomeru",
    "onyomi_romaji": "shi"
  },
  {
    "id": 189,
    "kanji": "動",
    "meaning": "bergerak",
    "kunyomi": "うごく / うごかす",
    "onyomi": "ドウ",
    "lesson": 17,
    "kunyomi_romaji": "ugoku / ugokasu",
    "onyomi_romaji": "dou"
  },
  {
    "id": 190,
    "kanji": "働",
    "meaning": "bekerja",
    "kunyomi": "はたらく",
    "onyomi": "ドウ",
    "lesson": 17,
    "kunyomi_romaji": "hataraku",
    "onyomi_romaji": "dou"
  },
  {
    "id": 191,
    "kanji": "右",
    "meaning": "kanan",
    "kunyomi": "みぎ",
    "onyomi": "ウ / ユウ",
    "lesson": 18,
    "kunyomi_romaji": "migi",
    "onyomi_romaji": "u / yuu"
  },
  {
    "id": 192,
    "kanji": "左",
    "meaning": "kiri",
    "kunyomi": "ひだり",
    "onyomi": "サ",
    "lesson": 18,
    "kunyomi_romaji": "hidari",
    "onyomi_romaji": "sa"
  },
  {
    "id": 193,
    "kanji": "東",
    "meaning": "timur",
    "kunyomi": "ひがし",
    "onyomi": "トウ",
    "lesson": 18,
    "kunyomi_romaji": "higashi",
    "onyomi_romaji": "tou"
  },
  {
    "id": 194,
    "kanji": "西",
    "meaning": "barat",
    "kunyomi": "にし",
    "onyomi": "セイ / サイ",
    "lesson": 18,
    "kunyomi_romaji": "nishi",
    "onyomi_romaji": "sei / sai"
  },
  {
    "id": 195,
    "kanji": "北",
    "meaning": "utara",
    "kunyomi": "きた",
    "onyomi": "ホク / ホッ-",
    "lesson": 18,
    "kunyomi_romaji": "kita",
    "onyomi_romaji": "hoku / ho"
  },
  {
    "id": 196,
    "kanji": "南",
    "meaning": "selatan",
    "kunyomi": "みなみ",
    "onyomi": "ナン",
    "lesson": 18,
    "kunyomi_romaji": "minami",
    "onyomi_romaji": "nan"
  },
  {
    "id": 197,
    "kanji": "外",
    "meaning": "luar / asing",
    "kunyomi": "そと / はずれる / ほか",
    "onyomi": "ガイ / ゲ",
    "lesson": 18,
    "kunyomi_romaji": "soto / hazureru / hoka",
    "onyomi_romaji": "gai / ge"
  },
  {
    "id": 198,
    "kanji": "内",
    "meaning": "dalam / internal",
    "kunyomi": "うち",
    "onyomi": "ナイ",
    "lesson": 18,
    "kunyomi_romaji": "uchi",
    "onyomi_romaji": "nai"
  },
  {
    "id": 199,
    "kanji": "部",
    "meaning": "bagian / departemen / klub",
    "kunyomi": "",
    "onyomi": "ブ",
    "lesson": 18,
    "onyomi_romaji": "bu"
  },
  {
    "id": 200,
    "kanji": "駅",
    "meaning": "stasiun",
    "kunyomi": "",
    "onyomi": "エキ",
    "lesson": 18,
    "onyomi_romaji": "eki"
  },
  {
    "id": 201,
    "kanji": "社",
    "meaning": "perusahaan / kuil Shinto",
    "kunyomi": "",
    "onyomi": "シャ / -ジャ",
    "lesson": 18,
    "onyomi_romaji": "sha / ja"
  },
  {
    "id": 202,
    "kanji": "院",
    "meaning": "institusi / rumah sakit",
    "kunyomi": "",
    "onyomi": "イン",
    "lesson": 18,
    "onyomi_romaji": "in"
  },
  {
    "id": 203,
    "kanji": "地",
    "meaning": "tanah / bumi / tempat",
    "kunyomi": "",
    "onyomi": "ジ / チ",
    "lesson": 19,
    "onyomi_romaji": "ji / chi"
  },
  {
    "id": 204,
    "kanji": "鉄",
    "meaning": "besi / rel kereta",
    "kunyomi": "",
    "onyomi": "テツ",
    "lesson": 19,
    "onyomi_romaji": "tetsu"
  },
  {
    "id": 205,
    "kanji": "工",
    "meaning": "pabrik / konstruksi / teknik",
    "kunyomi": "",
    "onyomi": "コウ",
    "lesson": 19,
    "onyomi_romaji": "kou"
  },
  {
    "id": 206,
    "kanji": "場",
    "meaning": "tempat / lokasi",
    "kunyomi": "ば",
    "onyomi": "ジョウ",
    "lesson": 19,
    "kunyomi_romaji": "ba",
    "onyomi_romaji": "jou"
  },
  {
    "id": 207,
    "kanji": "図",
    "meaning": "gambar / peta / rencana",
    "kunyomi": "",
    "onyomi": "ズ / ト",
    "lesson": 19,
    "onyomi_romaji": "zu / to"
  },
  {
    "id": 208,
    "kanji": "館",
    "meaning": "gedung / bangunan besar",
    "kunyomi": "",
    "onyomi": "カン",
    "lesson": 19,
    "onyomi_romaji": "kan"
  },
  {
    "id": 209,
    "kanji": "公",
    "meaning": "publik / umum / resmi",
    "kunyomi": "(おおやけ)",
    "onyomi": "コウ",
    "lesson": 19,
    "kunyomi_romaji": "(ooyake)",
    "onyomi_romaji": "kou"
  },
  {
    "id": 210,
    "kanji": "園",
    "meaning": "taman / kebun",
    "kunyomi": "(その)",
    "onyomi": "エン",
    "lesson": 19,
    "kunyomi_romaji": "(sono)",
    "onyomi_romaji": "en"
  },
  {
    "id": 211,
    "kanji": "住",
    "meaning": "tinggal / menetap",
    "kunyomi": "すむ",
    "onyomi": "ジュウ",
    "lesson": 19,
    "kunyomi_romaji": "sumu",
    "onyomi_romaji": "juu"
  },
  {
    "id": 212,
    "kanji": "所",
    "meaning": "tempat / alamat",
    "kunyomi": "ところ",
    "onyomi": "ショ / -ジョ",
    "lesson": 19,
    "kunyomi_romaji": "tokoro",
    "onyomi_romaji": "sho / jo"
  },
  {
    "id": 213,
    "kanji": "番",
    "meaning": "nomor / giliran",
    "kunyomi": "",
    "onyomi": "バン",
    "lesson": 19,
    "onyomi_romaji": "ban"
  },
  {
    "id": 214,
    "kanji": "号",
    "meaning": "nomor / edisi / simbol",
    "kunyomi": "",
    "onyomi": "ゴウ",
    "lesson": 19,
    "onyomi_romaji": "gou"
  },
  {
    "id": 215,
    "kanji": "市",
    "meaning": "kota (city) / pasar",
    "kunyomi": "いち",
    "onyomi": "シ",
    "lesson": 20,
    "kunyomi_romaji": "ichi",
    "onyomi_romaji": "shi"
  },
  {
    "id": 216,
    "kanji": "町",
    "meaning": "kota (town) / blok",
    "kunyomi": "まち",
    "onyomi": "チョウ",
    "lesson": 20,
    "kunyomi_romaji": "machi",
    "onyomi_romaji": "chou"
  },
  {
    "id": 217,
    "kanji": "村",
    "meaning": "desa",
    "kunyomi": "むら",
    "onyomi": "ソン",
    "lesson": 20,
    "kunyomi_romaji": "mura",
    "onyomi_romaji": "son"
  },
  {
    "id": 218,
    "kanji": "区",
    "meaning": "distrik / wilayah",
    "kunyomi": "",
    "onyomi": "ク",
    "lesson": 20,
    "onyomi_romaji": "ku"
  },
  {
    "id": 219,
    "kanji": "都",
    "meaning": "ibu kota / metropolis",
    "kunyomi": "みやこ",
    "onyomi": "ト",
    "lesson": 20,
    "kunyomi_romaji": "miyako",
    "onyomi_romaji": "to"
  },
  {
    "id": 220,
    "kanji": "府",
    "meaning": "prefektur (Osaka/Kyoto)",
    "kunyomi": "",
    "onyomi": "フ",
    "lesson": 20,
    "onyomi_romaji": "fu"
  },
  {
    "id": 221,
    "kanji": "県",
    "meaning": "prefektur",
    "kunyomi": "",
    "onyomi": "ケン",
    "lesson": 20,
    "onyomi_romaji": "ken"
  },
  {
    "id": 222,
    "kanji": "島",
    "meaning": "pulau",
    "kunyomi": "しま",
    "onyomi": "トウ",
    "lesson": 20,
    "kunyomi_romaji": "shima",
    "onyomi_romaji": "tou"
  },
  {
    "id": 223,
    "kanji": "京",
    "meaning": "ibu kota",
    "kunyomi": "",
    "onyomi": "キョウ / ケイ",
    "lesson": 20,
    "onyomi_romaji": "kyou / kei"
  },
  {
    "id": 224,
    "kanji": "様",
    "meaning": "Tuan/Nyonya / kondisi",
    "kunyomi": "さま",
    "onyomi": "ヨウ",
    "lesson": 20,
    "kunyomi_romaji": "sama",
    "onyomi_romaji": "you"
  },
  {
    "id": 225,
    "kanji": "練",
    "meaning": "berlatih / mengolah",
    "kunyomi": "(ねる)",
    "onyomi": "レン",
    "lesson": 21,
    "kunyomi_romaji": "(neru)",
    "onyomi_romaji": "ren"
  },
  {
    "id": 226,
    "kanji": "習",
    "meaning": "belajar / kebiasaan",
    "kunyomi": "ならう",
    "onyomi": "シュウ",
    "lesson": 21,
    "kunyomi_romaji": "narau",
    "onyomi_romaji": "shuu"
  },
  {
    "id": 227,
    "kanji": "勉",
    "meaning": "berusaha / belajar",
    "kunyomi": "",
    "onyomi": "ベン",
    "lesson": 21,
    "onyomi_romaji": "ben"
  },
  {
    "id": 228,
    "kanji": "強",
    "meaning": "kuat / memaksa",
    "kunyomi": "つよい",
    "onyomi": "キョウ",
    "lesson": 21,
    "kunyomi_romaji": "tsuyoi",
    "onyomi_romaji": "kyou"
  },
  {
    "id": 229,
    "kanji": "研",
    "meaning": "mengasah / meneliti",
    "kunyomi": "",
    "onyomi": "ケン",
    "lesson": 21,
    "onyomi_romaji": "ken"
  },
  {
    "id": 230,
    "kanji": "究",
    "meaning": "meneliti / menyelidiki",
    "kunyomi": "(きわめる)",
    "onyomi": "キュウ",
    "lesson": 21,
    "kunyomi_romaji": "(kiwameru)",
    "onyomi_romaji": "kyuu"
  },
  {
    "id": 231,
    "kanji": "留",
    "meaning": "tinggal / menahan / studi",
    "kunyomi": "とまる / とめる",
    "onyomi": "リュウ",
    "lesson": 21,
    "kunyomi_romaji": "tomaru / tomeru",
    "onyomi_romaji": "ryuu"
  },
  {
    "id": 232,
    "kanji": "質",
    "meaning": "kualitas / pertanyaan",
    "kunyomi": "",
    "onyomi": "シツ",
    "lesson": 21,
    "onyomi_romaji": "shitsu"
  },
  {
    "id": 233,
    "kanji": "問",
    "meaning": "bertanya / masalah",
    "kunyomi": "とう / とい",
    "onyomi": "モン",
    "lesson": 21,
    "kunyomi_romaji": "tou / toi",
    "onyomi_romaji": "mon"
  },
  {
    "id": 234,
    "kanji": "題",
    "meaning": "topik / judul / soal",
    "kunyomi": "",
    "onyomi": "ダイ",
    "lesson": 21,
    "onyomi_romaji": "dai"
  },
  {
    "id": 235,
    "kanji": "答",
    "meaning": "menjawab / jawaban",
    "kunyomi": "こたえる",
    "onyomi": "トウ",
    "lesson": 21,
    "kunyomi_romaji": "kotaeru",
    "onyomi_romaji": "tou"
  },
  {
    "id": 236,
    "kanji": "宿",
    "meaning": "penginapan / PR",
    "kunyomi": "やど",
    "onyomi": "シュク",
    "lesson": 21,
    "kunyomi_romaji": "yado",
    "onyomi_romaji": "shuku"
  },
  {
    "id": 237,
    "kanji": "政",
    "meaning": "pemerintahan / politik",
    "kunyomi": "",
    "onyomi": "セイ",
    "lesson": 22,
    "onyomi_romaji": "sei"
  },
  {
    "id": 238,
    "kanji": "治",
    "meaning": "memerintah / menyembuhkan",
    "kunyomi": "おさまる / なおる",
    "onyomi": "ジ / チ",
    "lesson": 22,
    "kunyomi_romaji": "osamaru / naoru",
    "onyomi_romaji": "ji / chi"
  },
  {
    "id": 239,
    "kanji": "経",
    "meaning": "lalu / mengelola / ekonomi",
    "kunyomi": "へる",
    "onyomi": "ケイ",
    "lesson": 22,
    "kunyomi_romaji": "heru",
    "onyomi_romaji": "kei"
  },
  {
    "id": 240,
    "kanji": "済",
    "meaning": "selesai / menyelamatkan",
    "kunyomi": "すむ / すます",
    "onyomi": "サイ / -ザイ",
    "lesson": 22,
    "kunyomi_romaji": "sumu / sumasu",
    "onyomi_romaji": "sai / zai"
  },
  {
    "id": 241,
    "kanji": "歴",
    "meaning": "sejarah / riwayat",
    "kunyomi": "",
    "onyomi": "レキ",
    "lesson": 22,
    "onyomi_romaji": "reki"
  },
  {
    "id": 242,
    "kanji": "史",
    "meaning": "sejarah",
    "kunyomi": "",
    "onyomi": "シ",
    "lesson": 22,
    "onyomi_romaji": "shi"
  },
  {
    "id": 243,
    "kanji": "育",
    "meaning": "membesarkan / mendidik",
    "kunyomi": "そだつ / そだてる",
    "onyomi": "イク",
    "lesson": 22,
    "kunyomi_romaji": "sodatsu / sodateru",
    "onyomi_romaji": "iku"
  },
  {
    "id": 244,
    "kanji": "化",
    "meaning": "berubah menjadi / -isasi",
    "kunyomi": "(ばける)",
    "onyomi": "カ",
    "lesson": 22,
    "kunyomi_romaji": "(bakeru)",
    "onyomi_romaji": "ka"
  },
  {
    "id": 245,
    "kanji": "理",
    "meaning": "alasan / logika / prinsip",
    "kunyomi": "",
    "onyomi": "リ",
    "lesson": 22,
    "onyomi_romaji": "ri"
  },
  {
    "id": 246,
    "kanji": "科",
    "meaning": "jurusan / ilmu / departemen",
    "kunyomi": "",
    "onyomi": "カ",
    "lesson": 22,
    "onyomi_romaji": "ka"
  },
  {
    "id": 247,
    "kanji": "数",
    "meaning": "angka / menghitung",
    "kunyomi": "かず / かぞえる",
    "onyomi": "スウ",
    "lesson": 22,
    "kunyomi_romaji": "kazu / kazoeru",
    "onyomi_romaji": "suu"
  },
  {
    "id": 248,
    "kanji": "医",
    "meaning": "medis / dokter",
    "kunyomi": "",
    "onyomi": "イ",
    "lesson": 22,
    "onyomi_romaji": "i"
  }
];
