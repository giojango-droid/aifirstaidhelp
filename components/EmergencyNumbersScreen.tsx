
import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, SearchIcon, PhoneIcon, ShieldIcon, FireIcon, MedicalCrossIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { emergencyNumbers } from '../data/emergencyNumbers';

interface EmergencyNumbersScreenProps {
  onBack: () => void;
}

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const NumberCard: React.FC<{ label: string; number: string | null; icon: React.ReactNode }> = ({ label, number, icon }) => {
    if (!number) return null;
    return (
        <a href={`tel:${number}`} className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
            {icon}
            <div>
                <div className="text-xs text-gray-300">{label}</div>
                <div className="text-lg font-bold text-white">{number}</div>
            </div>
        </a>
    );
};


const EmergencyNumbersScreen: React.FC<EmergencyNumbersScreenProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return emergencyNumbers;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return emergencyNumbers.filter(country =>
      t(country.countryKey).toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, t]);

  return (
    <div className="h-full flex flex-col bg-[#0B2C3D] text-white">
      <header className="flex-shrink-0 flex items-center p-4 border-b border-white/10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold ml-4">{t('emergencyNumbers')}</h2>
      </header>

      <div className="flex-shrink-0 p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchCountry')}
            className="w-full bg-white/5 border border-white/20 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex-grow p-4 pt-0 overflow-y-auto">
        <ul className="space-y-4">
          {filteredCountries.map(country => (
            <li key={country.iso} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <span className="text-2xl mr-3">{getFlagEmoji(country.iso)}</span>
                {t(country.countryKey)}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <NumberCard label={t('dispatch')} number={country.dispatch} icon={<PhoneIcon className="w-6 h-6 text-teal-400" />} />
                <NumberCard label={t('police')} number={country.police} icon={<ShieldIcon className="w-6 h-6 text-teal-400" />} />
                <NumberCard label={t('ambulance')} number={country.ambulance} icon={<MedicalCrossIcon className="w-6 h-6 text-teal-400" />} />
                <NumberCard label={t('fire')} number={country.fire} icon={<FireIcon className="w-6 h-6 text-teal-400" />} />
              </div>
            </li>
          ))}
           {filteredCountries.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    <p>{t('noResultsFound')}</p>
                </div>
            )}
        </ul>
      </div>
    </div>
  );
};

export default EmergencyNumbersScreen;