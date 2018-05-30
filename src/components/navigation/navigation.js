import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import React from "react";

import "./navigation.css";
import { DASHBOARD_ROUTE } from "../../modules/dashboard/dashboard.constants";
import { PROGRAMS_ROUTE } from "../../modules/programs/programs.constants";
import { WALLET_ROUTE } from "../../modules/wallet/wallet.constants";

//import { PROFILE_ROUTE } from "../../modules/profile/profile.constants";
import {
  DashboardIcon,
  //SettingsIcon,
  WalletIcon,
  TradersIcon
} from "./media/icons.js";
import { TOURNAMENT_ROUTE } from "../../modules/tournament/tournament.constants";

const Navigation = ({ platformData }) => {
  const { data: platformSettings } = platformData;
  const shouldRenderTournament =
    platformSettings && platformSettings.isTournamentActive;
  return (
    <div className="navigation">
      {shouldRenderTournament && (
        <div className="navigation__item">
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link--active"
            title="Tournament"
            to={TOURNAMENT_ROUTE}
          >
            <i className="fas fa-trophy" />
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
          <TradersIcon />
        </NavLink>
      </div>
      <div className="navigation__item">
        <NavLink
          className="navigation__link"
          activeClassName="navigation__link--active"
          title="Dashboard"
          to={DASHBOARD_ROUTE}
        >
          <DashboardIcon />
        </NavLink>
      </div>
      <div className="navigation__item">
        <NavLink
          className="navigation__link"
          activeClassName="navigation__link--active"
          title="Wallet"
          to={WALLET_ROUTE}
        >
          <WalletIcon />
        </NavLink>
      </div>
      <div className="navigation__item">
        {/* <NavLink className="navigation__link" title="Profile" to={PROFILE_ROUTE}>
          <SettingsIcon />
        </NavLink> */}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    platformData: state.platformData.settings
  }),
  null,
  null,
  { pure: false }
)(Navigation);
