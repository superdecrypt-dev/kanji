export interface ExampleSentence {
  japanese: string;
  reading: string;
  meaning: string;
}

export const exampleSentences: Record<string, ExampleSentence[]> = {
  "日": [
    { japanese: "今日はいい天気です。", reading: "きょうはいいてんきです。", meaning: "Hari ini cuacanya bagus." },
    { japanese: "日曜日に公園に行きます。", reading: "にちようびにこうえんにいきます。", meaning: "Hari Minggu pergi ke taman." }
  ],
  "月": [
    { japanese: "月がきれいですね。", reading: "つきがきれいですね。", meaning: "Bulannya indah ya." },
    { japanese: "一月に日本に行きます。", reading: "いちがつににほんにいきます。", meaning: "Bulan Januari pergi ke Jepang." }
  ],
  "木": [
    { japanese: "木の下で休みましょう。", reading: "きのしたでやすみましょう。", meaning: "Mari istirahat di bawah pohon." },
    { japanese: "木曜日にテストがあります。", reading: "もくようびにテストがあります。", meaning: "Hari Kamis ada tes." }
  ],
  "山": [
    { japanese: "富士山に登りたいです。", reading: "ふじさんにのぼりたいです。", meaning: "Saya ingin mendaki Gunung Fuji." },
    { japanese: "山の空気はきれいです。", reading: "やまのくうきはきれいです。", meaning: "Udara gunung itu bersih." }
  ],
  "川": [
    { japanese: "川で魚を釣ります。", reading: "かわでさかなをつります。", meaning: "Memancing ikan di sungai." },
    { japanese: "川の水は冷たいです。", reading: "かわのみずはつめたいです。", meaning: "Air sungai dingin." }
  ],
  "田": [
    { japanese: "田んぼでお米を作ります。", reading: "たんぼでおこめをつくります。", meaning: "Menanam padi di sawah." }
  ],
  "人": [
    { japanese: "あの人は誰ですか。", reading: "あのひとはだれですか。", meaning: "Siapa orang itu?" },
    { japanese: "日本人の友達がいます。", reading: "にほんじんのともだちがいます。", meaning: "Saya punya teman orang Jepang." }
  ],
  "口": [
    { japanese: "口を大きく開けてください。", reading: "くちをおおきくあけてください。", meaning: "Tolong buka mulut lebar-lebar." },
    { japanese: "人口が多い都市です。", reading: "じんこうがおおいとしです。", meaning: "Ini kota berpenduduk banyak." }
  ],
  "火": [
    { japanese: "火を使う時は気をつけてください。", reading: "ひをつかうときはきをつけてください。", meaning: "Hati-hati saat menggunakan api." },
    { japanese: "火曜日に会いましょう。", reading: "かようびにあいましょう。", meaning: "Mari bertemu hari Selasa." }
  ],
  "水": [
    { japanese: "水を一杯ください。", reading: "みずをいっぱいください。", meaning: "Tolong minta segelas air." },
    { japanese: "水曜日は忙しいです。", reading: "すいようびはいそがしいです。", meaning: "Hari Rabu saya sibuk." }
  ],
  "金": [
    { japanese: "お金が足りません。", reading: "おかねがたりません。", meaning: "Uangnya tidak cukup." },
    { japanese: "金曜日の夜は暇です。", reading: "きんようびのよるはひまです。", meaning: "Jumat malam saya senggang." }
  ],
  "土": [
    { japanese: "土曜日に買い物をします。", reading: "どようびにかいものをします。", meaning: "Hari Sabtu belanja." },
    { japanese: "土の中に種を植えます。", reading: "つちのなかにたねをうえます。", meaning: "Menanam biji di dalam tanah." }
  ],
  "子": [
    { japanese: "子供たちが遊んでいます。", reading: "こどもたちがあそんでいます。", meaning: "Anak-anak sedang bermain." },
    { japanese: "椅子に座ってください。", reading: "いすにすわってください。", meaning: "Silakan duduk di kursi." }
  ],
  "女": [
    { japanese: "あの女の人は先生です。", reading: "あのおんなのひとはせんせいです。", meaning: "Wanita itu adalah guru." },
    { japanese: "女の子が歌を歌っています。", reading: "おんなのこがうたをうたっています。", meaning: "Anak perempuan itu sedang bernyanyi." }
  ],
  "学": [
    { japanese: "大学で日本語を勉強しています。", reading: "だいがくでにほんごをべんきょうしています。", meaning: "Belajar bahasa Jepang di universitas." },
    { japanese: "学校は9時に始まります。", reading: "がっこうは9じにはじまります。", meaning: "Sekolah mulai jam 9." }
  ],
  "生": [
    { japanese: "先生、質問があります。", reading: "せんせい、しつもんがあります。", meaning: "Guru, saya ada pertanyaan." },
    { japanese: "生まれたのは東京です。", reading: "うまれたのはとうきょうです。", meaning: "Saya lahir di Tokyo." }
  ],
  "私": [
    { japanese: "私は学生です。", reading: "わたしはがくせいです。", meaning: "Saya adalah pelajar." },
    { japanese: "私の趣味は読書です。", reading: "わたしのしゅみはどくしょです。", meaning: "Hobi saya membaca." }
  ],
  "一": [
    { japanese: "一つください。", reading: "ひとつください。", meaning: "Tolong satu." },
    { japanese: "一番好きな食べ物は何ですか。", reading: "いちばんすきなたべものはなんですか。", meaning: "Makanan paling disukai apa?" }
  ],
  "二": [
    { japanese: "二人で映画を見ました。", reading: "ふたりでえいがをみました。", meaning: "Menonton film berdua." }
  ],
  "三": [
    { japanese: "三月に桜が咲きます。", reading: "さんがつにさくらがさきます。", meaning: "Bulan Maret sakura mekar." }
  ],
  "四": [
    { japanese: "四時に会いましょう。", reading: "よじにあいましょう。", meaning: "Mari bertemu jam 4." }
  ],
  "五": [
    { japanese: "五人の友達が来ます。", reading: "ごにんのともだちがきます。", meaning: "Lima teman akan datang." }
  ],
  "六": [
    { japanese: "六月は雨が多いです。", reading: "ろくがつはあめがおおいです。", meaning: "Bulan Juni banyak hujan." }
  ],
  "七": [
    { japanese: "七時に起きます。", reading: "しちじにおきます。", meaning: "Bangun jam 7." }
  ],
  "八": [
    { japanese: "八百屋で野菜を買います。", reading: "やおやでやさいをかいます。", meaning: "Beli sayur di toko sayur." }
  ],
  "九": [
    { japanese: "九月から学校が始まります。", reading: "くがつからがっこうがはじまります。", meaning: "Sekolah mulai dari September." }
  ],
  "十": [
    { japanese: "十分待ってください。", reading: "じゅっぷんまってください。", meaning: "Tolong tunggu 10 menit." }
  ],
  "百": [
    { japanese: "百円のジュースを買いました。", reading: "ひゃくえんのジュースをかいました。", meaning: "Membeli jus 100 yen." }
  ],
  "千": [
    { japanese: "千円札を出してください。", reading: "せんえんさつをだしてください。", meaning: "Tolong keluarkan uang 1000 yen." }
  ],
  "万": [
    { japanese: "一万円はいくらですか。", reading: "いちまんえんはいくらですか。", meaning: "10.000 yen itu berapa?" }
  ],
  "円": [
    { japanese: "この本は五百円です。", reading: "このほんはごひゃくえんです。", meaning: "Buku ini 500 yen." }
  ],
  "年": [
    { japanese: "来年、日本に行きたいです。", reading: "らいねん、にほんにいきたいです。", meaning: "Tahun depan ingin pergi ke Jepang." },
    { japanese: "今年は何年ですか。", reading: "ことしはなんねんですか。", meaning: "Tahun ini tahun berapa?" }
  ],
  "上": [
    { japanese: "テーブルの上に本があります。", reading: "テーブルのうえにほんがあります。", meaning: "Di atas meja ada buku." },
    { japanese: "上手に日本語を話しますね。", reading: "じょうずににほんごをはなしますね。", meaning: "Pandai berbicara bahasa Jepang ya." }
  ],
  "下": [
    { japanese: "机の下に猫がいます。", reading: "つくえのしたにねこがいます。", meaning: "Di bawah meja ada kucing." },
    { japanese: "地下鉄で会社に行きます。", reading: "ちかてつでかいしゃにいきます。", meaning: "Pergi ke kantor naik kereta bawah tanah." }
  ],
  "中": [
    { japanese: "箱の中に何がありますか。", reading: "はこのなかになにがありますか。", meaning: "Apa yang ada di dalam kotak?" },
    { japanese: "中国語も少し話せます。", reading: "ちゅうごくごもすこしはなせます。", meaning: "Bisa sedikit berbicara bahasa Mandarin juga." }
  ],
  "大": [
    { japanese: "大きい犬が好きです。", reading: "おおきいいぬがすきです。", meaning: "Saya suka anjing besar." },
    { japanese: "大丈夫ですか。", reading: "だいじょうぶですか。", meaning: "Apakah kamu baik-baik saja?" }
  ],
  "小": [
    { japanese: "小さい猫を飼っています。", reading: "ちいさいねこをかっています。", meaning: "Saya memelihara kucing kecil." },
    { japanese: "小学校は家の近くにあります。", reading: "しょうがっこうはいえのちかくにあります。", meaning: "Sekolah dasar ada dekat rumah." }
  ],
  "本": [
    { japanese: "この本はおもしろいです。", reading: "このほんはおもしろいです。", meaning: "Buku ini menarik." },
    { japanese: "日本料理が大好きです。", reading: "にほんりょうりがだいすきです。", meaning: "Sangat suka masakan Jepang." }
  ],
  "半": [
    { japanese: "三時半に会いましょう。", reading: "さんじはんにあいましょう。", meaning: "Mari bertemu jam setengah 4." }
  ],
  "分": [
    { japanese: "十分で着きます。", reading: "じゅっぷんでつきます。", meaning: "Sampai dalam 10 menit." },
    { japanese: "この言葉の意味が分かりません。", reading: "このことばのいみがわかりません。", meaning: "Tidak mengerti arti kata ini." }
  ],
  "力": [
    { japanese: "力が強い人です。", reading: "ちからがつよいひとです。", meaning: "Orang yang kuat." }
  ],
  "何": [
    { japanese: "何を食べたいですか。", reading: "なにをたべたいですか。", meaning: "Ingin makan apa?" },
    { japanese: "何時に起きますか。", reading: "なんじにおきますか。", meaning: "Bangun jam berapa?" }
  ],
  "明": [
    { japanese: "明日は休みです。", reading: "あしたはやすみです。", meaning: "Besok libur." },
    { japanese: "部屋が明るいです。", reading: "へやがあかるいです。", meaning: "Kamarnya terang." }
  ],
  "休": [
    { japanese: "日曜日に休みます。", reading: "にちようびにやすみます。", meaning: "Hari Minggu istirahat." },
    { japanese: "夏休みに旅行します。", reading: "なつやすみにりょこうします。", meaning: "Liburan musim panas akan berwisata." }
  ],
  "体": [
    { japanese: "体に気をつけてください。", reading: "からだにきをつけてください。", meaning: "Jaga kesehatan ya." }
  ],
  "好": [
    { japanese: "音楽が好きです。", reading: "おんがくがすきです。", meaning: "Saya suka musik." },
    { japanese: "好きな色は青です。", reading: "すきないろはあおです。", meaning: "Warna kesukaan saya biru." }
  ],
  "男": [
    { japanese: "あの男の人は医者です。", reading: "あのおとこのひとはいしゃです。", meaning: "Pria itu adalah dokter." }
  ],
  "林": [
    { japanese: "林の中を散歩しました。", reading: "はやしのなかをさんぽしました。", meaning: "Jalan-jalan di dalam hutan kecil." }
  ],
  "森": [
    { japanese: "森の中は涼しいです。", reading: "もりのなかはすずしいです。", meaning: "Di dalam hutan itu sejuk." }
  ],
  "間": [
    { japanese: "二時間かかります。", reading: "にじかんかかります。", meaning: "Memakan waktu 2 jam." },
    { japanese: "駅と学校の間にコンビニがあります。", reading: "えきとがっこうのあいだにコンビニがあります。", meaning: "Antara stasiun dan sekolah ada minimarket." }
  ],
  "畑": [
    { japanese: "畑で野菜を育てています。", reading: "はたけでやさいをそだてています。", meaning: "Menanam sayur di ladang." }
  ],
  "岩": [
    { japanese: "大きい岩の上に座りました。", reading: "おおきいいわのうえにすわりました。", meaning: "Duduk di atas batu besar." }
  ],
  "目": [
    { japanese: "目が疲れました。", reading: "めがつかれました。", meaning: "Mata saya lelah." },
    { japanese: "一つ目の信号を右に曲がってください。", reading: "ひとつめのしんごうをみぎにまがってください。", meaning: "Belok kanan di lampu merah pertama." }
  ],
  "耳": [
    { japanese: "耳が痛いです。", reading: "みみがいたいです。", meaning: "Telinga saya sakit." }
  ],
  "手": [
    { japanese: "手を洗ってください。", reading: "てをあらってください。", meaning: "Tolong cuci tangan." },
    { japanese: "上手に料理を作りますね。", reading: "じょうずにりょうりをつくりますね。", meaning: "Pandai memasak ya." }
  ],
  "足": [
    { japanese: "足が痛いです。", reading: "あしがいたいです。", meaning: "Kaki saya sakit." }
  ],
  "雨": [
    { japanese: "雨が降っています。", reading: "あめがふっています。", meaning: "Sedang turun hujan." },
    { japanese: "雨の日は家にいます。", reading: "あめのひはいえにいます。", meaning: "Hari hujan di rumah saja." }
  ],
  "竹": [
    { japanese: "竹で箸を作ります。", reading: "たけではしをつくります。", meaning: "Membuat sumpit dari bambu." }
  ],
  "米": [
    { japanese: "日本のお米はおいしいです。", reading: "にほんのおこめはおいしいです。", meaning: "Beras Jepang enak." }
  ],
  "貝": [
    { japanese: "海で貝を拾いました。", reading: "うみでかいをひろいました。", meaning: "Mengambil kerang di pantai." }
  ],
  "石": [
    { japanese: "石の上に座りました。", reading: "いしのうえにすわりました。", meaning: "Duduk di atas batu." }
  ],
  "糸": [
    { japanese: "糸で服を作ります。", reading: "いとでふくをつくります。", meaning: "Membuat baju dari benang." }
  ],
  "花": [
    { japanese: "花がきれいに咲いています。", reading: "はながきれいにさいています。", meaning: "Bunga mekar dengan indah." },
    { japanese: "花見に行きましょう。", reading: "はなみにいきましょう。", meaning: "Mari pergi melihat bunga." }
  ],
  "茶": [
    { japanese: "お茶を飲みましょう。", reading: "おちゃをのみましょう。", meaning: "Mari minum teh." }
  ],
  "肉": [
    { japanese: "肉と野菜を買いました。", reading: "にくとやさいをかいました。", meaning: "Membeli daging dan sayur." }
  ],
  "文": [
    { japanese: "日本語の文を読みます。", reading: "にほんごのぶんをよみます。", meaning: "Membaca kalimat bahasa Jepang." }
  ],
  "字": [
    { japanese: "漢字を毎日練習しています。", reading: "かんじをまいにちれんしゅうしています。", meaning: "Latihan kanji setiap hari." }
  ],
  "物": [
    { japanese: "買い物に行きます。", reading: "かいものにいきます。", meaning: "Pergi belanja." },
    { japanese: "食べ物は何が好きですか。", reading: "たべものはなにがすきですか。", meaning: "Suka makanan apa?" }
  ],
  "牛": [
    { japanese: "牛肉が好きです。", reading: "ぎゅうにくがすきです。", meaning: "Saya suka daging sapi." }
  ],
  "馬": [
    { japanese: "馬に乗ったことがありますか。", reading: "うまにのったことがありますか。", meaning: "Pernah naik kuda?" }
  ],
  "鳥": [
    { japanese: "鳥が空を飛んでいます。", reading: "とりがそらをとんでいます。", meaning: "Burung terbang di langit." }
  ],
  "魚": [
    { japanese: "魚を焼いて食べます。", reading: "さかなをやいてたべます。", meaning: "Memanggang ikan lalu makan." }
  ],
  "新": [
    { japanese: "新しい靴を買いました。", reading: "あたらしいくつをかいました。", meaning: "Membeli sepatu baru." },
    { japanese: "新聞を読みますか。", reading: "しんぶんをよみますか。", meaning: "Apakah kamu membaca koran?" }
  ],
  "古": [
    { japanese: "この建物は古いです。", reading: "このたてものはふるいです。", meaning: "Bangunan ini tua." }
  ],
  "長": [
    { japanese: "髪が長いですね。", reading: "かみがながいですね。", meaning: "Rambutnya panjang ya." }
  ],
  "短": [
    { japanese: "休みが短いです。", reading: "やすみがみじかいです。", meaning: "Liburannya pendek." }
  ],
  "高": [
    { japanese: "この山は高いです。", reading: "このやまはたかいです。", meaning: "Gunung ini tinggi." },
    { japanese: "値段が高すぎます。", reading: "ねだんがたかすぎます。", meaning: "Harganya terlalu mahal." }
  ],
  "安": [
    { japanese: "このレストランは安くておいしいです。", reading: "このレストランはやすくておいしいです。", meaning: "Restoran ini murah dan enak." }
  ],
  "低": [
    { japanese: "今日は気温が低いです。", reading: "きょうはきおんがひくいです。", meaning: "Hari ini suhunya rendah." }
  ],
  "暗": [
    { japanese: "部屋が暗いです。電気をつけてください。", reading: "へやがくらいです。でんきをつけてください。", meaning: "Kamarnya gelap. Tolong nyalakan lampu." }
  ],
  "多": [
    { japanese: "東京は人が多いです。", reading: "とうきょうはひとがおおいです。", meaning: "Tokyo orangnya banyak." }
  ],
  "少": [
    { japanese: "もう少し待ってください。", reading: "もうすこしまってください。", meaning: "Tolong tunggu sebentar lagi." }
  ],
  "行": [
    { japanese: "学校に行きます。", reading: "がっこうにいきます。", meaning: "Pergi ke sekolah." },
    { japanese: "旅行が好きです。", reading: "りょこうがすきです。", meaning: "Saya suka berwisata." }
  ],
  "来": [
    { japanese: "友達が家に来ます。", reading: "ともだちがいえにきます。", meaning: "Teman datang ke rumah." },
    { japanese: "来週テストがあります。", reading: "らいしゅうテストがあります。", meaning: "Minggu depan ada tes." }
  ],
  "帰": [
    { japanese: "六時に家に帰ります。", reading: "ろくじにいえにかえります。", meaning: "Pulang ke rumah jam 6." }
  ],
  "食": [
    { japanese: "朝ご飯を食べましたか。", reading: "あさごはんをたべましたか。", meaning: "Sudah makan sarapan?" }
  ],
  "飲": [
    { japanese: "コーヒーを飲みます。", reading: "コーヒーをのみます。", meaning: "Minum kopi." }
  ],
  "見": [
    { japanese: "映画を見ましょう。", reading: "えいがをみましょう。", meaning: "Mari nonton film." }
  ],
  "聞": [
    { japanese: "音楽を聞いています。", reading: "おんがくをきいています。", meaning: "Sedang mendengarkan musik." }
  ],
  "読": [
    { japanese: "毎晩、本を読みます。", reading: "まいばん、ほんをよみます。", meaning: "Setiap malam membaca buku." }
  ],
  "書": [
    { japanese: "手紙を書きました。", reading: "てがみをかきました。", meaning: "Menulis surat." }
  ],
  "話": [
    { japanese: "日本語で話してください。", reading: "にほんごではなしてください。", meaning: "Tolong bicara dalam bahasa Jepang." }
  ],
  "買": [
    { japanese: "新しい服を買いたいです。", reading: "あたらしいふくをかいたいです。", meaning: "Ingin membeli baju baru." }
  ],
  "教": [
    { japanese: "日本語を教えてください。", reading: "にほんごをおしえてください。", meaning: "Tolong ajarkan bahasa Jepang." }
  ],
  "朝": [
    { japanese: "朝六時に起きます。", reading: "あさろくじにおきます。", meaning: "Bangun jam 6 pagi." }
  ],
  "昼": [
    { japanese: "昼ご飯は何を食べますか。", reading: "ひるごはんはなにをたべますか。", meaning: "Makan siang makan apa?" }
  ],
  "夜": [
    { japanese: "夜は静かです。", reading: "よるはしずかです。", meaning: "Malam itu tenang." }
  ],
  "晩": [
    { japanese: "今晩、何をしますか。", reading: "こんばん、なにをしますか。", meaning: "Malam ini mau ngapain?" }
  ],
  "夕": [
    { japanese: "夕方に散歩します。", reading: "ゆうがたにさんぽします。", meaning: "Jalan-jalan sore hari." }
  ],
  "方": [
    { japanese: "あの方は先生です。", reading: "あのかたはせんせいです。", meaning: "Beliau itu guru." }
  ],
  "午": [
    { japanese: "午後三時に会いましょう。", reading: "ごごさんじにあいましょう。", meaning: "Mari bertemu jam 3 sore." }
  ],
  "前": [
    { japanese: "駅の前で待っています。", reading: "えきのまえでまっています。", meaning: "Menunggu di depan stasiun." }
  ],
  "後": [
    { japanese: "授業の後で図書館に行きます。", reading: "じゅぎょうのあとでとしょかんにいきます。", meaning: "Setelah pelajaran pergi ke perpustakaan." }
  ],
  "毎": [
    { japanese: "毎朝ジョギングをします。", reading: "まいあさジョギングをします。", meaning: "Setiap pagi jogging." }
  ],
  "週": [
    { japanese: "週末は何をしますか。", reading: "しゅうまつはなにをしますか。", meaning: "Akhir pekan mau ngapain?" }
  ],
  "曜": [
    { japanese: "何曜日が好きですか。", reading: "なんようびがすきですか。", meaning: "Suka hari apa?" }
  ],
  "作": [
    { japanese: "料理を作るのが好きです。", reading: "りょうりをつくるのがすきです。", meaning: "Suka memasak." }
  ],
  "泳": [
    { japanese: "プールで泳ぎます。", reading: "プールでおよぎます。", meaning: "Berenang di kolam." }
  ],
  "油": [
    { japanese: "油で魚を揚げます。", reading: "あぶらでさかなをあげます。", meaning: "Menggoreng ikan dengan minyak." }
  ],
  "海": [
    { japanese: "夏は海に行きたいです。", reading: "なつはうみにいきたいです。", meaning: "Musim panas ingin pergi ke laut." }
  ],
  "酒": [
    { japanese: "日本酒を飲んだことがありますか。", reading: "にほんしゅをのんだことがありますか。", meaning: "Pernah minum sake Jepang?" }
  ],
  "待": [
    { japanese: "ここで待ってください。", reading: "ここでまってください。", meaning: "Tolong tunggu di sini." }
  ],
  "校": [
    { japanese: "学校まで歩いて行きます。", reading: "がっこうまであるいていきます。", meaning: "Jalan kaki ke sekolah." }
  ],
  "時": [
    { japanese: "今何時ですか。", reading: "いまなんじですか。", meaning: "Sekarang jam berapa?" }
  ],
  "言": [
    { japanese: "何か言いましたか。", reading: "なにかいいましたか。", meaning: "Apakah kamu bilang sesuatu?" }
  ],
  "計": [
    { japanese: "時計を見てください。", reading: "とけいをみてください。", meaning: "Tolong lihat jam." }
  ],
  "語": [
    { japanese: "日本語を勉強しています。", reading: "にほんごをべんきょうしています。", meaning: "Sedang belajar bahasa Jepang." }
  ],
  "飯": [
    { japanese: "ご飯を食べましょう。", reading: "ごはんをたべましょう。", meaning: "Mari makan nasi." }
  ],
  "宅": [
    { japanese: "お宅はどちらですか。", reading: "おたくはどちらですか。", meaning: "Rumah Anda di mana?" }
  ],
  "客": [
    { japanese: "お客さんが来ました。", reading: "おきゃくさんがきました。", meaning: "Tamu datang." }
  ],
  "室": [
    { japanese: "教室は二階にあります。", reading: "きょうしつはにかいにあります。", meaning: "Ruang kelas ada di lantai 2." }
  ],
  "家": [
    { japanese: "家に帰りたいです。", reading: "いえにかえりたいです。", meaning: "Ingin pulang ke rumah." }
  ],
  "英": [
    { japanese: "英語が話せますか。", reading: "えいごがはなせますか。", meaning: "Bisa berbicara bahasa Inggris?" }
  ],
  "薬": [
    { japanese: "薬を飲んでください。", reading: "くすりをのんでください。", meaning: "Tolong minum obat." }
  ],
  "会": [
    { japanese: "明日会いましょう。", reading: "あしたあいましょう。", meaning: "Besok bertemu ya." }
  ],
  "今": [
    { japanese: "今、何をしていますか。", reading: "いま、なにをしていますか。", meaning: "Sekarang sedang apa?" }
  ],
  "雪": [
    { japanese: "冬は雪が降ります。", reading: "ふゆはゆきがふります。", meaning: "Musim dingin turun salju." }
  ],
  "雲": [
    { japanese: "今日は雲が多いです。", reading: "きょうはくもがおおいです。", meaning: "Hari ini banyak awan." }
  ],
  "電": [
    { japanese: "電車で会社に行きます。", reading: "でんしゃでかいしゃにいきます。", meaning: "Pergi ke kantor naik kereta." }
  ],
  "売": [
    { japanese: "この店で花を売っています。", reading: "このみせではなをうっています。", meaning: "Toko ini menjual bunga." }
  ],
  "広": [
    { japanese: "この公園は広いです。", reading: "このこうえんはひろいです。", meaning: "Taman ini luas." }
  ],
  "店": [
    { japanese: "あの店はおいしいです。", reading: "あのみせはおいしいです。", meaning: "Toko itu enak." }
  ],
  "度": [
    { japanese: "一度日本に行きたいです。", reading: "いちどにほんにいきたいです。", meaning: "Ingin pergi ke Jepang sekali." }
  ],
  "病": [
    { japanese: "病気になりました。", reading: "びょうきになりました。", meaning: "Saya jatuh sakit." }
  ],
  "疲": [
    { japanese: "今日はとても疲れました。", reading: "きょうはとてもつかれました。", meaning: "Hari ini sangat lelah." }
  ],
  "痛": [
    { japanese: "頭が痛いです。", reading: "あたまがいたいです。", meaning: "Kepala saya sakit." }
  ],
  "屋": [
    { japanese: "パン屋でパンを買います。", reading: "パンやでパンをかいます。", meaning: "Membeli roti di toko roti." }
  ],
  "国": [
    { japanese: "どの国に行きたいですか。", reading: "どのくににいきたいですか。", meaning: "Ingin pergi ke negara mana?" }
  ],
  "回": [
    { japanese: "一週間に三回運動します。", reading: "いっしゅうかんにさんかいうんどうします。", meaning: "Olahraga 3 kali seminggu." }
  ],
  "困": [
    { japanese: "道に迷って困りました。", reading: "みちにまよってこまりました。", meaning: "Tersesat dan bingung." }
  ],
  "開": [
    { japanese: "ドアを開けてください。", reading: "ドアをあけてください。", meaning: "Tolong buka pintu." }
  ],
  "閉": [
    { japanese: "窓を閉めてください。", reading: "まどをしめてください。", meaning: "Tolong tutup jendela." }
  ],
  "近": [
    { japanese: "駅の近くに住んでいます。", reading: "えきのちかくにすんでいます。", meaning: "Tinggal dekat stasiun." }
  ],
  "遠": [
    { japanese: "学校は家から遠いです。", reading: "がっこうはいえからとおいです。", meaning: "Sekolah jauh dari rumah." }
  ],
  "速": [
    { japanese: "新幹線は速いです。", reading: "しんかんせんははやいです。", meaning: "Shinkansen itu cepat." }
  ],
  "遅": [
    { japanese: "すみません、遅れました。", reading: "すみません、おくれました。", meaning: "Maaf, saya terlambat." }
  ],
  "道": [
    { japanese: "この道をまっすぐ行ってください。", reading: "このみちをまっすぐいってください。", meaning: "Silakan jalan lurus di jalan ini." }
  ],
  "青": [
    { japanese: "空が青いです。", reading: "そらがあおいです。", meaning: "Langitnya biru." }
  ],
  "晴": [
    { japanese: "明日は晴れるでしょう。", reading: "あしたははれるでしょう。", meaning: "Besok mungkin akan cerah." }
  ],
  "静": [
    { japanese: "図書館は静かです。", reading: "としょかんはしずかです。", meaning: "Perpustakaan itu tenang." }
  ],
  "寺": [
    { japanese: "京都でお寺を見ました。", reading: "きょうとでおてらをみました。", meaning: "Melihat kuil di Kyoto." }
  ],
  "持": [
    { japanese: "傘を持っていますか。", reading: "かさをもっていますか。", meaning: "Apakah membawa payung?" }
  ],
  "荷": [
    { japanese: "荷物が重いです。", reading: "にもつがおもいです。", meaning: "Barang bawaannya berat." }
  ],
  "歌": [
    { japanese: "歌を歌うのが好きです。", reading: "うたをうたうのがすきです。", meaning: "Suka bernyanyi." }
  ],
  "友": [
    { japanese: "友達と遊びます。", reading: "ともだちとあそびます。", meaning: "Bermain dengan teman." }
  ],
  "父": [
    { japanese: "父は会社員です。", reading: "ちちはかいしゃいんです。", meaning: "Ayah saya pegawai kantor." }
  ],
  "母": [
    { japanese: "母の料理はおいしいです。", reading: "ははのりょうりはおいしいです。", meaning: "Masakan ibu enak." }
  ],
  "兄": [
    { japanese: "兄は大学生です。", reading: "あにはだいがくせいです。", meaning: "Kakak laki-laki saya mahasiswa." }
  ],
  "姉": [
    { japanese: "姉は東京に住んでいます。", reading: "あねはとうきょうにすんでいます。", meaning: "Kakak perempuan saya tinggal di Tokyo." }
  ],
  "弟": [
    { japanese: "弟は高校生です。", reading: "おとうとはこうこうせいです。", meaning: "Adik laki-laki saya siswa SMA." }
  ],
  "妹": [
    { japanese: "妹はピアノが上手です。", reading: "いもうとはピアノがじょうずです。", meaning: "Adik perempuan saya pandai bermain piano." }
  ],
  "夫": [
    { japanese: "夫は料理が上手です。", reading: "おっとはりょうりがじょうずです。", meaning: "Suami saya pandai memasak." }
  ],
  "妻": [
    { japanese: "妻は先生です。", reading: "つまはせんせいです。", meaning: "Istri saya guru." }
  ],
  "彼": [
    { japanese: "彼は親切な人です。", reading: "かれはしんせつなひとです。", meaning: "Dia orang yang baik hati." }
  ],
  "主": [
    { japanese: "主人は出かけています。", reading: "しゅじんはでかけています。", meaning: "Suami saya sedang keluar." }
  ],
  "奥": [
    { japanese: "奥さんはお元気ですか。", reading: "おくさんはおげんきですか。", meaning: "Apakah istri Anda baik-baik saja?" }
  ],
  "元": [
    { japanese: "お元気ですか。", reading: "おげんきですか。", meaning: "Apa kabar?" }
  ],
  "気": [
    { japanese: "気をつけてください。", reading: "きをつけてください。", meaning: "Hati-hati ya." }
  ],
  "有": [
    { japanese: "有名なレストランです。", reading: "ゆうめいなレストランです。", meaning: "Restoran yang terkenal." }
  ],
  "名": [
    { japanese: "お名前は何ですか。", reading: "おなまえはなんですか。", meaning: "Siapa nama Anda?" }
  ],
  "親": [
    { japanese: "親に電話しました。", reading: "おやにでんわしました。", meaning: "Menelepon orang tua." }
  ],
  "切": [
    { japanese: "親切にしてくれてありがとう。", reading: "しんせつにしてくれてありがとう。", meaning: "Terima kasih sudah berbaik hati." }
  ],
  "便": [
    { japanese: "この駅は便利です。", reading: "このえきはべんりです。", meaning: "Stasiun ini praktis." }
  ],
  "利": [
    { japanese: "便利な道具です。", reading: "べんりなどうぐです。", meaning: "Alat yang praktis." }
  ],
  "不": [
    { japanese: "不便な場所に住んでいます。", reading: "ふべんなばしょにすんでいます。", meaning: "Tinggal di tempat yang tidak praktis." }
  ],
  "若": [
    { japanese: "若い人が多いですね。", reading: "わかいひとがおおいですね。", meaning: "Banyak orang muda ya." }
  ],
  "早": [
    { japanese: "明日は早く起きます。", reading: "あしたははやくおきます。", meaning: "Besok bangun pagi-pagi." }
  ],
  "忙": [
    { japanese: "今週は忙しいです。", reading: "こんしゅうはいそがしいです。", meaning: "Minggu ini sibuk." }
  ],
  "出": [
    { japanese: "何時に家を出ますか。", reading: "なんじにいえをでますか。", meaning: "Keluar rumah jam berapa?" }
  ],
  "入": [
    { japanese: "部屋に入ってください。", reading: "へやにはいってください。", meaning: "Silakan masuk ke kamar." }
  ],
  "乗": [
    { japanese: "バスに乗ります。", reading: "バスにのります。", meaning: "Naik bus." }
  ],
  "降": [
    { japanese: "次の駅で降ります。", reading: "つぎのえきでおります。", meaning: "Turun di stasiun berikutnya." }
  ],
  "着": [
    { japanese: "空港に着きました。", reading: "くうこうにつきました。", meaning: "Sudah sampai di bandara." }
  ],
  "渡": [
    { japanese: "橋を渡ってください。", reading: "はしをわたってください。", meaning: "Silakan menyeberangi jembatan." }
  ],
  "通": [
    { japanese: "この道を通ります。", reading: "このみちをとおります。", meaning: "Melewati jalan ini." }
  ],
  "走": [
    { japanese: "毎朝走っています。", reading: "まいあさはしっています。", meaning: "Setiap pagi berlari." }
  ],
  "歩": [
    { japanese: "駅まで歩いて十分です。", reading: "えきまであるいてじゅっぷんです。", meaning: "Jalan kaki ke stasiun 10 menit." }
  ],
  "止": [
    { japanese: "車を止めてください。", reading: "くるまをとめてください。", meaning: "Tolong hentikan mobilnya." }
  ],
  "動": [
    { japanese: "動物園に行きたいです。", reading: "どうぶつえんにいきたいです。", meaning: "Ingin pergi ke kebun binatang." }
  ],
  "働": [
    { japanese: "銀行で働いています。", reading: "ぎんこうではたらいています。", meaning: "Bekerja di bank." }
  ],
  "右": [
    { japanese: "右に曲がってください。", reading: "みぎにまがってください。", meaning: "Belok kanan." }
  ],
  "左": [
    { japanese: "左にコンビニがあります。", reading: "ひだりにコンビニがあります。", meaning: "Di sebelah kiri ada minimarket." }
  ],
  "東": [
    { japanese: "東京は日本の首都です。", reading: "とうきょうはにほんのしゅとです。", meaning: "Tokyo adalah ibu kota Jepang." }
  ],
  "西": [
    { japanese: "西口で待ち合わせましょう。", reading: "にしぐちでまちあわせましょう。", meaning: "Mari bertemu di pintu barat." }
  ],
  "北": [
    { japanese: "北海道は寒いです。", reading: "ほっかいどうはさむいです。", meaning: "Hokkaido itu dingin." }
  ],
  "南": [
    { japanese: "南の島に行きたいです。", reading: "みなみのしまにいきたいです。", meaning: "Ingin pergi ke pulau selatan." }
  ],
  "外": [
    { japanese: "外は寒いです。", reading: "そとはさむいです。", meaning: "Di luar dingin." }
  ],
  "内": [
    { japanese: "案内してくれますか。", reading: "あんないしてくれますか。", meaning: "Bisa kamu pandu?" }
  ],
  "部": [
    { japanese: "部屋をきれいにしてください。", reading: "へやをきれいにしてください。", meaning: "Tolong bersihkan kamar." }
  ],
  "駅": [
    { japanese: "駅はどこですか。", reading: "えきはどこですか。", meaning: "Stasiun di mana?" }
  ],
  "社": [
    { japanese: "会社は九時からです。", reading: "かいしゃはくじからです。", meaning: "Kantor mulai jam 9." }
  ],
  "院": [
    { japanese: "病院に行きました。", reading: "びょういんにいきました。", meaning: "Pergi ke rumah sakit." }
  ],
  "地": [
    { japanese: "地図を見せてください。", reading: "ちずをみせてください。", meaning: "Tolong tunjukkan peta." }
  ],
  "鉄": [
    { japanese: "地下鉄で行きましょう。", reading: "ちかてつでいきましょう。", meaning: "Mari pergi naik kereta bawah tanah." }
  ],
  "工": [
    { japanese: "工場で働いています。", reading: "こうじょうではたらいています。", meaning: "Bekerja di pabrik." }
  ],
  "場": [
    { japanese: "待ち合わせ場所はどこですか。", reading: "まちあわせばしょはどこですか。", meaning: "Tempat bertemu di mana?" }
  ],
  "図": [
    { japanese: "図書館で本を借ります。", reading: "としょかんでほんをかります。", meaning: "Meminjam buku di perpustakaan." }
  ],
  "館": [
    { japanese: "映画館で映画を見ます。", reading: "えいがかんでえいがをみます。", meaning: "Menonton film di bioskop." }
  ],
  "公": [
    { japanese: "公園で遊びましょう。", reading: "こうえんであそびましょう。", meaning: "Mari bermain di taman." }
  ],
  "園": [
    { japanese: "動物園は楽しいです。", reading: "どうぶつえんはたのしいです。", meaning: "Kebun binatang itu menyenangkan." }
  ],
  "住": [
    { japanese: "どこに住んでいますか。", reading: "どこにすんでいますか。", meaning: "Tinggal di mana?" }
  ],
  "所": [
    { japanese: "住所を書いてください。", reading: "じゅうしょをかいてください。", meaning: "Tolong tulis alamat." }
  ],
  "番": [
    { japanese: "電話番号を教えてください。", reading: "でんわばんごうをおしえてください。", meaning: "Tolong beritahu nomor telepon." }
  ],
  "号": [
    { japanese: "三号室に行ってください。", reading: "さんごうしつにいってください。", meaning: "Silakan pergi ke kamar nomor 3." }
  ],
  "市": [
    { japanese: "東京市に住んでいます。", reading: "とうきょうしにすんでいます。", meaning: "Tinggal di kota Tokyo." }
  ],
  "町": [
    { japanese: "この町は静かです。", reading: "このまちはしずかです。", meaning: "Kota ini tenang." }
  ],
  "村": [
    { japanese: "小さい村に住んでいます。", reading: "ちいさいむらにすんでいます。", meaning: "Tinggal di desa kecil." }
  ],
  "区": [
    { japanese: "渋谷区に住んでいます。", reading: "しぶやくにすんでいます。", meaning: "Tinggal di distrik Shibuya." }
  ],
  "都": [
    { japanese: "東京都は大きいです。", reading: "とうきょうとはおおきいです。", meaning: "Metropolis Tokyo itu besar." }
  ],
  "府": [
    { japanese: "大阪府に行ったことがあります。", reading: "おおさかふにいったことがあります。", meaning: "Pernah ke Prefektur Osaka." }
  ],
  "県": [
    { japanese: "沖縄県の海はきれいです。", reading: "おきなわけんのうみはきれいです。", meaning: "Laut Prefektur Okinawa indah." }
  ],
  "島": [
    { japanese: "島の生活は静かです。", reading: "しまのせいかつはしずかです。", meaning: "Kehidupan di pulau itu tenang." }
  ],
  "京": [
    { japanese: "京都に行きたいです。", reading: "きょうとにいきたいです。", meaning: "Ingin pergi ke Kyoto." }
  ],
  "様": [
    { japanese: "田中様、こちらへどうぞ。", reading: "たなかさま、こちらへどうぞ。", meaning: "Tuan Tanaka, silakan ke sini." }
  ],
  "練": [
    { japanese: "毎日練習しています。", reading: "まいにちれんしゅうしています。", meaning: "Berlatih setiap hari." }
  ],
  "習": [
    { japanese: "日本語を習っています。", reading: "にほんごをならっています。", meaning: "Sedang belajar bahasa Jepang." }
  ],
  "勉": [
    { japanese: "勉強は大切です。", reading: "べんきょうはたいせつです。", meaning: "Belajar itu penting." }
  ],
  "強": [
    { japanese: "風が強いです。", reading: "かぜがつよいです。", meaning: "Anginnya kencang." }
  ],
  "研": [
    { japanese: "研究室はどこですか。", reading: "けんきゅうしつはどこですか。", meaning: "Laboratorium di mana?" }
  ],
  "究": [
    { japanese: "日本語の研究をしています。", reading: "にほんごのけんきゅうをしています。", meaning: "Sedang meneliti bahasa Jepang." }
  ],
  "留": [
    { japanese: "日本に留学したいです。", reading: "にほんにりゅうがくしたいです。", meaning: "Ingin kuliah di Jepang." }
  ],
  "質": [
    { japanese: "質問がありますか。", reading: "しつもんがありますか。", meaning: "Ada pertanyaan?" }
  ],
  "問": [
    { japanese: "この問題は難しいです。", reading: "このもんだいはむずかしいです。", meaning: "Soal ini sulit." }
  ],
  "題": [
    { japanese: "宿題を出してください。", reading: "しゅくだいをだしてください。", meaning: "Tolong kumpulkan PR." }
  ],
  "答": [
    { japanese: "答えを書いてください。", reading: "こたえをかいてください。", meaning: "Tolong tulis jawabannya." }
  ],
  "宿": [
    { japanese: "宿題が多いです。", reading: "しゅくだいがおおいです。", meaning: "PR-nya banyak." }
  ],
  "政": [
    { japanese: "政治に興味がありますか。", reading: "せいじにきょうみがありますか。", meaning: "Tertarik dengan politik?" }
  ],
  "治": [
    { japanese: "病気を治します。", reading: "びょうきをなおします。", meaning: "Menyembuhkan penyakit." }
  ],
  "経": [
    { japanese: "経済の勉強をしています。", reading: "けいざいのべんきょうをしています。", meaning: "Belajar ekonomi." }
  ],
  "済": [
    { japanese: "宿題はもう済みましたか。", reading: "しゅくだいはもうすみましたか。", meaning: "PR sudah selesai?" }
  ],
  "歴": [
    { japanese: "歴史が好きです。", reading: "れきしがすきです。", meaning: "Saya suka sejarah." }
  ],
  "史": [
    { japanese: "日本の歴史は長いです。", reading: "にほんのれきしはながいです。", meaning: "Sejarah Jepang itu panjang." }
  ],
  "育": [
    { japanese: "体育の授業が好きです。", reading: "たいいくのじゅぎょうがすきです。", meaning: "Suka pelajaran olahraga." }
  ],
  "化": [
    { japanese: "日本の文化を勉強しています。", reading: "にほんのぶんかをべんきょうしています。", meaning: "Belajar budaya Jepang." }
  ],
  "理": [
    { japanese: "料理が上手ですね。", reading: "りょうりがじょうずですね。", meaning: "Pandai memasak ya." }
  ],
  "科": [
    { japanese: "理科の実験をします。", reading: "りかのじっけんをします。", meaning: "Melakukan percobaan IPA." }
  ],
  "数": [
    { japanese: "数学が得意です。", reading: "すうがくがとくいです。", meaning: "Saya pandai matematika." }
  ],
  "医": [
    { japanese: "医者になりたいです。", reading: "いしゃになりたいです。", meaning: "Ingin menjadi dokter." }
  ],
};
