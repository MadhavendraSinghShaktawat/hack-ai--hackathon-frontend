import { useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Configure voice settings
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Use a female voice if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || voice.name.includes('female')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Speak the text
    speechSynthesis.speak(utterance);

    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}; 