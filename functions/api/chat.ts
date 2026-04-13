export interface Env {
  AI: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data = await request.json();
    const message = (data as any).message;
    const history = (data as any).history || [];

    const systemPromptStr = 'Anda adalah "AI Sensei", asisten belajar bahasa Jepang yang sangat ahli, ramah, dan penyabar. Target murid Anda adalah seseorang yang sedang belajar JLPT N4. Gunakan bahasa Indonesia yang santai tapi sopan. Jika ditanya tentang huruf Kanji, Kosakata, atau Tata Bahasa (Bunpou), berikan penjelasan yang ringkas, mudah dipahami, dan sertakan contoh kalimat sederhana beserta Romaji dan artinya. Jangan menjawab terlalu panjang bertele-tele.\n\n';

    // Gabungkan riwayat percakapan agar AI ingat konteks
    let formattedMessages = [...history];
    if (formattedMessages.length > 0 && formattedMessages[0].role === 'assistant') {
       // Remove the initial generic greeting if we are sending history to Gemma 
       // Gemma usually requires conversation to start with 'user'.
       formattedMessages.shift();
    }

    // Prepare the new message
    let finalMessageContent = message;
    if (formattedMessages.length === 0) {
        // If it's the very first message, prepend the system prompt to the user's message
        finalMessageContent = systemPromptStr + message;
    }

    formattedMessages.push({ role: 'user', content: finalMessageContent });

    // Memanggil model Qwen 2.5 7B Instruct dari Cloudflare AI
    const response = await env.AI.run('@cf/google/gemma-4-26b-a4b-it', {
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
