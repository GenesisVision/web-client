import classnames from "classnames";
import React from "react";

import DPStatistic from "./dp-statistic/dp-statistic";
import TIButtons from "../../../../../../../../components/program-item/pi-buttons/pi-buttons";
import TIChart from "../../../../../../../../components/program-item/pi-chart/pi-chart";
import TIInfo from "../../../../../../../../components/program-item/pi-info/pi-info";
import ProgramItem from "../../../../../../../../components/program-item/program-item";
import "./dp-trader-item.css";

const DPTraderItem = ({ ...props }) => {
  return <ProgramItem {...props} statistic={DPStatistic} />;
};

export default DPTraderItem;
