import React from "react";

import FilterContainer from "../../../filter-pane/components/filter-pane-container";
import TraderListContainer from "./trader-list-container/trader-list-container";
import TraderListFilter from "./trader-list-filter-container/trader-list-filter/trader-list-filter";
import TraderListFilterContainer from "./trader-list-filter-container/trader-list-filter-container";

const TraderFilterableList = ({ queryParams }) => {
  return (
    <div>
      <TraderListFilterContainer />
      <div className="wallet-pane-wrapper">
        <div>
          <TraderListContainer />
        </div>
        <div className="wallet-pane">Wallet</div>
      </div>
    </div>
  );
};

export default TraderFilterableList;
