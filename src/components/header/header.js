import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import LoadingBar from "react-redux-loading-bar";
import React from "react";

import filterActions from "../../modules/filter-pane/actions/filter-pane-actions";
import FilterIcon from "./filter-icon";
import loginActions from "../../modules/login/actions/login-actions";

import "./header.css";
import { HOME_ROUTE } from "../app.constants";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";
import { TRADERS_ROUTE } from "../../modules/traders/traders.constants";
import { WALLET_FILTER_PANE } from "../../modules/wallet/actions/wallet-actions.constants";
import { WALLET_ROUTE } from "../../modules/wallet/wallet.constants";
import gvLogo from "./gv-logo.svg";
import {TRADERS_FILTER_PANE} from "../../modules/traders/actions/traders-actions.constants";

const PAGES_WITH_FILTER = {
  [TRADERS_ROUTE]: {
      actionType: TRADERS_FILTER_PANE,
      getStateData: state => state.tradersData
  },
  [WALLET_ROUTE]: {
    actionType: WALLET_FILTER_PANE,
    getStateData: state => state.walletData
  }
};

const authorizedControl = signOut => (
  <ul className="navbar-nav px-3 flex-row">
    <li className="nav-item text-nowrap">
      <button
        className="gv-btn gv-btn-secondary"
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

const unauthorizedControl = () => (
  <ul className="navbar-nav px-3 flex-row">
    <li className="nav-item text-nowrap">
      <Link
        className="gv-btn gv-btn-secondary"
        title="Sign In"
        to={LOGIN_ROUTE}
      >
        Sign In
      </Link>
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
        <div className="header-filtering">
          {filterPaneControl(
            shouldShowFilterControl,
            isFilterOpen,
            toggleFilter
          )}
          {isAuthenticated ? authorizedControl(signOut) : unauthorizedControl()}
        </div>
      </header>

      <LoadingBar className="header__loading-bar" />
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(loginActions.logoutUser());
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
    PAGES_WITH_FILTER[pageWithFilter].getStateData(stateProps).filtering
      .filterPane;
  return {
    isAuthenticated,
    ...otherDispatchProps,
    ...ownProps,
    shouldShowFilterControl,
    isFilterOpen,
    toggleFilter: () => {
      dispatch(
        isFilterOpen
          ? filterActions.closeFilter(
              PAGES_WITH_FILTER[pageWithFilter].actionType
            )
          : filterActions.openFilter(
              PAGES_WITH_FILTER[pageWithFilter].actionType
            )
      );
    }
  };
};

export default
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header)
;
