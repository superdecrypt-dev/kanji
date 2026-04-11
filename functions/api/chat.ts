export interface Env {
  AI: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data = await request.json();
    const message = (data as any).message;
    const history = (data as any).history || [];

    // System prompt untuk menginstruksikan AI menjadi "Sensei"
    const systemPrompt = {
      role: 'system',
      content: 'Anda adalah "AI Sensei", asisten belajar bahasa Jepang yang sangat ahli, ramah, dan penyabar. Target murid Anda adalah seseorang yang sedang belajar JLPT N4. Gunakan bahasa Indonesia yang santai tapi sopan. Jika ditanya tentang huruf Kanji, Kosakata, atau Tata Bahasa (Bunpou), berikan penjelasan yang ringkas, mudah dipahami, dan sertakan contoh kalimat sederhana beserta Romaji dan artinya. Jangan menjawab terlalu panjang bertele-tele.'
    };

    // Gabungkan riwayat percakapan agar AI ingat konteks
    const formattedMessages = [
      systemPrompt,
      ...history,
      { role: 'user', content: message }
    ];

    // Memanggil model Llama-3 dari Cloudflare AI
    // @cf/meta/llama-3-8b-instruct adalah model yang sangat pintar, cepat, dan gratis di Cloudflare
    const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: formattedMessages
    });

    return new Response(JSON.stringify({ response: (response as any).response }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Terjadi kesalahan pada Sensei' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
