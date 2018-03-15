import React from "react";

import TraderItem from "../../../../../../components/trader-item/trader-item";

const TraderList = ({ traders, isAuthenticated, openInvestPopup }) => {
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

export default TraderList;
