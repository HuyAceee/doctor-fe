/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import "./index.css";

const MenuModal = () => {
  const handleClick = () => {
    const nav = document.querySelector("nav");
    const lineOne = document.querySelector("nav .menu-btn .line--1");
    const lineTwo = document.querySelector("nav .menu-btn .line--2");
    const lineThree = document.querySelector("nav .menu-btn .line--3");
    const link = document.querySelector("nav .nav-links");
    if (nav && lineOne && lineTwo && lineThree && link) {
      nav.classList.toggle("nav-open");
      lineOne.classList.toggle("line-cross");
      lineTwo.classList.toggle("line-fade-out");
      lineThree.classList.toggle("line-cross");
      link.classList.toggle("fade-in");
    }
  };
  return (
    <nav className="fixed">
      <div className="menu-btn" onClick={handleClick}>
        <div className="line line--1"></div>
        <div className="line line--2"></div>
        <div className="line line--3"></div>
      </div>

      <div className="nav-links">
        <a href="" className="link">
          Home
        </a>
        <a href="" className="link">
          Contact
        </a>
        <a href="" className="link">
          Profile
        </a>
        <a href="" className="link">
          About
        </a>
      </div>
    </nav>
  );
};

export default MenuModal;
