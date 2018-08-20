import "./dp-trader-item.css";

import React from "react";

import ProgramItem from "../../../../../../../../components/program-item/program-item";
import DPStatistic from "./dp-statistic/dp-statistic";

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
