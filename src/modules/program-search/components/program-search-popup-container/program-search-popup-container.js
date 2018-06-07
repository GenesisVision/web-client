import { connect } from "react-redux";
import React from "react";

import ProgramSearchPopup from "./program-search-popup/program-search-popup";

const ProgramSearchPopupContainer = ({ query, isPending, programs }) => {
  if (!query) return null;
  if (isPending || !programs) return null;
  return <ProgramSearchPopup programs={programs.investmentPrograms} />;
};

const mapStateToProps = state => {
  const { query } = state.programSearchData.query;
  const { isPending, data: programs } = state.programSearchData.programs;
  return { query, isPending, programs };
};

export default connect(mapStateToProps)(ProgramSearchPopupContainer);
