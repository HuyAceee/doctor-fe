import { CancelIcon } from "assets/icons";
import { useOnClickOutside } from "hooks/useClickOutSide";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "utils/constants";

const listMenuAdmin = [
  {
    title: "header.side_bar.home_page",
    path: "/",
  },
  {
    title: "header.side_bar.user",
    path: ROUTES.system.user.index,
  },
  {
    title: "header.side_bar.doctor",
    path: ROUTES.system.doctor.index,
  },
  {
    title: "header.side_bar.medical_examination_plan",
    path: ROUTES.system.doctor.plan.index,
  },
  {
    title: "header.side_bar.create_booking",
    path: ROUTES.booking.new,
  },
  // {
  //   title: "header.side_bar.markdown",
  //   path: ROUTES.system.doctor.index,
  // },
];

// const listMenuDoctor = [
//   {
//     title: "header.side_bar.home_page",
//     path: "/",
//   },
//   {
//     title: "header.side_bar.medical_examination_plan",
//     path: ROUTES.system.doctor.plan.index,
//   },
// ];

// const listMenuPatient = [
//   {
//     title: "header.side_bar.home_page",
//     path: "/",
//   },
//   {
//     title: "header.side_bar.medical_examination_plan",
//     path: ROUTES.system.doctor.plan.index,
//   },
// ];

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const refOutside = useRef<HTMLInputElement>(null);
  useOnClickOutside(refOutside, () => setActive(false));

  useEffect(() => {
    const modalElement = ref.current;
    if (!modalElement) return;
    if (active) {
      document.body.style.overflow = "hidden";
      modalElement.style.transform = `translateX(0%)`;
      modalElement.style.opacity = "1";
    } else {
      document.body.style.overflow = "initial";
      modalElement.style.transform = `translateX(-100%)`;
      modalElement.style.opacity = "0";
    }
  }, [active]);

  return (
    <div className="flex items-center flex-col" ref={refOutside}>
      <div
        onClick={() => setActive(!active)}
        className="relative w-9 h-5 cursor-pointer mt-5"
      >
        {[1, 2, 3].map((_, index) => {
          return (
            <div
              key={index}
              className="h-1 w-9 bg-white rounded-sm absolute transition-all duration-200"
              style={{
                top: index * 8,
              }}
            ></div>
          );
        })}
      </div>
      <div
        className="bg-main z-10 fixed p-5 top-0 left-0 translate-x-[-100%] opacity-0 transition-all duration-500"
        ref={ref}
      >
        <div className="mb-5 flex justify-end">
          <CancelIcon
            className="cursor-pointer"
            onClick={() => setActive(!active)}
            width={20}
            height={20}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-2">
          {listMenuAdmin.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setActive(false);
                }}
                className="border-white rounded-sm border-2 px-4 py-2 cursor-pointer"
              >
                <span className="text-white">{t(item.title)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
