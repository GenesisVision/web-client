import React from "react";
import { connect } from "react-redux";
import ProgramSearchBar from "./program-search-bar/program-search-bar";
import programSearchService from "../../service/program-search-service";

const ProgramSearchBarContainer = ({ getPrograms }) => {
  return <ProgramSearchBar onChange={getPrograms} />;
};

const mapDispatchToProps = dispatch => ({
  getPrograms: query => dispatch(programSearchService.getPrograms(query))
});

export default connect(
  null,
  mapDispatchToProps
)(ProgramSearchBarContainer);
