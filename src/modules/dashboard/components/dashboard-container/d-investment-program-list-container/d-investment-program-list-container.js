import { connect } from "react-redux";
import React from "react";

import DInvestmentProgramList from "../d-investment-program-list/d-investment-program-list";

const DInvestmentProgramListContainer = ({ programs }) => {
  return <DInvestmentProgramList programs={programs} />;
};

const mapStateToProps = state => {
  const programs = [
    {
      id: 1,
      name: "Program A",
      tokens: 800,
      tokensUsd: 800000,
      profit: 20,
      profitUsd: 240,
      days: 6
    },
    {
      id: 2,
      name: "Program B",
      tokens: 1000,
      tokensUsd: 800,
      profit: 15,
      profitUsd: 120,
      days: 3
    },
    {
      id: 3,
      name: "Program C",
      tokens: 800,
      tokensUsd: 800000,
      profit: 20,
      profitUsd: 240,
      days: 6
    }
  ];
  return { programs };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  DInvestmentProgramListContainer
);
