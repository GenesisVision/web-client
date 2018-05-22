import React from "react";

import ProgramActiveFilterListContainer from "./program-active-filter-list-container/program-active-filter-list-container";
import ProgramListContainer from "./program-list-container/program-list-container";
import ProgramListFilterContainer from "./program-list-filter-container/program-list-filter-container";
import ProgramListPagingContainer from "./program-list-paging-container/program-list-paging-container";

import "./program-filterable-list.css";

const ProgramFilterableList = () => {
  return (
    <div className="program-filterable-list">
      <div className="program-filterable-list__programs">
        <ProgramActiveFilterListContainer />
        <ProgramListContainer />
        <ProgramListPagingContainer />
      </div>
      <ProgramListFilterContainer />
    </div>
  );
};

export default ProgramFilterableList;
