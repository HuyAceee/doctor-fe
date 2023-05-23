import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface ITextInputProps {
  type?: string;
  disabled?: boolean;
  onChange: () => void;
  value: string;
  placeholder: string;
}

const TextInput = ({
  onChange,
  value,
  disabled = false,
  type = "text",
  placeholder = "",
}: ITextInputProps) => {
  const { t } = useTranslation();
  const ref: any = useRef();
  const [active, setActive] = useState(false);
  const onClick = () => {
    ref.current.focus();
    setActive(true);
  };
  const onBlur = (e: any) => {
    setActive(false);
  };
  return (
    <div className="relative w-full h-14">
      <input
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
          color: active ? "blue" : "",
        }}
      >
        {t(placeholder)}
      </h3>
    </div>
  );
};

export default TextInput;
