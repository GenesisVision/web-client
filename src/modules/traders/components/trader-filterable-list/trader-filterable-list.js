import React from "react";

import FilterContainer from "../../../filter-pane/components/filter-pane-container";
import TraderListContainer from "./trader-list-container/trader-list-container";
import TraderListFilter from "./trader-list-filter-container/trader-list-filter/trader-list-filter";
import TraderListFilterContainer from "./trader-list-filter-container/trader-list-filter-container";
import WalletPaneContainer from "../../../wallet-pane/components/wallet-pane-container/wallet-pane-container";

const TraderFilterableList = () => {
  return (
    <div>
      <TraderListFilterContainer />
      <WalletPaneContainer>
        <TraderListContainer />
      </WalletPaneContainer>
    </div>
  );
};

export default TraderFilterableList;
