
import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useRef, useEffect } from 'react';
import { translations, languages } from '../locales';
import { getTextToSpeech } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audio';

export type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  langCode: string;
  isReadAloudEnabled: boolean;
  toggleReadAloud: () => void;
  readAloud: (text: string) => void;
  stopReadingAloud: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isReadAloudEnabled, setIsReadAloudEnabled] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    } catch (e) {
        console.error("Web Audio API is not supported in this browser.", e);
    }
    
    return () => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(console.error);
        }
    };
  }, []);
  
  const stopReadingAloud = useCallback(() => {
    if (audioSourceRef.current) {
        try {
            audioSourceRef.current.stop();
        } catch (e) {
            console.warn("Audio source could not be stopped:", e);
        }
        audioSourceRef.current = null;
    }
  }, []);

  const readAloud = useCallback(async (text: string) => {
    if (!isReadAloudEnabled || !text) return;
    
    stopReadingAloud(); 

    const audioContext = audioContextRef.current;
    if (!audioContext) {
        console.error("AudioContext not available.");
        return;
    }

    try {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        const base64Audio = await getTextToSpeech(text);
        const audioData = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioData, audioContext, 24000, 1);
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        
        source.onended = () => {
            if (audioSourceRef.current === source) {
              audioSourceRef.current = null;
            }
        };
        audioSourceRef.current = source;
    } catch (err) {
        console.error("Failed to read aloud:", err);
    }
  }, [isReadAloudEnabled, stopReadingAloud]);

  const toggleReadAloud = useCallback(() => {
    setIsReadAloudEnabled(prev => {
        const newState = !prev;
        if (!newState) {
            stopReadingAloud();
        }
        return newState;
    });
  }, [stopReadingAloud]);

  const t = useMemo(() => (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);
  
  const langCode = useMemo(() => languages[language].code, [language]);

  const value = {
    language,
    setLanguage,
    t,
    langCode,
    isReadAloudEnabled,
    toggleReadAloud,
    readAloud,
    stopReadingAloud,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};