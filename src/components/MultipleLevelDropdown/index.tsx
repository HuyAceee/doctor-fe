/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ArrowIcon,
  BoltIcon,
  CaretIcon,
  ChevronIcon,
  CogIcon,
  MessengerIcon,
} from "assets/icons";
import "./index.css";
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useOnClickOutside } from "hooks/useClickOutSide";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Sidebar from "components/Sidebar";
import DropdownLanguage from "components/ChangeLanguage";
import { useAppSelector } from "store/hook";
import { userSelector } from "store/slices/userSlice";
import { ROUTES } from "utils/constants";
import { deleteStateStorage } from "utils/localStorage";

interface IData {
  icon: JSX.Element;
  children?: JSX.Element;
}

interface INavItemProps {
  icon: JSX.Element;
  children?: JSX.Element;
}

const data: IData[] = [
  // {
  //   icon: <PlusIcon />,
  // },
  // {
  //   icon: <BellIcon />,
  // },
  {
    icon: <MessengerIcon />,
    children: <DropdownMenu />,
  },
  {
    icon: <CaretIcon />,
    children: <DropdownMenu />,
  },
];

const list = [
  {
    title: "header.specialist",
    path: "/",
  },
  {
    title: "header.health_facilities",
    path: "/",
  },
  {
    title: "header.doctor",
    path: "/",
  },
  {
    title: "header.examination_package",
    path: "/",
  },
];

function MuntipleLevelDropdown() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Navbar>
      <Sidebar />
      <div className="flex flex-row h-full py-3 mr-10">
        {list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="relative flex items-center justify-center mx-2 min-w-[120px] px-4 cursor-pointer group"
            >
              <span className="absolute bg-main h-full w-full rounded-3xl scale-0 group-hover:scale-100 transiton-all duration-200"></span>
              <p className="text-center w-full h-full leading-[35px] text-white group-hover:text-white z-2 uppercase">
                {t(item.title)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-2">
          <DropdownLanguage />
        </div>
        {data.map((item, index) => {
          return (
            <NavItem key={index} icon={item.icon}>
              {item.children}
            </NavItem>
          );
        })}
      </div>
    </Navbar>
  );
}

function Navbar(props: any) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem({ icon, children }: INavItemProps) {
  const [open, setOpen] = useState(false);
  const ref: any = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <li className="nav-item" ref={ref}>
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </a>

      {open && children}
    </li>
  );
}

function DropdownMenu() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(0);
  const dropdownRef: any = useRef(null);
  const { userDetail } = useAppSelector(userSelector);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props: any) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  const handleLogout = () => {
    deleteStateStorage("token");
    navigate(ROUTES.login.index);
  };

  return (
    <div
      className="dropdown"
      style={{
        height: menuHeight + 34,
      }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="text-white">
          <div className="p-2">
            Hi, {userDetail.firstName + " " + userDetail.lastName}
          </div>
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings"
            >
              Settings
            </DropdownItem>
            <DropdownItem
              leftIcon="🦧"
              rightIcon={<ChevronIcon />}
              goToMenu="animals"
            >
              Animals
            </DropdownItem>
            <div onClick={handleLogout}>
              <DropdownItem>Logout</DropdownItem>
            </div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default MuntipleLevelDropdown;
