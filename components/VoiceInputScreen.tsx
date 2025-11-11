
import React, { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useReadAloud } from '../hooks/useReadAloud';

// Fix: Add type definitions for the Web Speech API (SpeechRecognition) to resolve TypeScript errors.
// The browser's speech recognition API is not part of standard TypeScript DOM typings.
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: () => void;
  onend: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
}

declare global {
  interface Window {
    SpeechRecognition: { new (): SpeechRecognition };
    webkitSpeechRecognition: { new (): SpeechRecognition };
  }
}

interface VoiceInputScreenProps {
  onBack: () => void;
  onSubmit: (transcript: string) => void;
}

const VoiceInputScreen: React.FC<VoiceInputScreenProps> = ({ onBack, onSubmit }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { t, langCode } = useLanguage();
  
  useReadAloud(t('speakNowPrompt'));

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = langCode;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error('Speech recognition error:', event.error);

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [langCode]);

  const handleStop = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };
  
  const handleSubmit = () => {
    handleStop();
    if(transcript.trim()){
        onSubmit(transcript.trim());
    }
  }

  return (
    <div className="h-full flex flex-col p-4 bg-[#0B2C3D] text-white justify-between">
      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
        <div className={`relative flex items-center justify-center w-32 h-32 rounded-full bg-teal-500/20 ${isListening ? 'animate-pulse' : ''}`}>
          <MicrophoneIcon className="w-16 h-16 text-teal-400" />
        </div>
        <h1 className="text-2xl font-bold">{isListening ? t('listening') : t('finishedListening')}</h1>
        <p className="text-gray-300 min-h-[6em] w-full max-w-md p-2 border border-white/10 rounded-lg bg-white/5">
          {transcript || t('speakNowPrompt')}
        </p>
      </div>

      <div className="flex-shrink-0 flex items-center space-x-4 pb-4">
        <button
          onClick={onBack}
          className="w-1/2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {t('cancel')}
        </button>
        <button
          onClick={handleSubmit}
          disabled={!transcript.trim()}
          className="w-1/2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {t('getGuidance')}
        </button>
      </div>
    </div>
  );
};

export default VoiceInputScreen;