import "./program-item.css";

import React from "react";

import ProgramItem from "../../../../../../../components/program-item/program-item";
import PIStatistic from "./pi-statistic/pi-statistic";

const ProgramListItem = props => {
  return <ProgramItem statistic={PIStatistic} {...props} />;
};

export default ProgramListItem;
