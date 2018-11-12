import React from "react";
import "./program-filterable-request-list.css";

import ProgramRequestListContainer from "./program-request-list-container/program-request-list-container";
import ProgramRequestListPagingContainer from "./program-request-list-paging-container/program-request-list-paging-container";

const ProgramFilterableRequestList = ({ programId }) => {
  return (
    <div className="program-filterable-request-list">
      <ProgramRequestListContainer programId={programId} />
      <div className="program-filterable-request-list__paging">
        <ProgramRequestListPagingContainer programId={programId} />
      </div>
    </div>
  );
};

export default ProgramFilterableRequestList;
