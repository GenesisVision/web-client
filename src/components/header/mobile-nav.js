import { NavLink } from "react-router-dom";
import React from "react";
import classnames from "classnames";
import Navigation from "../navigation/navigation";
import NavButton from "../navigation/button/button";
import { connect } from "react-redux";

import "./mobile-nav.css";

const MobileNav = ({ isOpen }) => {
  return (
    <div className={classnames("mobile-nav", { "mobile-nav__open": isOpen })}>
      <div className="mobile-nav__header">
        <NavButton />
      </div>
      <Navigation className="mobile-navigation" />
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.navigationData.isOpen
});

const ConnectedMobileNav = connect(mapStateToProps)(MobileNav);
export default ConnectedMobileNav;
