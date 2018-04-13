import React from "react";

import TraderItem from "./program-item/program-item";

const TraderList = ({ programs, isAuthenticated, openInvestPopup }) => {
  const renderTraderList = () => {
    if (programs.length === 0) return <div>There are no traders</div>;
    return programs.map((x, idx) => (
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
