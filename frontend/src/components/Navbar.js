import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  return (
    <nav className="nav">
      <Link to="/Home" href="#" className="nav__link">
        <h1>OA Remedy Club</h1>
      </Link>
      <ul className={active}>
        <li className="nav__item">
          <Link to="/Home" href="#" className="nav__link">
            บันทึกการออกกำลังกาย
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/Search" href="#" className="nav__link">
            ข้อมูลผู้ป่วย
          </Link>
        </li>
        <li className="nav__item">
          <button onClick={handleLogout}>ออกจากระบบ</button>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
