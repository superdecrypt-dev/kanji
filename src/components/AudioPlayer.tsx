import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

export function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.startsWith('ja')) || voices[0];
  
  if (preferredVoice) utterance.voice = preferredVoice;
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  
  window.speechSynthesis.speak(utterance);
}

interface AudioButtonProps {
  text: string;
  size?: number;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 18, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = () => {
      setIsSupported(!!(window.speechSynthesis));
    };
    checkSupport();
    if (window.speechSynthesis?.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = checkSupport;
    }
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSupported) return;
    setIsPlaying(true);
    speak(text);
    setTimeout(() => setIsPlaying(false), 800);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-12 w-12 rounded-2xl transition-all duration-300 ${
        isPlaying ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-white/5 hover:bg-white/10 text-primary border border-white/10'
      } ${className}`}
      onClick={handleSpeak}
      disabled={!isSupported}
    >
      {isSupported ? (
        <Volume2 size={size} className={isPlaying ? 'animate-pulse' : ''} />
      ) : (
        <VolumeX size={size} className="opacity-20" />
      )}
    </Button>
  );
};
