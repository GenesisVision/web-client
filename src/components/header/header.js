import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import React from "react";

import filterActions from "../../modules/filter/actions/filter-actions";
import loginActions from "../../modules/login/actions/login-actions";

import "./header.css";
import { HOME_ROUTE } from "../app.constants";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";
import gvLogo from "./gv-logo.svg";

const authorizedControl = signOut => (
  <ul className="navbar-nav px-3 flex-row">
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

const Header = ({ isAuthenticated, signOut, toggleFilter }) => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header__sorting">
          <NavLink title="Home" to={HOME_ROUTE}>
            <img src={gvLogo} alt="Genesis Vision" />
          </NavLink>
          <div className="h-sorting">
            Traders Name <span className="fas fa-caret-down" />
          </div>
        </div>
        <div className="header-filtering">
          <div className="h-filtering">
            <a className="link" onClick={toggleFilter}>
              <span className="fas fa-filter" />
            </a>
          </div>
          {isAuthenticated ? authorizedControl(signOut) : unAuthorizedControl()}
        </div>
      </header>

      <LoadingBar className="header__loading-bar" />
    </div>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  toggleFilter: () => {
    dispatch(filterActions.toggleFilter());
  },
  signOut: () => {
    dispatch(loginActions.logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
