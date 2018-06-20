import "./mobile-nav.css";

import classnames from "classnames";
import React from "react";

import NavButtonContainer from "../nav-button/nav-button-container";
import NavigationContainer from "../navigation-container/navigation-container";

const MobileNav = ({ navigationClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={classnames("mobile-nav")}>
      <div className="mobile-nav__wrapper">
        <div className="mobile-nav__header">
          <NavButtonContainer />
        </div>
        <NavigationContainer className="mobile-navigation" />
      </div>
      <div className="mobile-nav__backdrop" onClick={navigationClose} />
    </div>
  );
};

export default MobileNav;
