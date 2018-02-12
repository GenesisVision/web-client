import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import React from "react";

import loginActions from "../../shared/modules/login/actions/login-actions";

import "./header.css";
import { HOME_ROUTE } from "../app.constants";
import { LOGIN_ROUTE } from "../login-scene/login-scene.constants";
import { PROFILE_ROUTE } from "../../modules/profile/profile.constants";

const authorizedControl = signOut => (
  <ul className="navbar-nav px-3 flex-row">
    <li className="nav-item text-nowrap">
      <Link
        className="nav-link nav-link__profile px-3"
        title="Profile"
        to={PROFILE_ROUTE}
      >
        <span className="fas fa-user-circle" />
      </Link>
    </li>
    <li className="nav-item text-nowrap">
      <button
        className="btn btn-outline-primary"
        title="Sign out"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </li>
  </ul>
);

const unAuthorizedControl = () => (
  <ul className="navbar-nav px-3 flex-row">
    <li className="nav-item text-nowrap">
      <Link
        className="btn btn-outline-primary"
        title="Sign In"
        to={LOGIN_ROUTE}
      >
        Sign In
      </Link>
    </li>
  </ul>
);

const Header = ({ isAuthenticated, signOut }) => {
  return (
    <nav className="header navbar sticky-top flex-md-nowrap">
      <NavLink
        className="navbar-brand header__link col-sm-3 col-md-2 mr-0"
        title="Home"
        to={HOME_ROUTE}
      >
        Investor portal
      </NavLink>
      <div className="w-100">&nbsp;</div>
      {isAuthenticated ? authorizedControl(signOut) : unAuthorizedControl()}
    </nav>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(loginActions.logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
