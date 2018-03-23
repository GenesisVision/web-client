import { NavLink } from "react-router-dom";
import React from "react";

import "./sidebar.css";
import { DASHBOARD_ROUTE } from "../../modules/dashboard/dashboard.constants";
import { TRADERS_ROUTE } from "../../modules/traders/traders.constants";
import { WALLET_ROUTE } from "../../modules/wallet/wallet.constants";
//import { PROFILE_ROUTE } from "../../modules/profile/profile.constants";
import {
  DashboardIcon,
  //SettingsIcon,
  WalletIcon,
  TradersIcon
} from "./media/icons.js";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="nav-item sidebar__item">
        <NavLink className="nav-link" title="Programs" to={TRADERS_ROUTE}>
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

export default Sidebar;
