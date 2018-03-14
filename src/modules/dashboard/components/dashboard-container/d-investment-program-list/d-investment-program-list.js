import React from "react";

import DInvestmentProgram from "./d-investment-program/d-investment-program";
import TraderItem from "../../../../../components/trader-item/trader-item";

const DInvestmentProgramList = ({ programs }) => {
  return programs.map((x, idx) => (
    <TraderItem key={x.id} idx={idx + 1} trader={x} />
  ));
};

export default DInvestmentProgramList;
