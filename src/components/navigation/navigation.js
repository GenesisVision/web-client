import { connect } from "react-redux";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";

import "./navigation.css";
import { DASHBOARD_ROUTE } from "../../modules/dashboard/dashboard.constants";
import { PROGRAMS_ROUTE } from "../../modules/programs/programs.constants";
import { WALLET_ROUTE } from "../../modules/wallet/wallet.constants";

import {
  DashboardIcon,
  WalletIcon,
  TradersIcon,
  CloseIcon,
  MenuIcon
} from "./media/icons.js";
import { TOURNAMENT_ROUTE } from "../../modules/tournament/tournament.constants";

import { navigationClose, navigationOpen } from "./actions/navigation-actions";

import AuthControls from "../../modules/authorization-controls/authorization-controls";
import history from "../../utils/history";
import Button from "../button/button";

class Navigation extends Component {
  render() {
    const { data: platformSettings } = this.props.platformData;
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
            title="Programs"
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
          <AuthControls className="navigation__link" />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    platformData: state.platformData.settings
  }),
  null,
  null,
  { pure: false }
)(Navigation);
