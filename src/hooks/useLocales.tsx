import i18n from "i18n";
import { useTranslation } from "react-i18next";
import { getStateStorage } from "utils/localStorage";
import { ViIcon, EnIcon } from "assets/icons";

export const LANGS = [
  {
    label: "ENG",
    value: "en",
    icon: <EnIcon />,
  },
  {
    label: "VN",
    value: "vi",
    icon: <ViIcon />,
  },
];

export default function useLocales() {
  const { t: translate } = useTranslation();
  const langStorage = getStateStorage("i18nextLng");
  const currentLang =
    LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
