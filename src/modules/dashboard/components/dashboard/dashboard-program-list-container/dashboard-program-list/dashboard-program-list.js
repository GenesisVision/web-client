import React from "react";

import TraderItem from "../../../../../../components/trader-item/trader-item";
import { Link } from "react-router-dom";
import { TRADERS_ROUTE } from "../../../../../traders/traders.constants";

const DashboardProgramList = ({ programs, openInvestPopup }) => {
  const renderPrograms = () => {
    if (programs.length === 0) {
      return <div>There are no programs in which you have invested</div>;
    }
    return programs.map((x, idx) => (
      <TraderItem
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
