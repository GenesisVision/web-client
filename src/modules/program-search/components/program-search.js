import { connect } from "react-redux";
import React from "react";

import ClickOutside from "../../../components/click-outside/click-outside";
import ProgramSearchBarContainer from "./program-serach-bar-container/program-search-bar-container";
import ProgramSearchPopupContainer from "./program-search-popup-container/program-search-popup-container";
import programSearchService from "../service/program-search-service";

import "./program-search.css";

const ProgramSearch = ({ onClickOutside }) => {
  return (
    <ClickOutside className="program-search" onClickOutside={onClickOutside}>
      <ProgramSearchBarContainer />
      <ProgramSearchPopupContainer />
    </ClickOutside>
  );
};

const mapDispatchToProps = dispatch => ({
  onClickOutside: query => dispatch(programSearchService.updateQuery(""))
});

export default connect(null, mapDispatchToProps)(ProgramSearch);
