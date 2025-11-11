
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * A hook that reads a given text aloud when the component mounts,
 * if the global 'read aloud' setting is enabled.
 * @param text The text to be read.
 */
export const useReadAloud = (text: string) => {
  const { readAloud, isReadAloudEnabled } = useLanguage();

  useEffect(() => {
    if (isReadAloudEnabled) {
      // Use a small delay to allow screen transitions to complete before speaking.
      const timer = setTimeout(() => {
        readAloud(text);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [text, isReadAloudEnabled, readAloud]);
};