import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatResponse } from '../types/chat';

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

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const latestResponseRef = useRef<string>('');

  const sendToAI = async (text: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3000/api/voice/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          text,
          context: messages
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data?.response) {
        const cleanResponse = data.data.response.replace(/^"|"$/g, '');
        if (data.data.history) {
          setMessages(data.data.history);
        }
        latestResponseRef.current = cleanResponse;
        return cleanResponse;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  };

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      
      if (result.isFinal) {
        setTranscript(transcript.trim());
        recognition.stop();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      recognition.stop();
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    return recognition;
  };

  const startRecording = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
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
  }, []);

  useEffect(() => {
    const processTranscript = async () => {
      if (transcript && !isProcessing) {
        setIsProcessing(true);
        
        try {
          const userMessage: ChatMessage = { 
            role: 'user', 
            content: transcript 
          };
          setMessages(prev => [...prev, userMessage]);

          const aiResponse = await sendToAI(transcript);
          
          if (latestResponseRef.current) {
            const utterance = new SpeechSynthesisUtterance(latestResponseRef.current);
            utterance.rate = 1;
            utterance.pitch = 1;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          }
        } catch (err) {
          console.error('Error processing message:', err);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Sorry, I had trouble processing that. Please try again.'
          }]);
        } finally {
          setIsProcessing(false);
          setTranscript('');
          latestResponseRef.current = '';
        }
      }
    };

    processTranscript();
  }, [transcript]);

  return {
    isRecording,
    isProcessing,
    messages,
    startRecording,
    stopRecording,
  };
}; 