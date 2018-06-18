import { connect } from "react-redux";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";

import "./navigation.css";
import { DASHBOARD_ROUTE } from "../../modules/dashboard/dashboard.constants";
import { PROGRAMS_ROUTE } from "../../modules/programs/programs.constants";
import { WALLET_ROUTE } from "../../modules/wallet/wallet.constants";

import { DashboardIcon, WalletIcon, TradersIcon } from "./media/icons.js";
import { TOURNAMENT_ROUTE } from "../../modules/tournament/tournament.constants";

import loginService from "../../modules/login/service/login-service";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";

class Navigation extends Component {
  render() {
    const { isAuthenticated, platformData } = this.props;
    const { data: platformSettings } = platformData;
    const shouldRenderTournament =
      platformSettings && platformSettings.isTournamentActive;
    return (
      <div className={classnames("navigation", this.props.className)}>
        {shouldRenderTournament && (
          <div className="navigation__item">
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link--active"
              title="Tournament"
              to={TOURNAMENT_ROUTE}
            >
              <i className="navigation__icon nav-dashboard">
                <i className="fas fa-trophy" />
              </i>
              Tournament
            </NavLink>
          </div>
        )}
        <div className="navigation__item">
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link--active"
            title="Traders"
            to={PROGRAMS_ROUTE}
          >
            <i className="navigation__icon nav-traders">
              <TradersIcon />
            </i>
            Traders
          </NavLink>
        </div>
        <div className="navigation__item">
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link--active"
            title="Dashboard"
            to={DASHBOARD_ROUTE}
          >
            <i className="navigation__icon nav-dashboard">
              <DashboardIcon />
            </i>
            Dashboard
          </NavLink>
        </div>
        <div className="navigation__item">
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link--active"
            title="Wallet"
            to={WALLET_ROUTE}
          >
            <i className="navigation__icon nav-wallet">
              <WalletIcon />
            </i>
            Wallet
          </NavLink>
        </div>
        <div className="navigation__item navigation__auth">
          {isAuthenticated ? (
            <button
              className="navigation__link"
              href="/"
              onClick={this.props.signOut}
            >
              <i className="navigation__icon nav-dashboard">
                <i className="fas fa-sign-out-alt" />
              </i>
              Sign Out
            </button>
          ) : (
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link--active"
              title="sign in"
              to={LOGIN_ROUTE}
            >
              <i className="navigation__icon nav-dashboard">
                <i className="fas fa-sign-in-alt" />
              </i>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  platformData: state.platformData.settings,
  isAuthenticated: state.authData.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(loginService.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(Navigation);
