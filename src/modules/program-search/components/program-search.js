import React from "react";
import ProgramSearchBarContainer from "./program-serach-bar-container/program-search-bar-container";
import "./program-search.css";

const ProgramSearch = () => {
  return (
    <div className="program-search">
      <div className="program-search__backdrop1" />
      <ProgramSearchBarContainer />
    </div>
  );
};

export default ProgramSearch;
