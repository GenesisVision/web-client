import React from "react";

import DPStatistic from "./dp-statistic/dp-statistic";
import ProgramItem from "../../../../../../../../components/program-item/program-item";
import "./dp-trader-item.css";

const DPTraderItem = ({ ...props }) => {
  return <ProgramItem {...props} statistic={DPStatistic} />;
};

export default DPTraderItem;
