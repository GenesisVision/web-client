import React from "react";

import TraderListContainer from "./trader-list-container/trader-list-container";
import TraderListFilterContainer from "./trader-list-filter-container/trader-list-filter-container";
import WalletPaneContainer from "../../../wallet-pane/components/wallet-pane-container/wallet-pane-container";

const TraderFilterableList = () => {
  return (
    <div>
      <TraderListFilterContainer />
      <div className="wallet-pane-container">
        <div className="wallet-pane-container__component">
          <TraderListContainer />
        </div>
        <WalletPaneContainer />
      </div>
    </div>
  );
};

export default TraderFilterableList;
