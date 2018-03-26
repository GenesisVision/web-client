import { Link } from "react-router-dom";
import React from "react";

import DPTraderItem from "./dp-trader-item/dp-trader-item";

import "./dashboard-program-list.css";
import { TRADERS_ROUTE } from "../../../../../traders/traders.constants";
import PortfolioIcon from "../../../../media/portfolio-icon.svg";

const DashboardProgramList = ({ programs, openInvestPopup }) => {
  const renderPrograms = () => {
    if (programs.length === 0) {
      return (
        <div className="dashboard-empty">
          <img src={PortfolioIcon} width="150" alt="Portfolio" />
          <div className="dashboard-empty__text">
            There are no programs in which you have invested
          </div>
          <Link className="gv-btn gv-btn-primary" to={TRADERS_ROUTE}>
            Browse Programs
          </Link>
        </div>
      );
    }
    return programs.map((x, idx) => (
      <DPTraderItem
        key={x.id}
        idx={idx + 1}
        trader={x}
        openInvestPopup={openInvestPopup}
      />
    ));
  };
  return renderPrograms();
};

export default DashboardProgramList;
