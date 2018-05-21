import React from "react";
import Button from "../../../../../../../components/button/button";
import DPTraderItem from "./dp-trader-item/dp-trader-item";

import "./dashboard-program-list.css";
import { PROGRAMS_ROUTE } from "../../../../../../programs/programs.constants";
import PortfolioIcon from "../../../../../media/portfolio-icon.svg";

const DashboardProgramList = ({ programs, openInvestPopup }) => {
  const renderPrograms = () => {
    if (programs.length === 0) {
      return (
        <div className="dashboard-empty">
          <img src={PortfolioIcon} width="150" alt="Portfolio" />
          <div className="dashboard-empty__text">
            There are no programs in which you have invested
          </div>
          <Button primary href={PROGRAMS_ROUTE} label="Browse Programs" />
        </div>
      );
    }
    return programs.map((x, idx) => (
      <DPTraderItem
        key={x.id}
        order={idx + 1}
        program={x}
        openInvestPopup={openInvestPopup}
      />
    ));
  };
  return renderPrograms();
};

export default DashboardProgramList;
