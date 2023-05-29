import { useTranslation } from "react-i18next";
import { messageError } from "utils/constants";
import { ChangeEvent } from "react";
import useLocales from "hooks/useLocales";

interface ISelectInputProps {
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  title: string;
  options: any[];
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  name: string;
}

const SelectInput = ({
  onChange,
  value,
  title,
  options,
  placeholder,
  error = false,
  errorMessage = messageError,
  name,
}: ISelectInputProps) => {
  const { t } = useTranslation();
  const { currentLang } = useLocales();
  const isEn = currentLang.value === "en";
  console.log(options);
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-main dark:text-white"
      >
        {t(title)}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-main text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled value="">
          {t(placeholder)}
        </option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.keyMap}>
              {t(isEn ? option.valueEn : option.valueVi)}
            </option>
          );
        })}
      </select>
      <h5
        style={{ opacity: error ? 1 : 0 }}
        className="text-[#F31A1A] h-5 text-[10px] mt-2"
      >
        {t(errorMessage)}
      </h5>
    </div>
  );
};

export default SelectInput;
