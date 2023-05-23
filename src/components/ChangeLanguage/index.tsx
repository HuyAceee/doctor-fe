import { useState } from "react";
import useLocales, { LANGS } from "hooks/useLocales";

const DropdownLanguage = () => {
  const { onChangeLang, currentLang } = useLocales();
  const [open, setOpen] = useState(false);
  const onMouseOver = (e: any) => {
    setOpen(true);
  };

  const onMouseLeave = (e: any) => {
    setOpen(false);
  };

  const handleChangeLanguage = (value: string) => {
    onChangeLang(value);
    setOpen(false);
  };
  return (
    <div onMouseLeave={onMouseLeave} className="relative cursor-pointer">
      <img
        onMouseOver={onMouseOver}
        alt="language"
        src={require(`assets/icons/login/${currentLang.value}.svg`)}
      />
      {open && (
        <div className="fixed bg-white right-8 rounded-md">
          {LANGS.map((lang, index) => {
            return (
              <div
                key={index}
                onClick={() => handleChangeLanguage(lang.value)}
                className="p-2"
              >
                {lang.icon}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownLanguage;
