import { connect } from "react-redux";
import React from "react";

import ClickOutside from "../../../components/click-outside/click-outside";
import ProgramSearchBar from "./program-search-bar/program-search-bar";
import ProgramSearchPopup from "./program-search-popup/program-search-popup";
import programSearchService from "../service/program-search-service";

import "./program-search.css";

const ProgramSearch = ({ query, programsData, updateQuery, clearInput }) => {
  const shouldShowResults = () => {
    return query !== "";
  };
  return (
    <ClickOutside
      className="program-search"
      shouldHandleClick={shouldShowResults()}
      onClickOutside={clearInput}
    >
      <ProgramSearchBar query={query} onChange={updateQuery} />
      {shouldShowResults() && (
        <ProgramSearchPopup
          programsData={programsData}
          onProgramClick={clearInput}
        />
      )}
    </ClickOutside>
  );
};

const mapStateToProps = state => {
  const { query } = state.programSearchData.query;
  const programsData = state.programSearchData.programs;
  return { query, programsData };
};

const mapDispatchToProps = dispatch => ({
  updateQuery: query => dispatch(programSearchService.updateQuery(query)),
  clearInput: query => dispatch(programSearchService.updateQuery(""))
});

const ProgramSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramSearch);

export default ProgramSearchContainer;
