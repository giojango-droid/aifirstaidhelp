import React, { useState, useCallback, useEffect } from 'react';
import { Guidance, Screen, SymptomAnalysis } from './types';
import { getGuidance, getSymptomAnalysis } from './services/geminiService';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

import HomeScreen from './components/HomeScreen';
import VoiceInputScreen from './components/VoiceInputScreen';
import ResultsScreen from './components/ResultsScreen';
import SymptomCheckerScreen from './components/SymptomCheckerScreen';
import EmergencyNumbersScreen from './components/EmergencyNumbersScreen';

// Type for the browser's beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}


const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [query, setQuery] = useState('');
  const [guidance, setGuidance] = useState<Guidance | null>(null);
  const [symptomAnalysis, setSymptomAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useNetworkStatus();
  const { langCode, t, stopReadingAloud } = useLanguage();

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);


  useEffect(() => {
    // Check display mode and platform on component mount
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    // A simple check for iOS devices.
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setCanInstall(false);
      setInstallPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(() => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
  }, [installPrompt]);
  
  const showInstallButton = canInstall && !isStandalone;
  const showIosInstructions = isIos && !canInstall && !isStandalone;

  const fetchGuidance = useCallback(async (prompt: string) => {
    stopReadingAloud();
    setQuery(prompt);
    setCurrentScreen('RESULTS');
    setIsLoading(true);
    setError(null);
    setGuidance(null);
    setSymptomAnalysis(null);

    try {
      const result = await getGuidance(prompt, isOnline, langCode);
      setGuidance(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('unknownError');
      if (errorMessage.includes("offline")) {
          setError(t('offlineError'));
      } else if (errorMessage.includes("AI")) {
          setError(t('geminiError'));
      } else {
          setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isOnline, langCode, t, stopReadingAloud]);
  
  const fetchSymptomAnalysis = useCallback(async (symptoms: string[]) => {
    stopReadingAloud();
    setQuery(symptoms.join(', '));
    setCurrentScreen('RESULTS');
    setIsLoading(true);
    setError(null);
    setGuidance(null);
    setSymptomAnalysis(null);

    try {
      const result = await getSymptomAnalysis(symptoms, langCode);
      setSymptomAnalysis(result);
    } catch (err) {
       const errorMessage = err instanceof Error ? err.message : t('unknownError');
       setError(t('symptomError'));
    } finally {
      setIsLoading(false);
    }
  }, [langCode, t, stopReadingAloud]);

  const handleGoBack = () => {
    stopReadingAloud();
    setCurrentScreen('HOME');
    setQuery('');
    setGuidance(null);
    setSymptomAnalysis(null);
    setError(null);
  };
  
  const handleVoiceSubmit = () => {
    stopReadingAloud();
    setCurrentScreen('VOICE');
  }
  
  const handleSymptomCheckerSelect = () => {
    stopReadingAloud();
    setCurrentScreen('SYMPTOM_CHECKER');
  }
  
  const handleEmergencyNumbersSelect = () => {
    stopReadingAloud();
    setCurrentScreen('EMERGENCY_NUMBERS');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return (
          <HomeScreen
            isOnline={isOnline}
            onTextSubmit={fetchGuidance}
            onVoiceSubmit={handleVoiceSubmit}
            onCommonEmergencySelect={fetchGuidance}
            onSymptomCheckerSelect={handleSymptomCheckerSelect}
            onEmergencyNumbersSelect={handleEmergencyNumbersSelect}
            showInstallButton={showInstallButton}
            showIosInstructions={showIosInstructions}
            onPwaInstall={promptInstall}
          />
        );
      case 'VOICE':
        return <VoiceInputScreen onBack={handleGoBack} onSubmit={fetchGuidance} />;
      case 'SYMPTOM_CHECKER':
        return <SymptomCheckerScreen onBack={handleGoBack} onSubmit={fetchSymptomAnalysis} />;
      case 'EMERGENCY_NUMBERS':
        return <EmergencyNumbersScreen onBack={handleGoBack} />;
      case 'RESULTS':
        return (
          <ResultsScreen
            query={query}
            guidance={guidance}
            symptomAnalysis={symptomAnalysis}
            isLoading={isLoading}
            error={error}
            onBack={handleGoBack}
          />
        );
      default:
        return <HomeScreen isOnline={isOnline} onTextSubmit={fetchGuidance} onVoiceSubmit={handleVoiceSubmit} onCommonEmergencySelect={fetchGuidance} onSymptomCheckerSelect={handleSymptomCheckerSelect} onEmergencyNumbersSelect={handleEmergencyNumbersSelect} showInstallButton={showInstallButton} showIosInstructions={showIosInstructions} onPwaInstall={promptInstall} />;
    }
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gray-900 font-sans p-2 sm:p-4">
      <div className="w-full h-full max-w-md sm:max-h-[820px] bg-black rounded-[40px] border-8 border-gray-700 shadow-2xl overflow-hidden relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10"></div>
        {renderScreen()}
      </div>
    </main>
  );
};


const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;