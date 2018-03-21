import React from "react";

import TraderDealListContainer from "./trader-deal-list-container/trader-deal-list-container";
import TraderDealListPagingContainer from "./trader-deal-list-paging-container/trader-deal-list-paging-container";

const TraderFilterableDealList = ({ traderId }) => {
  return (
    <div className="trader-filterable-deal-list">
      <TraderDealListContainer traderId={traderId} />
      <TraderDealListPagingContainer traderId={traderId} />
    </div>
  );
};

export default TraderFilterableDealList;
