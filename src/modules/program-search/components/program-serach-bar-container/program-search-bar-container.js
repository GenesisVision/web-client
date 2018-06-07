import { connect } from "react-redux";
import React from "react";

import ProgramSearchBar from "./program-search-bar/program-search-bar";
import programSearchService from "../../service/program-search-service";

const ProgramSearchBarContainer = ({ query, updateQuery }) => {
  return <ProgramSearchBar query={query} onChange={updateQuery} />;
};

const mapStateToProps = state => {
  const { query } = state.programSearchData.query;
  return { query };
};

const mapDispatchToProps = dispatch => ({
  updateQuery: query => dispatch(programSearchService.updateQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProgramSearchBarContainer
);
