import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';

export function speak(text: string) {
  if (!window.speechSynthesis) return;
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.8; // Slightly slower for clarity
  window.speechSynthesis.speak(utterance);
}

interface AudioButtonProps {
  text: string;
  size?: number;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, size = 16, className = "" }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 rounded-full hover:bg-primary/10 text-primary ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      title="Putar Suara"
    >
      <Volume2 size={size} />
    </Button>
  );
};
