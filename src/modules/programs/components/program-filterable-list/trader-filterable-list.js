import React from "react";

import ProgramListContainer from "./program-list-container/program-list-container";
import ProgramListFilterContainer from "./program-list-filter-container/program-list-filter-container";
import WalletPaneContainer from "../../../wallet-pane/components/wallet-pane-container/wallet-pane-container";

const TraderFilterableList = () => {
  return (
    <div>
      <ProgramListFilterContainer />
      <div className="wallet-pane-container">
        <div className="wallet-pane-container__component">
          <ProgramListContainer />
        </div>
        <WalletPaneContainer />
      </div>
    </div>
  );
};

export default TraderFilterableList;
