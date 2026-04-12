export interface Env {
  AI: any;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  const prompt = `Anda adalah pembuat soal kuis bahasa Jepang tingkat JLPT N4 dan N5.
Tugas Anda: Buatlah 1 kosakata gabungan (Jukugo) acak dari level N4 atau N5.
Anda HARUS merespons HANYA dengan 1 buah objek JSON murni, tanpa teks penjelasan apapun sebelum atau sesudahnya. 
Format JSON harus persis seperti ini:
{
  "word": "Kanji Jukugo (contoh: 毎日)",
  "reading": "cara baca Hiragana (contoh: まいにち)",
  "meaning": "arti dalam bahasa Indonesia (contoh: setiap hari)",
  "wrong_readings": ["cara baca salah 1", "cara baca salah 2", "cara baca salah 3"],
  "wrong_meanings": ["arti salah 1", "arti salah 2", "arti salah 3"]
}
`;

  try {
    // Memanggil model Qwen 3 yang ahli bahasa Asia
    const response = await env.AI.run('@cf/qwen/qwen3-30b-a3b-fp8', {
      messages: [{ role: 'user', content: prompt }]
    });

    let rawText = (response as any).response;
    
    // Ekstrak JSON jika AI menambahkan blok kode markdown
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      rawText = jsonMatch[0];
    }
    
    const json = JSON.parse(rawText);

    return new Response(JSON.stringify(json), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    // Fallback jika AI gagal (karena limitasi atau error)
    const fallback = {
      "word": "時間",
      "reading": "じかん",
      "meaning": "waktu",
      "wrong_readings": ["じき", "とき", "じだい"],
      "wrong_meanings": ["jam", "hari", "menit"]
    };
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
