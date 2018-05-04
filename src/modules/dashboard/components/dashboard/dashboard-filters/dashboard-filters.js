import React from "react";
import { translate } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  DASHBOARD_FAVOURITES_ROUTE,
  DASHBOARD_PORTFOLIO_ROUTE
} from "../../../dashboard.constants";
import "./dashboard-filters.css";

const DashboardFilters = ({ t }) => (
  <div className="dashboard-program-list-tabs">
    <NavLink
      to={DASHBOARD_PORTFOLIO_ROUTE}
      activeClassName="dashboard-program-tab--active"
      className={"dashboard-program-tab"}
    >
      {t("dashboard.portfolio")}
    </NavLink>
    <NavLink
      to={DASHBOARD_FAVOURITES_ROUTE}
      activeClassName="dashboard-program-tab--active"
      className={"dashboard-program-tab"}
    >
      {t("dashboard.favorite-programs")}
    </NavLink>
  </div>
);

export default translate()(DashboardFilters);
