import { ChangeEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { messageError } from "utils/constants";

export interface ITextInputProps {
  name: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<any>) => void;
  value: string;
  placeholder: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

const TextInput = ({
  name = "",
  onChange,
  value,
  disabled = false,
  type = "text",
  placeholder = "",
  className = "",
  error = false,
  errorMessage = messageError,
}: ITextInputProps) => {
  const { t } = useTranslation();
  const ref: any = useRef();
  const [active, setActive] = useState(false);
  const onClick = () => {
    ref.current.focus();
    setActive(true);
  };
  const onBlur = () => {
    if (!value) setActive(false);
  };

  return (
    <div className={className + " my-4"}>
      <div className={"relative w-full mb-1"}>
        <input
          name={name}
          onClick={onClick}
          onBlur={onBlur}
          ref={ref}
          type={type}
          disabled={disabled}
          onChange={onChange}
          value={value}
          className="border-0 border-b w-full bottom-0"
        />
        <h3
          onClick={onClick}
          className="absolute bottom-2 text-gray-500 transition-all duration-300"
          style={{
            transform: `translateY(${active ? -24 : 0}px)`,
            color: active ? "#2196f3" : "",
          }}
        >
          {t(placeholder)}
        </h3>
      </div>
      <h5
        style={{ opacity: error ? 1 : 0 }}
        className="text-[#F31A1A] h-5 text-[10px]"
      >
        {t(errorMessage)}
      </h5>
    </div>
  );
};

export default TextInput;
