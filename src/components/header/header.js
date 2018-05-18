import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import LoadingBar from "react-redux-loading-bar";
import React from "react";

import FilterIcon from "./filter-icon";
import filterPaneActionsFactory from "../../modules/filter-pane/actions/filter-pane-actions";
import loginService from "../../modules/login/service/login-service";
import MobileNav from "./mobile-nav";
import Button from "../../components/button/button";
import "./header.css";
import { HOME_ROUTE } from "../app.constants";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";
import { PROGRAMS } from "../../modules/programs/actions/programs-actions.constants";
import { PROGRAMS_ROUTE } from "../../modules/programs/programs.constants";
import gvLogo from "./gv-logo.svg";

const PAGES_WITH_FILTER = {
  [PROGRAMS_ROUTE]: {
    actionType: PROGRAMS,
    getStateData: state => state.programsData
  }
};

const authorizedControl = signOut => (
  <ul className="navbar-nav flex-row">
    <li className="nav-item text-nowrap">
      <Button label="Sign Out" secondary onClick={signOut} />
    </li>
  </ul>
);

const unauthorizedControl = () => (
  <ul className="navbar-nav flex-row">
    <li className="nav-item text-nowrap">
      <Button label="Sign In" secondary href={LOGIN_ROUTE} />
    </li>
  </ul>
);

const filterPaneControl = (
  shouldShowFilterControl,
  isFilterOpen,
  toggleFilter
) => {
  if (!shouldShowFilterControl) return null;
  return (
    <div className="h-filtering">
      <span
        className={classnames({
          "h-filtering--open": isFilterOpen
        })}
        onClick={toggleFilter}
      >
        <FilterIcon />
      </span>
    </div>
  );
};

const Header = ({
  shouldShowFilterControl,
  isAuthenticated,
  signOut,
  isFilterOpen,
  toggleFilter
}) => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header__sorting">
          <NavLink title="Home" to={HOME_ROUTE}>
            <img src={gvLogo} alt="Genesis Vision" />
          </NavLink>
          <div className="h-sorting">Investor Portal</div>
        </div>
        <div className="header__filtering">
          {filterPaneControl(
            shouldShowFilterControl,
            isFilterOpen,
            toggleFilter
          )}
          {isAuthenticated ? authorizedControl(signOut) : unauthorizedControl()}
        </div>
      </header>
      <MobileNav />
      <LoadingBar className="header__loading-bar" />
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(loginService.logout());
  },
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { isAuthenticated } = stateProps.authData;
  const { dispatch, ...otherDispatchProps } = dispatchProps;
  const { location } = ownProps;

  const pageWithFilter = Object.keys(PAGES_WITH_FILTER).find(
    x => location.pathname === x
  );
  const shouldShowFilterControl = pageWithFilter !== undefined;
  const { isFilterOpen } =
    shouldShowFilterControl &&
    PAGES_WITH_FILTER[pageWithFilter].getStateData(stateProps).filterPane.state;
  const filterPaneActions =
    shouldShowFilterControl &&
    filterPaneActionsFactory(PAGES_WITH_FILTER[pageWithFilter].actionType);
  return {
    isAuthenticated,
    ...otherDispatchProps,
    ...ownProps,
    shouldShowFilterControl,
    isFilterOpen,
    toggleFilter: () => {
      dispatch(
        isFilterOpen
          ? filterPaneActions.closeFilter()
          : filterPaneActions.openFilter()
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);
