import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import React from "react";

import "./sidebar.css";
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

const Sidebar = ({ platformData }) => {
  const { data: platformSettings } = platformData;
  const shouldRenderTournament =
    platformSettings && platformSettings.isTournamentActive;
  return (
    <div className="sidebar">
      {shouldRenderTournament && (
        <div className="nav-item sidebar__item">
          <NavLink
            className="nav-link"
            title="Tournament"
            to={TOURNAMENT_ROUTE}
          >
            <i className="fas fa-trophy" />
          </NavLink>
        </div>
      )}
      <div className="nav-item sidebar__item">
        <NavLink className="nav-link" title="Programs" to={PROGRAMS_ROUTE}>
          <TradersIcon />
        </NavLink>
      </div>
      <div className="nav-item sidebar__item">
        <NavLink className="nav-link" title="Dashboard" to={DASHBOARD_ROUTE}>
          <DashboardIcon />
        </NavLink>
      </div>
      <div className="nav-item sidebar__item">
        <NavLink className="nav-link" title="Wallet" to={WALLET_ROUTE}>
          <WalletIcon />
        </NavLink>
      </div>
      <div className="nav-item sidebar__item">
        {/* <NavLink className="nav-link" title="Profile" to={PROFILE_ROUTE}>
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
)(Sidebar);
