import React from "react";

import ProgramListContainer from "./program-list-container/program-list-container";
import ProgramListFilterContainer from "./program-list-filter-container/program-list-filter-container";
import ProgramListPagingContainer from "./program-list-paging-container/program-list-paging-container";

const ProgramFilterableList = () => {
  return (
    <div className="programs-container">
      <div className="programs">
        <ProgramListContainer />
        <ProgramListPagingContainer />
      </div>
      <div>
        <ProgramListFilterContainer />
      </div>
    </div>
  );
};

export default ProgramFilterableList;
