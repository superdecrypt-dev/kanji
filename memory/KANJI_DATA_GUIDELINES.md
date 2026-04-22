# Kanji Data Guidelines

Dokumen ini menetapkan aturan kerja untuk menjaga akurasi data kanji di repo ini tanpa merusak fokus pembelajaran `JLPT N4`.

## Tujuan

- Menjaga data kanji tetap akurat untuk pembelajar Bahasa Jepang tingkat dasar
- Memisahkan makna dasar kanji tunggal dari makna kata majemuk
- Menjaga UI tetap sederhana walau akurasi data ditingkatkan
- Menghindari regresi saat menambah lesson baru atau memperbarui dataset

## Sumber Acuan

### Reading Resmi

- `文化庁 常用漢字表 音訓索引`
- Dipakai untuk memeriksa:
  - `kunyomi`
  - `onyomi`
  - bentuk resmi vs bentuk tambahan

### Makna Dasar Kanji

- `漢字ペディア`
- Dipakai untuk memeriksa:
  - makna inti kanji tunggal
  - nuansa dasar karakter
  - apakah arti saat ini terlalu dipengaruhi jukugo

## Prinsip Gloss Indonesia

### 1. Dahulukan makna kanji tunggal

Arti harus mewakili karakter tunggal, bukan otomatis arti kata majemuk paling populer.

Contoh:

- `社` lebih tepat `kuil Shinto / organisasi`
  - bukan langsung `perusahaan`
- `院` lebih tepat `institusi / bangunan`
  - bukan langsung `rumah sakit`
- `彼` lebih tepat `dia / itu`
  - bukan `pacar`

### 2. Hindari arti yang murni berasal dari jukugo

Jika arti hanya benar dalam compound tertentu, jangan dipakai sebagai gloss utama kanji tunggal.

Contoh:

- `宿` jangan `PR`
- `車` jangan `mobil` saja
- `漢` jangan `kanji`
- `格` jangan `lulus`

### 3. Pilih gloss singkat, bukan kamus panjang

Gloss di app harus cukup ringkas untuk flashcard, list, dan quiz.

Target:

- `1-3` potongan arti utama
- ringkas
- mudah dipahami user Indonesia

Contoh format:

- `bagian / membagi / mengerti`
- `publik / adil / umum`
- `rumah / keluarga / ahli`

### 4. Jangan terlalu modern atau terlalu institusional jika bukan makna inti

Hindari arti yang terdengar benar hanya dalam konteks administrasi atau istilah modern.

Contoh:

- `府` lebih aman `kantor pemerintahan / prefektur`
- `部` lebih aman `bagian / kelompok`
- `科` lebih aman `golongan / bidang`

### 5. Pertahankan fokus N4

Walau sumber resmi bisa memberi makna atau reading yang lebih luas, tampilan utama harus tetap ramah pemula.

Artinya:

- reading utama tetap yang paling relevan untuk belajar dasar
- reading resmi tambahan boleh ada di layer validasi/helper
- UI tidak perlu menampilkan semua varian sekaligus

## Aturan Reading

### 1. Bedakan reading utama dan tambahan

- `src/data.ts` menyimpan reading utama yang ditampilkan ke user
- `src/kanjiReadingMetadata.ts` menyimpan layer reading resmi/tambahan
- `src/kanjiReadings.ts` menggabungkan semuanya untuk validasi kuis

### 2. Gunakan tanda kurung untuk okurigana

Format standar:

- `おく(る)`
- `たの(しい)`
- `むす(ぶ)`

Tujuan:

- menjaga keterbacaan untuk pembelajar
- menandai bagian kanji vs okurigana
- tetap kompatibel dengan parser kuis

### 3. Jangan masukkan fragmen parsing sebagai jawaban valid

Helper reading harus menerima:

- bentuk penuh
- bentuk tanpa kurung
- bentuk resmi tambahan yang memang valid

Helper reading tidak boleh menerima:

- fragmen parsial seperti `jiru`, `くる`, atau potongan acak lain

## Aturan Saat Menambah Kanji Baru

Untuk setiap entri baru:

1. Verifikasi kanji dan reading dari sumber resmi
2. Tentukan gloss Indonesia berdasarkan makna dasar kanji tunggal
3. Hindari mengambil arti mentah dari satu jukugo yang populer
4. Gunakan format reading yang konsisten dengan dataset sekarang
5. Pastikan build lolos

Checklist minimum:

- `meaning`
- `kunyomi`
- `onyomi`
- `kunyomi_romaji`
- `onyomi_romaji`
- `lesson`
- contoh kalimat jika fitur membutuhkannya

## Aturan Saat Mengubah Arti Lama

Ubah gloss jika:

- arti sekarang jelas terlalu dipengaruhi jukugo
- arti sekarang menyesatkan untuk kanji tunggal
- arti sekarang terlalu sempit
- arti sekarang terlalu administratif atau terlalu modern

Tidak perlu diubah jika:

- perbedaannya hanya preferensi sinonim kecil
- gloss sekarang masih cukup aman untuk pembelajar pemula
- perubahan justru membuat arti lebih abstrak dan kurang usable di UI

## Status Saat Ini

Dataset saat ini sudah melalui:

- audit reading berbasis `文化庁`
- audit gloss bertahap berbasis `漢字ペディア`
- perbaikan validasi reading/meaning di quiz

Perubahan gloss dari versi awal repo:

- `48` arti sudah direvisi agar lebih dekat ke makna dasar kanji tunggal

## Keputusan Produk

Repo ini sekarang diposisikan sebagai:

- aplikasi belajar kanji pemula yang akurat
- bukan kamus akademik penuh

Artinya:

- akurasi tetap penting
- tetapi display harus tetap sederhana
- jika harus memilih, pilih arti yang benar dan usable untuk pembelajar dasar
