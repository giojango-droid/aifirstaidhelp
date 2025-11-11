export interface Guidance {
  situation: string;
  immediateAssessment: string[];
  criticalSymptoms: string[];
  firstAidMeasures: string[];
  seekMedicalAssistance: string[];
  disclaimer: string;
  source: 'API' | 'OFFLINE';
}

export interface SymptomAnalysis {
  potentialConditions: {
    name: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
  }[];
  firstAidGuidance: Omit<Guidance, 'situation' | 'source' | 'disclaimer'>;
  overallDisclaimer: string;
}


export type Screen = 'HOME' | 'VOICE' | 'RESULTS' | 'SYMPTOM_CHECKER' | 'EMERGENCY_NUMBERS';