import { connect } from "react-redux";
import React from "react";

import InvestmentProgram from "./investment-programs/investment-programs";

const InvestmentProgramsContainer = () => {
  return <InvestmentProgram />;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  InvestmentProgramsContainer
);
