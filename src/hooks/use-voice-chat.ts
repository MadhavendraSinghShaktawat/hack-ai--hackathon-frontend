import { useState, useCallback, useRef } from 'react';
import { ChatMessage, ChatResponse } from '../types/chat';

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
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
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

  const sendToAI = async (text: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/voice/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          context: chatHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.status === 'success' && data.data.response) {
        const newMessage: ChatMessage = {
          role: 'assistant',
          content: data.data.response
        };
        setChatHistory(data.data.history || [...chatHistory, 
          { role: 'user', content: text },
          newMessage
        ]);
        return data.data.response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('API Error Details:', err);
      throw err;
    }
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

    const finalText = transcript || interimTranscript;
    if (finalText) {
      setIsProcessing(true);
      try {
        console.log('Sending text to AI:', finalText); // Debug log
        const aiResponse = await sendToAI(finalText);
        setResponse(aiResponse);
      } catch (err) {
        console.error('Failed to process recording:', err);
        // More specific error messages
        if (err instanceof Error) {
          if (err.message.includes('API Error: 401')) {
            setResponse('Authentication error. Please try again.');
          } else if (err.message.includes('API Error: 429')) {
            setResponse('Too many requests. Please wait a moment.');
          } else if (err.message.includes('Failed to fetch')) {
            setResponse('Network error. Please check your connection.');
          } else {
            setResponse('Sorry, I had trouble processing that. Please try again.');
          }
        }
      } finally {
        setIsProcessing(false);
      }
    }
  }, [transcript, interimTranscript, chatHistory]);

  return {
    isRecording,
    transcript: interimTranscript || transcript,
    response,
    isProcessing,
    chatHistory,
    startRecording,
    stopRecording,
  };
}; 