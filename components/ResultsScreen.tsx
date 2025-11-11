
import React, { useState, useRef, useEffect } from 'react';
import { Guidance, SymptomAnalysis } from '../types';
import { ChevronLeftIcon, CheckCircleIcon, WifiIcon, WifiOffIcon, SpeakerWaveIcon, SpeakerXMarkIcon, SpinnerIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { getTextToSpeech } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audio';

// Fix: Add a global type definition for `window.webkitAudioContext` to resolve a TypeScript error.
// This ensures compatibility with older Safari browsers that use a vendor-prefixed version of the Web Audio API.
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface ResultsScreenProps {
  query: string;
  guidance: Guidance | null;
  symptomAnalysis: SymptomAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-6 bg-white/10 rounded-md w-3/4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
            <div className="h-4 bg-white/5 rounded-md w-5/6"></div>
        </div>
        <div className="space-y-3">
            <div className="h-4 bg-white/10 rounded-md w-1/3"></div>
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
            <div className="h-4 bg-white/5 rounded-md w-full"></div>
        </div>
         <div className="space-y-3">
            <div className="h-4 bg-white/10 rounded-md w-1/2"></div>
            <div className="h-4 bg-white/5 rounded-md w-5/6"></div>
        </div>
    </div>
);

const GuidanceSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div>
        <h3 className="text-lg font-semibold text-teal-300 mb-2">{title}</h3>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const severityStyles = {
    High: 'bg-red-500/80 border-red-400 text-white',
    Medium: 'bg-yellow-500/80 border-yellow-400 text-white',
    Low: 'bg-green-500/80 border-green-400 text-white',
};

const SymptomAnalysisContent: React.FC<{ analysis: SymptomAnalysis }> = ({ analysis }) => {
    const { t } = useLanguage();
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-teal-300 mb-3">{t('potentialConditions')}</h3>
                <div className="space-y-4">
                    {analysis.potentialConditions.map((condition) => (
                        <div key={condition.name} className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-white">{condition.name}</h4>
                                 <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${severityStyles[condition.severity]}`}>{t(condition.severity)}</span>
                            </div>
                            <p className="text-sm text-gray-400">{condition.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <GuidanceSection title={t('immediateAssessment')} items={analysis.firstAidGuidance.immediateAssessment} />
                <GuidanceSection title={t('criticalSymptomsToMonitor')} items={analysis.firstAidGuidance.criticalSymptoms} />
                <GuidanceSection title={t('firstAidMeasures')} items={analysis.firstAidGuidance.firstAidMeasures} />
                <GuidanceSection title={t('whenToSeekMedicalAssistance')} items={analysis.firstAidGuidance.seekMedicalAssistance} />
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10">
                <h3 className="font-semibold text-amber-400 mb-2">{t('importantDisclaimer')}</h3>
                <p className="text-sm text-gray-400">{analysis.overallDisclaimer}</p>
            </div>
        </div>
    );
};

const StandardGuidanceContent: React.FC<{ guidance: Guidance }> = ({ guidance }) => {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <GuidanceSection title={t('immediateAssessment')} items={guidance.immediateAssessment} />
            <GuidanceSection title={t('criticalSymptomsToMonitor')} items={guidance.criticalSymptoms} />
            <GuidanceSection title={t('firstAidMeasures')} items={guidance.firstAidMeasures} />
            <GuidanceSection title={t('whenToSeekMedicalAssistance')} items={guidance.seekMedicalAssistance} />
            
            <div className="mt-8 pt-4 border-t border-white/10">
                <h3 className="font-semibold text-amber-400 mb-2">{t('importantDisclaimer')}</h3>
                <p className="text-sm text-gray-400">{guidance.disclaimer}</p>
            </div>
        </div>
    );
};


const ResultsScreen: React.FC<ResultsScreenProps> = ({ query, guidance, symptomAnalysis, isLoading, error, onBack }) => {
  const { t } = useLanguage();
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  useEffect(() => {
    if (!audioContextRef.current) {
        try {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
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

  const handleToggleAudio = async () => {
    if (isPlayingAudio) {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
        }
        return;
    }

    if (!guidance && !symptomAnalysis) return;

    setIsGeneratingAudio(true);
    
    try {
      let textToSpeak = '';
      if (guidance) {
        const sections = [
          { title: t('situationQueryTitle'), items: [guidance.situation] },
          { title: t('immediateAssessment'), items: guidance.immediateAssessment },
          { title: t('criticalSymptomsToMonitor'), items: guidance.criticalSymptoms },
          { title: t('firstAidMeasures'), items: guidance.firstAidMeasures },
          { title: t('whenToSeekMedicalAssistance'), items: guidance.seekMedicalAssistance },
          { title: t('importantDisclaimer'), items: [guidance.disclaimer] },
        ];
        textToSpeak = sections.map(sec => `${sec.title}. ${sec.items.join('. ')}`).join('. ');
      } else if (symptomAnalysis) {
        const potentialConditionsText = symptomAnalysis.potentialConditions.map(c => `${c.name}. ${t('severity')}: ${t(c.severity)}. ${c.description}`).join('. ');
        const guidanceSections = [
            { title: t('potentialConditions'), items: [potentialConditionsText] },
            { title: t('immediateAssessment'), items: symptomAnalysis.firstAidGuidance.immediateAssessment },
            { title: t('criticalSymptomsToMonitor'), items: symptomAnalysis.firstAidGuidance.criticalSymptoms },
            { title: t('firstAidMeasures'), items: symptomAnalysis.firstAidGuidance.firstAidMeasures },
            { title: t('whenToSeekMedicalAssistance'), items: symptomAnalysis.firstAidGuidance.seekMedicalAssistance },
            { title: t('importantDisclaimer'), items: [symptomAnalysis.overallDisclaimer] },
        ];
        textToSpeak = guidanceSections.map(sec => `${sec.title}. ${sec.items.join('. ')}`).join('. ');
      }

      const base64Audio = await getTextToSpeech(textToSpeak);
      const audioContext = audioContextRef.current;
      if (!audioContext) throw new Error("AudioContext not available.");

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const audioData = decode(base64Audio);
      const audioBuffer = await decodeAudioData(audioData, audioContext, 24000, 1);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      
      setIsPlayingAudio(true);
      source.onended = () => {
          setIsPlayingAudio(false);
          if (audioSourceRef.current === source) {
            audioSourceRef.current = null;
          }
      };

      audioSourceRef.current = source;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to play audio.";
      // Display error to the user in a non-blocking way
      console.error(errorMessage); 
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const renderAudioButton = () => {
    if (isGeneratingAudio) {
      return <SpinnerIcon className="w-6 h-6 text-white animate-spin" />;
    }
    if (isPlayingAudio) {
      return <SpeakerXMarkIcon className="w-6 h-6" />;
    }
    return <SpeakerWaveIcon className="w-6 h-6" />;
  };

  return (
    <div className="h-full flex flex-col bg-[#0B2C3D] text-white">
      <header className="flex-shrink-0 flex items-center p-4 border-b border-white/10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold ml-4 truncate">{t('medicalGuidance')}</h2>
        <div className="ml-auto">
            <button 
                onClick={handleToggleAudio}
                disabled={isGeneratingAudio || isLoading || (!guidance && !symptomAnalysis)}
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isPlayingAudio ? 'Stop reading' : 'Read guidance aloud'}
            >
                {renderAudioButton()}
            </button>
        </div>
      </header>
      
      <div className="flex-grow p-5 overflow-y-auto">
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1">{symptomAnalysis ? t('symptomsQueryTitle') : t('situationQueryTitle')}</p>
          <p className="font-semibold text-lg text-white italic">"{query}"</p>
        </div>
        
        {guidance && (
            <div className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-2 mb-6 w-fit ${guidance.source === 'API' ? 'bg-teal-500/20 text-teal-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {guidance.source === 'API' ? <WifiIcon className="w-3 h-3"/> : <WifiOffIcon className="w-3 h-3"/>}
                <span>{guidance.source === 'API' ? t('liveAIGuidance') : t('offlineStoredGuidance')}</span>
            </div>
        )}
        
        {symptomAnalysis && (
            <div className="text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-2 mb-6 w-fit bg-teal-500/20 text-teal-300">
                <WifiIcon className="w-3 h-3"/>
                <span>{t('liveAISymptomAnalysis')}</span>
            </div>
        )}

        {isLoading && <LoadingSkeleton />}
        
        {error && (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-lg text-center">
                <h3 className="font-bold mb-2">{t('error')}</h3>
                <p>{error}</p>
            </div>
        )}

        {guidance && <StandardGuidanceContent guidance={guidance} />}
        {symptomAnalysis && <SymptomAnalysisContent analysis={symptomAnalysis} />}
      </div>
    </div>
  );
};

export default ResultsScreen;