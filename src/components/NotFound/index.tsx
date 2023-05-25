import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const code = "404";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-3xl text-blue-600 lg:text-6xl">
            {code}
          </h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">{t("oops")}!</span>
            {t("page_not_found")}
          </h6>

          <p className="mb-4 text-center text-gray-500 md:text-lg">
            {t("page_not_found_description")}
          </p>
          {t("go_home")}
          <Link
            to="/"
            className="px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700"
          ></Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
