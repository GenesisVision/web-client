import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./dashboard-filters.css";
import {
  DASHBOARD_PORTFOLIO_ROUTE,
  DASHBOARD_FAVOURITES_ROUTE
} from "../../../dashboard.constants";

class DashboardFilters extends Component {
  render() {
    return (
      <div className="dashboard-program-list-tabs">
        <NavLink
          to={DASHBOARD_PORTFOLIO_ROUTE}
          activeClassName="dashboard-program-tab--active"
          className={"dashboard-program-tab"}
        >
          Portfolio
        </NavLink>
        <NavLink
          to={DASHBOARD_FAVOURITES_ROUTE}
          activeClassName="dashboard-program-tab--active"
          className={"dashboard-program-tab"}
        >
          Favorite programs
        </NavLink>
      </div>
    );
  }
}

export default DashboardFilters;
