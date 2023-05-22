import i18n from 'i18n';
import { useTranslation } from 'react-i18next';

export const LANGS = [
  {
    label: 'ENG',
    value: 'en',
  },
  {
    label: 'VN',
    value: 'vi',
  }
];

export default function useLocales() {
  const { t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS
  };
}
