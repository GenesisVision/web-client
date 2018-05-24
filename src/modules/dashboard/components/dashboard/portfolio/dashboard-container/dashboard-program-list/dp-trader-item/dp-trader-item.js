import React from "react";

import DPStatistic from "./dp-statistic/dp-statistic";
import ProgramItem from "../../../../../../../../components/program-item/program-item";
import "./dp-trader-item.css";

const DPTraderItem = ({ ...props }) => {
  return (
    <ProgramItem
      {...props}
      isAuthenticated={true}
      showBookmark={false}
      statistic={DPStatistic}
    />
  );
};

export default DPTraderItem;
