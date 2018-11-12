import React from "react";

import TraderDealListContainer from "./program-deal-list-container/program-deal-list-container";
import TraderDealListPagingContainer from "./program-deal-list-paging-container/program-deal-list-paging-container";

import "./program-filterable-deal-list.css";

const TraderFilterableDealList = ({ programId }) => {
  return (
    <div className="program-filterable-deal-list">
      <TraderDealListContainer programId={programId} />
      <div className="program-filterable-deal-list__paging">
        <TraderDealListPagingContainer programId={programId} />
      </div>
    </div>
  );
};

export default TraderFilterableDealList;
