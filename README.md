# Kanji N4 Study App

Aplikasi web modern untuk mempelajari 248 Kanji JLPT N4 dengan sistem **Spaced Repetition (SRS)**, antarmuka premium, dan dukungan Bahasa Indonesia sepenuhnya.

## ✨ Fitur Utama

-   📊 **Dashboard Progres:** Pantau jumlah Kanji yang baru, sedang dipelajari, dan sudah dihafal.
-   🎴 **Flashcards 3D:** Menghafal Kanji dengan animasi kartu membalik yang interaktif.
-   🎮 **Kuis Lanjutan:** Berbagai mode kuis (Kanji ke Arti, Cara Baca ke Kanji, dsb) untuk menguji pemahaman.
-   📖 **Daftar Kanji Lengkap:** Referensi cepat dengan fitur pencarian dan filter per pelajaran (Lesson 1-22).
-   🇮🇩 **Bahasa Indonesia:** Arti Kanji dan instruksi aplikasi menggunakan Bahasa Indonesia yang akurat.
-   🌓 **Mode Gelap:** Tampilan yang nyaman di mata untuk belajar kapan saja.

## 🛠️ Tech Stack

-   **Frontend:** React 19, TypeScript, Vite
-   **Styling:** Tailwind CSS, shadcn/ui
-   **Animation:** Framer Motion
-   **Icons:** Lucide React

---

## 🚀 Cara Deploy ke Cloudflare Pages

Ikuti langkah-langkah berikut untuk mengaktifkan website ini secara publik menggunakan Cloudflare Pages:

1.  **Masuk ke Dashboard Cloudflare:** Login di [dash.cloudflare.com](https://dash.cloudflare.com/).
2.  **Buka Workers & Pages:** Pilih menu **Workers & Pages** di sidebar kiri.
3.  **Buat Aplikasi Baru:** Klik **Create application** > Tab **Pages** > **Connect to Git**.
4.  **Hubungkan GitHub:** Pilih akun GitHub Anda dan pilih repositori `kanji`.
5.  **Konfigurasi Build:**
    -   **Framework preset:** `Vite`
    -   **Build command:** `npm run build`
    -   **Build output directory:** `dist`
    -   **Node.js version:** Pastikan menggunakan versi terbaru (Cloudflare biasanya otomatis menggunakan versi yang kompatibel).
6.  **Simpan dan Deploy:** Klik **Save and Deploy**. Website Anda akan aktif dalam 1-2 menit di URL `*.pages.dev`.

---

## 💻 Pengembangan Lokal

Jika Anda ingin menjalankan aplikasi ini di komputer/HP sendiri (via Termux):

```bash
# Clone repositori
git clone https://github.com/superdecrypt-dev/kanji.git
cd kanji

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:5173` di browser Anda.

---

## 📝 Catatan Data
Data Kanji bersumber dari daftar standar JLPT N4 yang telah diterjemahkan secara manual ke Bahasa Indonesia untuk akurasi terbaik. Progres belajar Anda disimpan secara otomatis di **LocalStorage** browser masing-masing.
