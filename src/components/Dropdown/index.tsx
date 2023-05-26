import user from "assets/icons/home/user.png";
import edit from "assets/icons/home/edit.png";
import inbox from "assets/icons/home/envelope.png";
import settings from "assets/icons/home/settings.png";
import help from "assets/icons/home/question.png";
import logout from "assets/icons/home/log-out.png";
import "./index.css";

import { useState, useEffect, useRef } from "react";

function Dropdown() {
  const [open, setOpen] = useState(false);

  let menuRef: any = useRef();

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="menu-container" ref={menuRef}>
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img alt="" src={user}></img>
      </div>

      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <h3>
          Hello
          <br />
          <span>Website Designer</span>
        </h3>
        <ul>
          <DropdownItem img={user} text={"My Profile"} />
          <DropdownItem img={edit} text={"Edit Profile"} />
          <DropdownItem img={inbox} text={"Inbox"} />
          <DropdownItem img={settings} text={"Settings"} />
          <DropdownItem img={help} text={"Helps"} />
          <DropdownItem img={logout} text={"Logout"} />
        </ul>
      </div>
    </div>
  );
}

function DropdownItem(props: any) {
  return (
    <li className="dropdownItem">
      <img alt="" height={40} width={40} src={props.img}></img>
      <a href="/"> {props.text} </a>
    </li>
  );
}

export default Dropdown;
