import DropdownLanguage from "components/ChangeLanguage";
import TextInput from "components/TextInput";
import { useTranslation } from "react-i18next";
import { linearGradient, messageError } from "utils/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { checkArrayInvalid } from "utils/functions";
import { useState } from "react";
import Button from "components/Button";
import { EButtonType } from "types/globalsType";
import Google from "assets/images/login/google-icon.png";
import Twitter from "assets/images/login/twitter-icon.png";
import Facebook from "assets/images/login/facebook-icon.webp";
import Icon from "components/Icon";

const Login = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(messageError),
      password: Yup.string().required(messageError),
    }),
    onSubmit: async (values) => {
      if (!checkArrayInvalid([values.username, values.password])) {
        setLoading(true);
        try {
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <div
      className={`h-screen w-screen flex justify-center items-center ${linearGradient}`}
    >
      <div className="fixed top-8 right-8">
        <DropdownLanguage />
      </div>
      <div className="bg-white h-4/5 w-1/3 rounded-lg shadow-md p-10 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <span className="font-bold text-header2 mb-3">
            {t("login.login")}
          </span>
          {/* <img
            alt=""
            className="w-1/3"
            src={require("assets/images/login/login-image.webp")}
          /> */}
        </div>

        <div className="w-full">
          <TextInput
            name="username"
            onChange={formik.handleChange}
            placeholder="login.placeholder_name"
            value={formik.values.username}
            error={Boolean(formik.touched.username && formik.errors.username)}
            errorMessage={formik.errors.username}
          />
          <TextInput
            name="password"
            onChange={formik.handleChange}
            placeholder="login.placeholder_password"
            value={formik.values.password}
            type="password"
            error={Boolean(formik.touched.password && formik.errors.password)}
            errorMessage={formik.errors.password}
          />
          <div className="w-full flex justify-end">
            <h3 className="my-3 cursor-pointer">
              {t("login.forgot_password")}
            </h3>
          </div>
          <Button
            title="login.login"
            onClick={formik.handleSubmit}
            className="w-full"
            loading={loading}
          />
        </div>
        <div>
          <h3 className="mb-3 text-center">{t("login.other_login")}</h3>
          <div className="grid grid-cols-3 gap-2">
            <Icon src={Google} />
            <Icon src={Twitter} />
            <Icon src={Facebook} />
          </div>
        </div>
        <div>
          <h3 className="text-center mb-2">{t("login.sign_up_using")}</h3>
          <Button
            title="login.sign_up"
            onClick={formik.handleSubmit}
            className=""
            type={EButtonType.OUTLINE}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
