import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiSensei: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Konnichiwa! Saya AI Sensei. Ada Kanji, kosakata, atau tata bahasa Jepang yang ingin Anda tanyakan?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Panggil API Cloudflare Pages Function yang akan kita buat nanti
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Gagal menghubungi Sensei');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'Sensei tidak bisa memberikan jawaban saat ini.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Gomen nasai (Maaf), saya sedang mengalami gangguan koneksi atau model yang Anda pilih tidak tersedia. Coba lagi nanti ya!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] max-w-xl mx-auto space-y-6">
      <Card className="flex-1 overflow-hidden bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary/80 text-foreground border border-white/10'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[80%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-sm' 
                    : 'bg-white/10 backdrop-blur-md border border-white/5 text-foreground rounded-tl-sm'
                }`}>
                  {String(msg.content || '').split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-secondary/80 flex items-center justify-center border border-white/10 text-foreground">
                <Bot size={20} />
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/5 p-5 rounded-[2rem] rounded-tl-sm flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-black uppercase tracking-widest opacity-70">Sensei sedang mengetik...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-4 bg-background/30 backdrop-blur-md border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu tentang bahasa Jepang..."
              className="flex-1 bg-white/5 border-2 border-white/10 rounded-[1.5rem] px-6 py-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-muted-foreground/50 text-sm"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="h-[60px] w-[60px] rounded-[1.5rem] bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={20} className={input.trim() && !isLoading ? 'animate-pulse' : ''} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AiSensei;