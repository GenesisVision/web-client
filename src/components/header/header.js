import React from "react";
import "./header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a
        className="navbar-brand header__navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
      >
        Investor portal
      </a>
      <div className="w-100">&nbsp;</div>
      <ul className="navbar-nav px-3 flex-row">
        <li className="nav-item text-nowrap">
          <span className="px-3">Profile</span>
        </li>
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
