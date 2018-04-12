import React from "react";
import "./trader-filterable-request-list.css";

import TraderRequestListContainer from "./trader-request-list-container/trader-request-list-container";
import TraderRequestListPagingContainer from "./trader-request-list-paging-container/trader-request-list-paging-container";

const TraderFilterableRequestList = ({ programId }) => {
  return (
    <div className="trader-filterable-request-list">
      <TraderRequestListContainer programId={programId} />
      <div className="trader-filterable-request-list__paging">
        <TraderRequestListPagingContainer programId={programId} />
      </div>
    </div>
  );
};

export default TraderFilterableRequestList;
