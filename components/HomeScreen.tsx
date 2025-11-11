import React, { useState } from 'react';
import { 
  MedicalCrossIcon, HeartIcon, MicrophoneIcon, SearchIcon, WifiIcon, WifiOffIcon,
  SyringeIcon, FaintingIcon, BloodDropIcon, SeizureIcon, BandageIcon, StethoscopeIcon, PhoneIcon,
  SpeakerWaveIcon, SpeakerXMarkIcon, ArrowDownOnSquareIcon
} from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../locales';
import { useReadAloud } from '../hooks/useReadAloud';

interface HomeScreenProps {
  isOnline: boolean;
  onTextSubmit: (text: string) => void;
  onVoiceSubmit: () => void;
  onCommonEmergencySelect: (text: string) => void;
  onSymptomCheckerSelect: () => void;
  onEmergencyNumbersSelect: () => void;
  showInstallButton: boolean;
  showIosInstructions: boolean;
  onPwaInstall: () => void;
}

const commonEmergencies = [
  { textKey: "chestPain", icon: HeartIcon, queryKey: "chestPainQuery" },
  { textKey: "allergicReaction", icon: SyringeIcon, queryKey: "allergicReactionQuery" },
  { textKey: "fainting", icon: FaintingIcon, queryKey: "faintingQuery" },
  { textKey: "diabeticEmergency", icon: BloodDropIcon, queryKey: "diabeticEmergencyQuery" },
  { textKey: "seizure", icon: SeizureIcon, queryKey: "seizureQuery" },
  { textKey: "heavyBleeding", icon: BandageIcon, queryKey: "heavyBleedingQuery" },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ isOnline, onTextSubmit, onVoiceSubmit, onCommonEmergencySelect, onSymptomCheckerSelect, onEmergencyNumbersSelect, showInstallButton, showIosInstructions, onPwaInstall }) => {
  const [text, setText] = useState('');
  const { language, setLanguage, t, isReadAloudEnabled, toggleReadAloud } = useLanguage();

  const promptToRead = `${t('describeSituation')}. ${isOnline ? t('textInputPrompt') : t('textInputOffline')}`;
  useReadAloud(promptToRead);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && isOnline) {
      onTextSubmit(text.trim());
    }
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 bg-[#0B2C3D] text-white overflow-y-auto">
      {/* Header */}
      <header className="flex items-start justify-between pt-4">
        <div className="flex-1"></div> {/* Spacer */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-red-600 p-3 rounded-xl">
            <MedicalCrossIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">{t('medicalAssistant')}</h1>
          <p className="text-sm text-gray-300">{t('aiFirstAidGuide')}</p>
        </div>
        <div className="flex-1 flex justify-end items-start space-x-2">
            <button
              onClick={toggleReadAloud}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label={isReadAloudEnabled ? t('disableReadAloud') : t('enableReadAloud')}
              title={isReadAloudEnabled ? t('disableReadAloud') : t('enableReadAloud')}
            >
              {isReadAloudEnabled 
                ? <SpeakerWaveIcon className="w-4 h-4 text-teal-300" /> 
                : <SpeakerXMarkIcon className="w-4 h-4 text-gray-400" />}
            </button>
           <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as keyof typeof languages)}
              className="bg-white/10 text-white text-xs rounded-md py-1 pl-2 pr-6 border border-white/20 focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none"
              aria-label="Select language"
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key} className="bg-gray-800">{value.name}</option>
              ))}
            </select>
        </div>
      </header>

      <div className="text-center">
         {isOnline ? (
          <div className="bg-teal-500/20 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center space-x-2">
            <WifiIcon className="w-3 h-3"/>
            <span>{t('onlineAIAssistance')}</span>
          </div>
        ) : (
          <div className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center space-x-2">
            <WifiOffIcon className="w-3 h-3"/>
            <span>{t('offlineMode')}</span>
          </div>
        )}
      </div>

      {/* Text Input */}
      <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4">
        <div className="flex items-start space-x-3">
            <HeartIcon className="w-5 h-5 text-teal-400 mt-1" />
            <div>
                <h2 className="font-semibold">{t('describeSituation')}</h2>
                <p className="text-xs text-gray-400">
                  {isOnline ? t('textInputPrompt') : t('textInputOffline')}
                </p>
            </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isOnline ? t('textInputPlaceholder') : t('textInputPlaceholderOffline')}
              rows={3}
              className="w-full bg-white/5 border border-white/20 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder-gray-500 disabled:opacity-50"
              disabled={!isOnline}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
            disabled={!text.trim() || !isOnline}
          >
            {t('getMedicalGuidance')}
          </button>
        </form>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Voice Input */}
        <button 
          onClick={onVoiceSubmit} 
          className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center space-x-3 hover:bg-white/10 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          disabled={!isOnline}
        >
          <div className="bg-teal-500 p-2 rounded-full">
              <MicrophoneIcon className="w-5 h-5 text-white"/>
          </div>
          <div>
              <h2 className="font-semibold text-sm">{t('voiceInput')}</h2>
              <p className="text-xs text-gray-400">{t('speakFreely')}</p>
          </div>
        </button>

        {/* Symptom Checker */}
        <button 
          onClick={onSymptomCheckerSelect}
          className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center space-x-3 hover:bg-white/10 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          disabled={!isOnline}
        >
          <div className="bg-teal-500 p-2 rounded-full">
              <StethoscopeIcon className="w-5 h-5 text-white"/>
          </div>
          <div>
              <h2 className="font-semibold text-sm">{t('symptomChecker')}</h2>
              <p className="text-xs text-gray-400">{t('listSymptoms')}</p>
          </div>
        </button>
        
        {/* Emergency Numbers */}
        <button 
          onClick={onEmergencyNumbersSelect}
          className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center space-x-3 hover:bg-white/10 transition-colors text-left"
        >
          <div className="bg-red-500 p-2 rounded-full">
              <PhoneIcon className="w-5 h-5 text-white"/>
          </div>
          <div>
              <h2 className="font-semibold text-sm">{t('emergencyNumbers')}</h2>
              <p className="text-xs text-gray-400">{t('globalContactList')}</p>
          </div>
        </button>
        
        {/* Install App Button */}
        {showInstallButton && (
          <button 
            onClick={onPwaInstall}
            className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center space-x-3 hover:bg-white/10 transition-colors text-left"
          >
            <div className="bg-teal-500 p-2 rounded-full">
                <ArrowDownOnSquareIcon className="w-5 h-5 text-white"/>
            </div>
            <div>
                <h2 className="font-semibold text-sm">{t('installApp')}</h2>
                <p className="text-xs text-gray-400">{t('addToHomeScreen')}</p>
            </div>
          </button>
        )}
        
        {/* iOS Install Instructions */}
        {showIosInstructions && (
             <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center space-x-3 text-left">
                <div className="bg-teal-500 p-2 rounded-full flex-shrink-0">
                    <ArrowDownOnSquareIcon className="w-5 h-5 text-white"/>
                </div>
                <div>
                    <h2 className="font-semibold text-sm">{t('installApp')}</h2>
                    <p className="text-xs text-gray-400">{t('iosInstallPrompt')}</p>
                </div>
            </div>
        )}
      </div>


      {/* Common Emergencies */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold text-gray-300 px-1">{t('commonEmergencies')}</h3>
        <div className="grid grid-cols-3 gap-3">
          {commonEmergencies.map((emergency) => {
            const Icon = emergency.icon;
            return (
              <button
                key={emergency.textKey}
                onClick={() => onCommonEmergencySelect(t(emergency.queryKey))}
                className="bg-white/5 hover:bg-white/10 text-white/80 text-xs text-center font-medium p-3 rounded-lg transition-colors flex flex-col items-center justify-center space-y-2 aspect-square"
              >
                <Icon className="w-7 h-7 text-teal-400" />
                <span className="leading-tight">{t(emergency.textKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;