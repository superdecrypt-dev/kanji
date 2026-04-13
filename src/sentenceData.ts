export interface SentenceQuizItem {
  id: number;
  sentence: string;
  translation: string;
  target: string;
  wrongOptions: string[];
}

export const sentenceList: SentenceQuizItem[] = [
  { id: 1, sentence: "毎日、___で学校に行きます。", translation: "Setiap hari, pergi ke sekolah menggunakan sepeda.", target: "自転車", wrongOptions: ["自動車", "電車", "新幹線"] },
  { id: 2, sentence: "この___はとても美味しいです。", translation: "Masakan ini sangat enak.", target: "料理", wrongOptions: ["理由", "地理", "物理"] },
  { id: 3, sentence: "駅の___で会いましょう。", translation: "Mari bertemu di pintu keluar stasiun.", target: "出口", wrongOptions: ["入口", "非常口", "窓口"] },
  { id: 4, sentence: "明日は___が降るでしょう。", translation: "Besok sepertinya akan turun hujan.", target: "雨", wrongOptions: ["雪", "雲", "水"] },
  { id: 5, sentence: "私の___は東京に住んでいます。", translation: "Keluarga saya tinggal di Tokyo.", target: "家族", wrongOptions: ["家内", "家屋", "作家"] },
  { id: 6, sentence: "図書館で___を借りました。", translation: "Meminjam buku di perpustakaan.", target: "本", wrongOptions: ["体", "木", "休"] },
  { id: 7, sentence: "新しい___を買いたいです。", translation: "Ingin membeli mobil baru.", target: "車", wrongOptions: ["東", "重", "乗"] },
  { id: 8, sentence: "___の時間は午後3時です。", translation: "Waktu pertemuan adalah jam 3 sore.", target: "面会", wrongOptions: ["面積", "真面目", "画面"] },
  { id: 9, sentence: "彼は___な人です。", translation: "Dia adalah orang yang terkenal.", target: "有名", wrongOptions: ["名前", "夕方", "名物"] },
  { id: 10, sentence: "___に気をつけてください。", translation: "Berhati-hatilah terhadap mobil.", target: "注意", wrongOptions: ["意味", "意見", "用意"] },
  { id: 11, sentence: "日本の___は安全です。", translation: "Kereta bawah tanah Jepang aman.", target: "地下鉄", wrongOptions: ["地震", "地図", "地球"] },
  { id: 12, sentence: "___の前に手を洗います。", translation: "Mencuci tangan sebelum makan.", target: "食事", wrongOptions: ["食堂", "食べ物", "食料"] },
  { id: 13, sentence: "___から手紙が来ました。", translation: "Surat datang dari teman.", target: "友達", wrongOptions: ["友情", "友人", "達人"] },
  { id: 14, sentence: "週末は___に行きます。", translation: "Akhir pekan pergi ke bioskop.", target: "映画館", wrongOptions: ["図書館", "体育館", "美術館"] },
  { id: 15, sentence: "今日は___がとてもいいです。", translation: "Hari ini cuacanya sangat bagus.", target: "天気", wrongOptions: ["電気", "空気", "元気"] },
  { id: 16, sentence: "___を閉めてください。", translation: "Tolong tutup jendela.", target: "窓", wrongOptions: ["扉", "門", "空"] },
  { id: 17, sentence: "___が痛いです。", translation: "Kepala saya sakit.", target: "頭", wrongOptions: ["顔", "首", "体"] },
  { id: 18, sentence: "___で薬を買います。", translation: "Membeli obat di rumah sakit.", target: "病院", wrongOptions: ["病気", "院長", "美容院"] },
  { id: 19, sentence: "___を読むのが好きです。", translation: "Suka membaca koran.", target: "新聞", wrongOptions: ["新幹線", "新しい", "親切"] },
  { id: 20, sentence: "___に旅行します。", translation: "Tahun depan akan bepergian.", target: "来年", wrongOptions: ["今年", "去年", "毎年"] },
  { id: 21, sentence: "___を勉強しています。", translation: "Sedang belajar bahasa Jepang.", target: "日本語", wrongOptions: ["英語", "中国語", "韓国語"] },
  { id: 22, sentence: "___を聞きながら歩きます。", translation: "Berjalan sambil mendengarkan musik.", target: "音楽", wrongOptions: ["音声", "発音", "楽しい"] },
  { id: 23, sentence: "___はどこですか。", translation: "Toilet ada di mana?", target: "お手洗い", wrongOptions: ["お茶", "手紙", "洗面所"] },
  { id: 24, sentence: "___を作ります。", translation: "Membuat masakan.", target: "料理", wrongOptions: ["理由", "物理", "心理"] },
  { id: 25, sentence: "___のボタンを押してください。", translation: "Tolong tekan tombol kanan.", target: "右", wrongOptions: ["左", "上", "下"] },
  { id: 26, sentence: "___の色は青いです。", translation: "Warna laut adalah biru.", target: "海", wrongOptions: ["毎", "梅", "空"] },
  { id: 27, sentence: "___を大切にしましょう。", translation: "Mari menjaga waktu dengan baik.", target: "時間", wrongOptions: ["時計", "時代", "時々"] },
  { id: 28, sentence: "___が鳴っています。", translation: "Telepon sedang berdering.", target: "電話", wrongOptions: ["電車", "電気", "電池"] },
  { id: 29, sentence: "___の人が多いです。", translation: "Banyak orang asing.", target: "外国人", wrongOptions: ["海外", "外部", "外国"] },
  { id: 30, sentence: "___に荷物を置きます。", translation: "Meletakkan barang di tempat itu.", target: "場所", wrongOptions: ["場合", "工場", "広場"] }
];