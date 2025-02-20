import { useState, useCallback, useRef } from 'react';

// Add type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: (event: Event) => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export const useVoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition
    recognition.continuous = false; // Changed to false to handle one utterance at a time
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsRecording(true);
      setTranscript('');
      setInterimTranscript('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let currentInterim = '';

      // Process all results
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          currentInterim += result[0].transcript;
        }
      }

      // Update interim results in real-time
      if (currentInterim) {
        setInterimTranscript(currentInterim);
      }

      // Update final transcript
      if (finalTranscript) {
        setTranscript(finalTranscript);
        setInterimTranscript('');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      stopRecording();
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      if (isRecording) {
        stopRecording();
      }
    };

    return recognition;
  };

  const startRecording = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create new recognition instance each time
      recognitionRef.current = initializeSpeechRecognition();
      recognitionRef.current.start();
      
    } catch (err) {
      console.error('Failed to start recording:', err);
      alert('Please allow microphone access to use voice chat');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setInterimTranscript('');

    // Use the final transcript or the current interim transcript
    const finalText = transcript || interimTranscript;
    if (finalText) {
      setIsProcessing(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResponse(`I heard you say: "${finalText}". This is a simulated response.`);
      } catch (err) {
        console.error('Failed to process recording:', err);
        setResponse('Sorry, I had trouble processing that. Could you try again?');
      } finally {
        setIsProcessing(false);
      }
    }
  }, [transcript, interimTranscript]);

  return {
    isRecording,
    transcript: interimTranscript || transcript, // Return interim results while recording
    response,
    isProcessing,
    startRecording,
    stopRecording,
  };
}; 