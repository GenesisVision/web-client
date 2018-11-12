import "./program-item.css";

import React from "react";

import ProgramItem from "shared/components/program-item/program-item";
import PIStatistic from "./pi-statistic/pi-statistic";

const Program = props => {
  return <ProgramItem statistic={PIStatistic} {...props} />;
};

export default Program;
