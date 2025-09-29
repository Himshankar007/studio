import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-10 px-6 text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                    M360
                </div>
                <h4 className="font-semibold text-gray-800 text-lg">
                    {t('title')}
                </h4>
            </div>
            <p className="text-gray-600 text-sm mt-3 max-w-2xl mx-auto">
                {t('description')}
            </p>
            <div className="mt-6 text-xs text-gray-500 flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span>© {currentYear} {t('copyright')}</span>
                <span className="hidden sm:inline">•</span>
                <span>{t('initiative')}</span>
                 <span className="hidden sm:inline">•</span>
                <span>{t('reverence')}</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
