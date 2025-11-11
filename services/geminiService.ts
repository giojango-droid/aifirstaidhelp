
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Guidance, SymptomAnalysis } from '../types';
import { getOfflineGuidance } from './offlineData';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set in environment variables. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = "gemini-2.5-pro";

const guidanceSchema = {
  type: Type.OBJECT,
  properties: {
    situation: { 
      type: Type.STRING, 
      description: "A brief, one-sentence summary of the medical situation."
    },
    immediateAssessment: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Bulleted list of step-by-step initial assessment actions."
    },
    criticalSymptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Bulleted list of key symptoms to monitor closely."
    },
    firstAidMeasures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Bulleted list of first aid steps to take."
    },
    seekMedicalAssistance: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Bulleted list of conditions or triggers for when to seek professional medical help (e.g., calling emergency services, visiting a doctor or hospital)."
    },
    disclaimer: {
      type: Type.STRING,
      description: "A standard safety disclaimer."
    }
  },
  required: ['situation', 'immediateAssessment', 'criticalSymptoms', 'firstAidMeasures', 'seekMedicalAssistance', 'disclaimer']
};

const symptomAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        potentialConditions: {
            type: Type.ARRAY,
            description: "A list of potential medical conditions related to the provided symptoms.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the potential condition." },
                    description: { type: Type.STRING, description: "A brief, simple explanation of the condition." },
                    severity: { type: Type.STRING, enum: ['High', 'Medium', 'Low'], description: "An assessment of the potential urgency or severity. High indicates a life-threatening emergency." }
                },
                required: ['name', 'description', 'severity']
            }
        },
        firstAidGuidance: {
            type: Type.OBJECT,
            properties: {
                immediateAssessment: { type: Type.ARRAY, items: { type: Type.STRING }, description: "General immediate assessment steps based on the symptoms." },
                criticalSymptoms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical symptoms to watch for that require immediate escalation." },
                firstAidMeasures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Step-by-step first aid guidance relevant to the set of symptoms." },
                seekMedicalAssistance: { type: Type.ARRAY, items: { type: Type.STRING }, description: "When to call emergency services." }
            },
            required: ['immediateAssessment', 'criticalSymptoms', 'firstAidMeasures', 'seekMedicalAssistance']
        },
        overallDisclaimer: {
            type: Type.STRING,
            description: "A comprehensive disclaimer stating this is not a diagnosis and a medical professional must be consulted."
        }
    },
    required: ['potentialConditions', 'firstAidGuidance', 'overallDisclaimer']
};

const getGuidanceFromApi = async (prompt: string, lang: string): Promise<Guidance> => {
  const guidanceSystemInstruction = `You are an AI Medical Assistant designed for general public use. 
Your purpose is to provide clear, concise, and step-by-step guidance for common medical situations. 
Your advice must be based on standard first-aid protocols. 
Prioritize immediate actions and clear, unambiguous instructions. 
You must not provide a definitive diagnosis. 
Always conclude with a disclaimer advising that the guidance is not a substitute for professional medical advice and to contact emergency services (like 911, 112, etc.) for serious conditions.
Respond ONLY in the provided JSON format, with all string values translated to the language with code "${lang}".`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Generate guidance for the following situation: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: guidanceSchema,
        systemInstruction: guidanceSystemInstruction,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    const guidance = JSON.parse(jsonString) as Omit<Guidance, 'source'>;
    return { ...guidance, source: 'API' };
  } catch (error) {
    console.error("Error fetching medical guidance:", error);
    throw new Error("Failed to get guidance from AI. Please check your connection and API key.");
  }
};

export const getGuidance = async (prompt: string, isOnline: boolean, lang: string): Promise<Guidance> => {
  if (isOnline) {
    return getGuidanceFromApi(prompt, lang);
  } else {
    const langKey = lang.split('-')[0];
    const offlineResult = getOfflineGuidance(prompt, langKey);
    if (offlineResult) {
      // Simulate network delay for better UX
      return new Promise(resolve => setTimeout(() => resolve(offlineResult), 500));
    } else {
      throw new Error("You are offline. Only common emergencies are available. Please connect to the internet for AI assistance.");
    }
  }
};

export const getSymptomAnalysis = async (symptoms: string[], lang: string): Promise<SymptomAnalysis> => {
    const symptomAnalysisSystemInstruction = `You are an expert AI medical symptom analyst. 
Given a list of symptoms, your task is to provide a list of potential related conditions, ordered from most likely/severe to least. 
For each condition, provide a brief description and a severity rating (High, Medium, Low). 'High' severity should be reserved for life-threatening emergencies requiring immediate action.
Also, provide a consolidated, step-by-step first aid plan that is generally applicable to the combination of symptoms provided.
Crucially, you must include a strong disclaimer that this is NOT a medical diagnosis and a healthcare professional must be consulted for proper evaluation.
Respond ONLY in the provided JSON format, with all string values translated to the language with code "${lang}".`;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: `Analyze the following symptoms: ${symptoms.join(', ')}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: symptomAnalysisSchema,
                systemInstruction: symptomAnalysisSystemInstruction,
                temperature: 0.3,
            }
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as SymptomAnalysis;
    } catch (error) {
        console.error("Error fetching symptom analysis:", error);
        throw new Error("Failed to get symptom analysis from AI. Please check your connection.");
    }
};

export const getTextToSpeech = async (text: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Read calmly and clearly: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, // A calm, clear female voice
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data received from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error fetching text-to-speech data:", error);
        throw new Error("Failed to generate audio from text. Please check your connection.");
    }
};