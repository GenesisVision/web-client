import "./navigation.css";

import classnames from "classnames";
import { DASHBOARD_ROUTE } from "modules/dashboard/dashboard.constants";
import { LOGIN_ROUTE } from "modules/login/login.constants";
import { PROGRAMS_ROUTE } from "modules/programs/programs.constants";
import { TOURNAMENT_ROUTE } from "modules/tournament/tournament.constants";
import { WALLET_ROUTE } from "modules/wallet/wallet.constants";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import {
  DashboardIcon,
  TradersIcon,
  WalletIcon
} from "../../../media/icons.js";

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
              <span className="navigation__label">Tournament</span>
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
            <span className="navigation__label">Traders</span>
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
            <span className="navigation__label">Dashboard</span>
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
            <span className="navigation__label">Wallet</span>
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
              <span className="navigation__label">Sign Out</span>
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

export default Navigation;
