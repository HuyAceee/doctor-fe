import Loading from "components/Loading";
import { useTranslation } from "react-i18next";
import { EButtonType } from "types/globalsType";
import { linearGradient } from "utils/constants";

interface IButtonProps {
  title: string;
  type?: EButtonType;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const style = (type: EButtonType) => {
  switch (type) {
    case EButtonType.CONTAINED:
      return "text-white " + linearGradient;
    case EButtonType.OUTLINE:
      return "border-2 border-main text-main";
    default:
      return "";
  }
};
const Button = ({
  title,
  type = EButtonType.CONTAINED,
  onClick,
  className = "",
  disabled = false,
  loading = false,
}: IButtonProps) => {
  const classType = style(type);
  const { t } = useTranslation();
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || loading}
      className={
        "h-10 px-5 rounded-[20px] disabled:opacity-60 min-w-[200px] md:min-w-0 uppercase flex items-center justify-center " +
        classType +
        " " +
        className
      }
    >
      {loading ? <Loading /> : <span>{t(title)}</span>}
    </button>
  );
};

export default Button;
