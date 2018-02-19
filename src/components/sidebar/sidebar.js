import { NavLink } from "react-router-dom";
import classnames from "classnames";
import React from "react";

import "./sidebar.css";
import { DASHBOARD_ROUTE } from "../../modules/dashboard/dashboard.constants";

const TRADERS_ROUTE = "/traders";
const Sidebar = ({ className }) => {
  return (
    <nav className={classnames([className, "sidebar"])}>
      <div className="sidebar--sticky">
        <ul className="nav flex-column">
          <li className="nav-item sidebar__item">
            <NavLink className="nav-link" title="Traders" to={TRADERS_ROUTE}>
              <span className="fa fa-list-ol" /> Traders
            </NavLink>
          </li>
          <li className="nav-item sidebar__item">
            <NavLink
              className="nav-link"
              title="Dashboard"
              to={DASHBOARD_ROUTE}
            >
              <span className="fa fa-chart-pie" /> Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
