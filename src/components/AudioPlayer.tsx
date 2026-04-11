import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

export function speak(text: string) {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported in this browser.");
    return;
  }
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Find a Japanese voice
  const voices = window.speechSynthesis.getVoices();
  // Filter for Japanese voices
  const jaVoices = voices.filter(v => v.lang.startsWith('ja'));
  
  // Prefer "Google 日本語" on Android if available, otherwise take the first Japanese voice
  const preferredVoice = jaVoices.find(v => v.name.includes('Google')) || jaVoices[0];
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Some browsers need a tiny delay after cancel()
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
}

// Pre-load voices
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
}

interface AudioButtonProps {
  text: string;
  size?: number;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 16, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isSupported = typeof window !== 'undefined' && !!window.speechSynthesis;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSupported) return;

    setIsPlaying(true);
    speak(text);
    
    // Visual feedback duration
    setTimeout(() => setIsPlaying(false), 1000);
  };

  if (!isSupported) {
    return (
      <Button variant="ghost" size="icon" disabled className="opacity-20">
        <VolumeX size={size} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-10 w-10 rounded-full transition-all duration-200 ${
        isPlaying ? 'bg-primary text-white scale-110' : 'hover:bg-primary/10 text-primary'
      } ${className}`}
      onClick={handleSpeak}
      title="Putar Suara"
    >
      <Volume2 size={size} className={isPlaying ? 'animate-pulse' : ''} />
    </Button>
  );
};
