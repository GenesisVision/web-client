import React from "react";

import DInvestmentProgram from "./d-investment-program/d-investment-program";

const DInvestmentProgramList = ({ programs, openDepositModal }) => {
  return programs.map(x => (
    <DInvestmentProgram
      key={x.id}
      program={x}
      openDepositModal={openDepositModal}
    />
  ));
};

export default DInvestmentProgramList;
