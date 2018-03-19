import React from "react";

import TraderItem from "./trader-item/trader-item";

const TraderList = ({ traders, isAuthenticated, openInvestPopup }) => {
  const renderTraderList = () => {
    if (traders.length === 0) return <div>There are no traders</div>;
    return traders.map((x, idx) => (
      <TraderItem
        key={x.id}
        idx={idx + 1}
        trader={x}
        isAuthenticated={isAuthenticated}
        openInvestPopup={openInvestPopup}
      />
    ));
  };
  return renderTraderList();
};

export default TraderList;
