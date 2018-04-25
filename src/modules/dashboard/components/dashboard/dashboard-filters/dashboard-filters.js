import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./dashboard-filters.css";

class DashboardFilters extends Component {
  render() {
    return (
      <div className="dashboard-program-list-tabs">
        <NavLink
          exact
          to="/dashboard"
          activeClassName="dashboard-program-tab--active"
          className={"dashboard-program-tab"}
        >
          Portfolio
        </NavLink>
        <NavLink
          exact
          to="/dashboard/favorite"
          activeClassName="dashboard-program-tab--active"
          className={"dashboard-program-tab"}
        >
          Favorite Programms
        </NavLink>
      </div>
    );
  }
}

export default DashboardFilters;
