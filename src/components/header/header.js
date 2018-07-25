import "./header.css";

import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { NavLink } from "react-router-dom";

import AuthControls from "../../modules/authorization-controls/authorization-controls";
import filterPaneActionsFactory from "../../modules/filter-pane/actions/filter-pane-actions";
import loginService from "../../modules/login/service/login-service";
import NavButtonContainer from "../../modules/navigation/components/nav-button/nav-button-container";
import NavigationContainer from "../../modules/navigation/components/navigation-container/navigation-container";
import ProgramSearchContainer from "../../modules/program-search/components/program-search-container";
import { PROGRAMS } from "../../modules/programs/actions/programs-actions.constants";
import { PROGRAMS_ROUTE } from "../../modules/programs/programs.constants";
import { HOME_ROUTE } from "../../pages/root.constants";
import Button from "../button/button";
import FilterIcon from "./filter-icon";
import gvLogo from "./gv-logo.svg";

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
      className={classnames("header__button", {
        "header__button--active": isFilterOpen
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
          <NavButtonContainer />
        </div>
        <div className="header__navigation">
          <NavigationContainer />
        </div>

        <div className="header__filtering">
          <ProgramSearchContainer />
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

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Header);

export default HeaderContainer;
