import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { ChevronLeftIcon, ArrowDownOnSquareIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface PwaInstallScreenProps {
  onBack: () => void;
}

const PwaInstallScreen: React.FC<PwaInstallScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    // This ensures window.location is only accessed on the client side
    setAppUrl(window.location.href);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0B2C3D] text-white">
      <header className="flex-shrink-0 flex items-center p-4 border-b border-white/10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold ml-4">{t('installApp')}</h2>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center p-5 space-y-6 text-center overflow-y-auto">
        <h3 className="text-xl font-bold">{t('scanToOpen')}</h3>
        <div className="w-52 h-52 p-4 bg-white rounded-lg">
          {appUrl ? (
            <QRCode
              value={appUrl}
              size={192}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"Q"}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          ) : (
             <div className="w-full h-full bg-gray-200 animate-pulse rounded-md"></div>
          )}
        </div>
        <p className="text-gray-400 max-w-sm">{t('scanInstructions')}</p>

        <div className="w-full max-w-sm pt-4">
            <div className="flex items-start space-x-4 text-left">
                <div className="bg-teal-500/20 text-teal-300 p-3 rounded-full">
                    <ArrowDownOnSquareIcon className="w-6 h-6"/>
                </div>
                <div>
                    <h4 className="font-bold text-white">{t('installTitle')}</h4>
                    <p className="text-sm text-gray-400">{t('installDescription')}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallScreen;