import React from "react";
import classnames from "classnames";
import NavigationContainer from "../navigation-container/navigation-container";
import NavButtonContainer from "../nav-button/nav-button-container";
import "./mobile-nav.css";

const MobileNav = ({ navigationClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={classnames("mobile-nav")}>
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__header">
          <NavButtonContainer className="h-button" />
        </div>
        <NavigationContainer className="mobile-navigation" />
      </div>
      <div className="mobile-nav__backdrop" onClick={navigationClose} />
    </div>
  );
};

export default MobileNav;
