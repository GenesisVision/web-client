import React from "react";
import "./trader-filterable-request-list.css";

import TraderRequestListContainer from "./trader-request-list-container/trader-request-list-container";
import TraderRequestListPagingContainer from "./trader-request-list-paging-container/trader-request-list-paging-container";

const TraderFilterableRequestList = ({ traderId }) => {
  return (
    <div className="trader-filterable-request-list">
      <TraderRequestListContainer traderId={traderId} />
      <div className="trader-filterable-request-list__paging">
        <TraderRequestListPagingContainer traderId={traderId} />
      </div>
    </div>
  );
};

export default TraderFilterableRequestList;
