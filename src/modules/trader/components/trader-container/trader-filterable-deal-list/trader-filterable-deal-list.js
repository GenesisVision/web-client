import React from "react";

import TraderDealListContainer from "./trader-deal-list-container/trader-deal-list-container";
import TraderDealListPagingContainer from "./trader-deal-list-paging-container/trader-deal-list-paging-container";

import "./trader-filterable-deal-list.css";

const TraderFilterableDealList = ({ traderId }) => {
  return (
    <div className="trader-filterable-deal-list">
      <TraderDealListContainer traderId={traderId} />
      <div className="trader-filterable-deal-list__paging">
        <TraderDealListPagingContainer traderId={traderId} />
      </div>
    </div>
  );
};

export default TraderFilterableDealList;
