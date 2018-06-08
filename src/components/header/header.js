import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import LoadingBar from "react-redux-loading-bar";
import React from "react";

import FilterIcon from "./filter-icon";
import filterPaneActionsFactory from "../../modules/filter-pane/actions/filter-pane-actions";
import loginService from "../../modules/login/service/login-service";
import "./header.css";
import { HOME_ROUTE } from "../app.constants";
import { PROGRAMS } from "../../modules/programs/actions/programs-actions.constants";
import { PROGRAMS_ROUTE } from "../../modules/programs/programs.constants";
import gvLogo from "./gv-logo.svg";
import AuthControls from "../../modules/authorization-controls/authorization-controls";
import NavButton from "../navigation/button/button";
import Button from "../button/button";
import Navigation from "../navigation/navigation";

const PAGES_WITH_FILTER = {
  [PROGRAMS_ROUTE]: {
    actionType: PROGRAMS,
    getStateData: state => state.programsData
  }
};

const filterPaneControl = (
  shouldShowFilterControl,
  isFilterOpen,
  toggleFilter
) => {
  if (!shouldShowFilterControl) return null;
  return (
    <Button
      icon={<FilterIcon />}
      onClick={toggleFilter}
      className={classnames("h-button", {
        "h-button--active": isFilterOpen
      })}
      secondary
    />
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
        <div className="header__logo">
          <NavLink title="Home" to={HOME_ROUTE}>
            <img src={gvLogo} alt="Genesis Vision" />
          </NavLink>
        </div>
        <div className="header__nav-button">
          <NavButton className="h-button" />
        </div>
        <div className="header__navigation">
          <Navigation />
        </div>
        <div className="header__filtering">
          {filterPaneControl(
            shouldShowFilterControl,
            isFilterOpen,
            toggleFilter
          )}
        </div>
        <div className="header__auth">
          <ul className="navbar-nav flex-row">
            <li className="nav-item text-nowrap">
              <AuthControls />
            </li>
          </ul>
        </div>
      </header>
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
