
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, StethoscopeIcon, XIcon, MicrophoneIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useReadAloud } from '../hooks/useReadAloud';

// Add type definitions for the Web Speech API
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

interface SymptomCheckerScreenProps {
  onBack: () => void;
  onSubmit: (symptoms: string[]) => void;
}

const SymptomCheckerScreen: React.FC<SymptomCheckerScreenProps> = ({ onBack, onSubmit }) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [isTipVisible, setIsTipVisible] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechApiSupported, setIsSpeechApiSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { t, langCode } = useLanguage();
  
  useReadAloud(`${t('listSymptomsTitle')}. ${t('listSymptomsPrompt')}`);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      console.warn("Speech recognition not supported in this browser.");
      setIsSpeechApiSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = langCode;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error('Speech recognition error:', event.error);

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      setCurrentSymptom(finalTranscript + interimTranscript);

      if (finalTranscript) {
        const newSymptom = finalTranscript.trim();
        if (newSymptom) {
            setSymptoms(prev => {
                const lowerCasePrev = prev.map(s => s.toLowerCase());
                if (lowerCasePrev.includes(newSymptom.toLowerCase())) return prev;
                return [...prev, newSymptom];
            });
        }
        setCurrentSymptom('');
      }
    };
    
    recognitionRef.current = recognition;

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };
  }, [langCode]);
  
  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleAddSymptom = () => {
    const trimmedSymptom = currentSymptom.trim();
    if (trimmedSymptom && !symptoms.map(s=>s.toLowerCase()).includes(trimmedSymptom.toLowerCase())) {
      setSymptoms([...symptoms, trimmedSymptom]);
      setCurrentSymptom('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSymptom();
    }
  };

  const handleRemoveSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };
  
  const handleSubmit = () => {
    if(symptoms.length > 0) {
        onSubmit(symptoms);
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#0B2C3D] text-white">
      <header className="flex-shrink-0 flex items-center p-4 border-b border-white/10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold ml-4">{t('symptomChecker')}</h2>
      </header>

      <div className="flex-grow flex flex-col p-5 space-y-6 overflow-y-auto">
        <div className="flex items-start space-x-3 text-teal-400">
            <StethoscopeIcon className="w-6 h-6 flex-shrink-0 mt-1"/>
            <div>
                <h3 className="font-semibold text-white">{t('listSymptomsTitle')}</h3>
                <p className="text-xs text-gray-400">{t('listSymptomsPrompt')}</p>
            </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex flex-wrap gap-2 min-h-[4rem]">
                {symptoms.map((symptom) => (
                    <span key={symptom} className="flex items-center bg-teal-500/30 text-teal-200 text-sm font-medium px-3 py-1 rounded-full">
                        {symptom}
                        <button onClick={() => handleRemoveSymptom(symptom)} className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-white/20">
                            <XIcon className="w-3 h-3"/>
                        </button>
                    </span>
                ))}
            </div>
        </div>

        <div>
            <div className="relative w-full">
                <input
                    type="text"
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? t('listening') : t('symptomInputPlaceholder')}
                    className="w-full bg-white/5 border border-white/20 rounded-md pl-4 pr-12 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder-gray-500 disabled:opacity-70"
                    disabled={isListening}
                />
                <button
                    onClick={handleToggleListening}
                    disabled={!isSpeechApiSupported}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-teal-500/50 text-teal-200 hover:bg-teal-500/80'}`}
                    aria-label={isListening ? t('stopListening') : t('startVoiceInput')}
                    title={isSpeechApiSupported ? t('startVoiceInput') : t('voiceInputNotSupported')}
                >
                    <MicrophoneIcon className="w-5 h-5"/>
                </button>
            </div>
             {isTipVisible && (
                <div className="flex items-start justify-between bg-white/10 p-3 rounded-lg text-xs mt-3">
                    <p className="text-gray-400 pr-2">
                        <span className="font-semibold text-gray-300">{t('symptomExamples')}</span> {t('symptomExampleList')}
                    </p>
                    <button 
                        onClick={() => setIsTipVisible(false)} 
                        className="p-1 -mr-1 -mt-1 rounded-full hover:bg-white/20 flex-shrink-0"
                        aria-label={t('dismissTip')}
                    >
                        <XIcon className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            )}
        </div>
      </div>

      <div className="flex-shrink-0 p-4 border-t border-white/10">
        <button
          onClick={handleSubmit}
          disabled={symptoms.length === 0}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {t('getAnalysis')}
        </button>
      </div>
    </div>
  );
};

export default SymptomCheckerScreen;