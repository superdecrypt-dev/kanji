# Kanji

Aplikasi web untuk mempelajari **248 Kanji JLPT N4** dengan antarmuka modern, responsif, dan dukungan Bahasa Indonesia sepenuhnya.

**Live:** [kanji.pages.dev](https://kanji.pages.dev)

---

## Fitur

### Daftar Kanji
- Referensi lengkap 248 Kanji N4 dengan arti, Kunyomi, Onyomi, dan Romaji
- Pencarian berdasarkan kanji, arti, atau cara baca
- Filter per pelajaran (L1–L22)
- Contoh kalimat per Kanji (Jepang, cara baca, terjemahan Indonesia)
- Indikator status penguasaan di setiap kartu

### Flashcards
- Kartu membalik dengan animasi 3D
- Navigasi Sebelumnya / Lanjut
- Mode acak (shuffle) dan acak ulang
- Filter per pelajaran

### Latihan Kuis (Pilihan Ganda)
- Mode Kanji dan Jukugo (250+ kata majemuk)
- Tipe soal: Arti, Baca, atau Campur
- Jawaban Jukugo menggunakan Hiragana/Katakana
- Kuis adaptif — Kanji yang sering salah muncul lebih sering

### Kuis Ketik
- Pertanyaan spesifik Kunyomi atau Onyomi
- Tipe soal: Arti, Baca, atau Campur
- Filter per pelajaran
- Tombol Petunjuk (menampilkan huruf awal jawaban)
- Tombol Lewati
- Kuis adaptif

### Kalimat Rumpang
- 30+ soal melengkapi kalimat Jepang
- Pilihan ganda dengan feedback benar/salah

### Umum
- Responsif (HP & PC/Laptop)
- Navigasi bawah (mobile) dan sidebar (desktop)
- Mode Gelap / Terang
- Progress tracking otomatis via LocalStorage
- Status penguasaan: Belum → Belajar → Mengulang → Dikuasai

---

## Sistem Progress

Status dihitung otomatis dari jawaban kuis:

| Status | Syarat |
|---|---|
| **Belum** | Belum pernah menjawab |
| **Belajar** | Benar kurang dari 3 kali |
| **Mengulang** | Benar 3–7 kali |
| **Dikuasai** | Benar 8+ kali dengan akurasi ≥ 80% |

Kanji yang masih lemah akan muncul lebih sering di kuis (adaptif).

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Animasi:** Framer Motion
- **Ikon:** Lucide React
- **Font:** DM Sans, Noto Sans JP
- **Hosting:** Cloudflare Pages

---

## Deploy ke Cloudflare Pages

1. Login ke [dash.cloudflare.com](https://dash.cloudflare.com/)
2. Buka **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Pilih repositori `superdecrypt-dev/kanji`
4. Konfigurasi build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Klik **Save and Deploy**

---

## Pengembangan Lokal

```bash
# Clone repositori
git clone https://github.com/superdecrypt-dev/kanji.git
cd kanji

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## Struktur Proyek

```
src/
├── App.tsx                    # Komponen utama + navigasi + progress bar
├── data.ts                    # Data 248 Kanji N4
├── jukugoData.ts              # Data 250+ kata majemuk (Jukugo)
├── sentenceData.ts            # Data soal kalimat rumpang
├── exampleSentences.ts        # Contoh kalimat per Kanji
├── hooks/
│   └── useProgress.ts         # Hook progress tracking & kuis adaptif
├── components/
│   ├── KanjiList.tsx          # Daftar Kanji dengan search & filter
│   ├── Flashcard.tsx          # Kartu flashcard dengan animasi flip
│   ├── AdvancedQuiz.tsx       # Kuis pilihan ganda (Kanji + Jukugo)
│   ├── TypingQuiz.tsx         # Kuis ketik
│   ├── SentenceQuiz.tsx       # Kuis kalimat rumpang
│   ├── LessonSelector.tsx     # Pemilih pelajaran (horizontal scroll)
│   └── ui/                    # Komponen UI dasar (Button, Card, dll)
└── index.css                  # Tema & style global
```

---

## Catatan Data

- Data Kanji bersumber dari daftar standar JLPT N4, diterjemahkan ke Bahasa Indonesia
- Contoh kalimat disertai cara baca (Hiragana) dan terjemahan Indonesia
- Data Jukugo menggunakan Hiragana untuk cara baca
- Progres belajar disimpan di **LocalStorage** browser

---

Made with ❤️ by Sigit Dwilaksono
