import { connect } from "react-redux";
import Button from "components/button/button";
import classnames from "classnames";
import ClickOutside from "components/click-outside/click-outside";
import LoadingBar from "react-redux-loading-bar";
import React from "react";

import programSearchActions from "../actions/program-search-actions";
import ProgramSearchBar from "./program-search-bar/program-search-bar";
import ProgramSearchPopup from "./program-search-popup/program-search-popup";
import programSearchService from "../service/program-search-service";

import "./program-search.css";

const ProgramSearch = ({
  query,
  programsData,
  isOpen,
  isFocused,
  updateQuery,
  clearInput,
  openSearchBar,
  closeSearchBar,
  toggleFocusedState
}) => {
  const shouldShowResults = query !== "";

  const handleClickOutside = () => {
    clearInput();
    toggleFocusedState(false);
  };

  return (
    <div
      className={classnames("program-search-wrapper", {
        "program-search-wrapper--is-open": isOpen
      })}
    >
      <Button
        secondary
        className="program-search__open"
        label={<i className="fas fa-search" title="Search" />}
        onClick={openSearchBar}
      />
      <ClickOutside
        className="program-search"
        shouldHandleClick={shouldShowResults}
        onClickOutside={handleClickOutside}
      >
        <ProgramSearchBar
          query={query}
          onChange={updateQuery}
          isFocused={isFocused}
          toggleFocus={toggleFocusedState}
        />
        <LoadingBar
          className="header__loading-bar"
          scope="qqq"
          style={{ bottom: "-23px" }}
        />
        {shouldShowResults && (
          <ProgramSearchPopup
            programsData={programsData}
            onProgramClick={clearInput}
          />
        )}
      </ClickOutside>
      <Button
        secondary
        className="program-search__close"
        label="Close"
        onClick={closeSearchBar}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { query } = state.programSearchData.query;
  const programsData = state.programSearchData.programs;
  const { isOpen, isFocused } = state.programSearchData.state;
  return { query, programsData, isOpen, isFocused };
};

const mapDispatchToProps = dispatch => ({
  updateQuery: query => dispatch(programSearchService.updateQuery(query)),
  clearInput: () => dispatch(programSearchService.updateQuery("")),
  openSearchBar: () => {
    dispatch(programSearchService.openSearchBar());
  },
  closeSearchBar: () => {
    dispatch(programSearchService.closeSearchBar());
  },
  toggleFocusedState: isFocused => {
    dispatch(programSearchActions.toggleFocusedState(isFocused));
  }
});

const ProgramSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramSearch);

export default ProgramSearchContainer;
