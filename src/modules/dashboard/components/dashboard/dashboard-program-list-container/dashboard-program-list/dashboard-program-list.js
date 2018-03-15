import React from "react";

import TraderItem from "../../../../../../components/trader-item/trader-item";

const DashboardProgramList = ({ programs, openInvestPopup }) => {
  return programs.map((x, idx) => (
    <TraderItem
      key={x.id}
      idx={idx + 1}
      trader={x}
      openInvestPopup={openInvestPopup}
    />
  ));
};

export default DashboardProgramList;
