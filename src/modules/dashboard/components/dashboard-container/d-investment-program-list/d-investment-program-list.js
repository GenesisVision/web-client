import React from "react";

import DInvestmentProgram from "./d-investment-program/d-investment-program";

const DInvestmentProgramList = ({ programs }) => {
  return programs.map(x => <DInvestmentProgram key={x.id} program={x} />);
};

export default DInvestmentProgramList;
