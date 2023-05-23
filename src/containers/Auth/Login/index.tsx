import DropdownLanguage from "components/ChangeLanguage";
import TextInput from "components/TextInput";
import { useTranslation } from "react-i18next";
import { linearGradient } from "utils/constants";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div
      className={`h-screen w-screen flex justify-center items-center ${linearGradient}`}
    >
      <div className="fixed top-8 right-8">
        <DropdownLanguage />
      </div>
      <div className="bg-white h-3/4 w-1/3 rounded-lg shadow-md p-10 flex flex-col items-center justify-center">
        <span className="font-bold text-header2">{t("login.login")}</span>
        <div className="w-full">
          <TextInput
            onChange={() => {}}
            placeholder="login.placeholder_name"
            value=""
          />
          <TextInput
            onChange={() => {}}
            placeholder="login.placeholder_password"
            value=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
