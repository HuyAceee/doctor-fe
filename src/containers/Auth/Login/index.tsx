/* eslint-disable no-useless-escape */
import DropdownLanguage from "components/ChangeLanguage";
import TextInput from "components/TextInput";
import { useTranslation } from "react-i18next";
import { ROUTES, linearGradient, messageError } from "utils/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { checkArrayInvalid } from "utils/functions";
import { useState } from "react";
import Button from "components/Button";
import Google from "assets/images/login/google-icon.png";
import Twitter from "assets/images/login/twitter-icon.png";
import Facebook from "assets/images/login/facebook-icon.webp";
import Icon from "components/Icon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setToken } from "utils/localStorage";
import { login } from "store/asyncThunk/user";
import { useAppDispatch } from "store/hook";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(messageError),
      password: Yup.string().required(messageError),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "error.password_format"
      // ),
    }),
    onSubmit: async (values) => {
      if (!checkArrayInvalid([values.username, values.password])) {
        setLoading(true);
        try {
          const data = {
            email: values.username,
            password: values.password,
          };
          const response = await dispatch(login(data));
          if (response?.payload) {
            toast.success(t("toast.login_success"));
            setToken("OK");
            navigate(ROUTES.home);
          }
        } catch (err) {
          toast.error(t("toast.login_fail"));
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <div
      className={`min-h-screen w-screen flex justify-center items-center ${linearGradient}`}
    >
      <div className="fixed top-5 right-5">
        <DropdownLanguage />
      </div>
      <div className="bg-white w-[90vw] max-w-[500px] md:w-2/3 xl:w-1/2 rounded-lg shadow-md p-8 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <span className="text-main font-bold text-header2 mb-3">
            {t("login.login")}
          </span>
          {/* <img
            alt=""
            className="w-1/3"
            src={require("assets/images/login/login-image.webp")}
          /> */}
        </div>

        <div className="w-full my-10">
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
          <div className="w-full flex justify-between">
            <h3 className="text-main">{t("login.sign_up")}</h3>
            <h3 className="mb-3 cursor-pointer">
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
      </div>
    </div>
  );
};

export default Login;
