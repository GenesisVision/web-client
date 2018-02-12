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
            <NavLink className="nav-link" title="Home" to={TRADERS_ROUTE}>
              <span className="fa fa-pencil-alt" /> Traders
            </NavLink>
          </li>
          <li className="nav-item sidebar__item">
            <NavLink className="nav-link" title="Home" to={DASHBOARD_ROUTE}>
              <span className="fa fa-pencil-alt" /> Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
