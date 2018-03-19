import React from "react";

import DPTraderItem from "./dp-trader-item/dp-trader-item";

const DashboardProgramList = ({ programs, openInvestPopup }) => {
  const renderPrograms = () => {
    if (programs.length === 0) {
      return <div>There are no programs in which you have invested</div>;
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
