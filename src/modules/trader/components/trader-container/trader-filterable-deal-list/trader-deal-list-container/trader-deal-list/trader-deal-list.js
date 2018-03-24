import React from "react";

import TraderDeal from "./trader-deal/trader-deal";

import "./trader-deal-list.css";

const TraderDealList = ({ deals, serverType, currency }) => {
  const renderDealList = () => {
    if (deals.length === 0) {
      return <div>There are no deals.</div>;
    }

    return deals.map(x => (
      <TraderDeal
        key={x.id}
        deal={x}
        serverType={serverType}
        currency={currency}
      />
    ));
  };
  return (
    <div className="trader-deal-list">
      <div className="trader-container__header">Deal List</div>
      {renderDealList()}
    </div>
  );
};

export default TraderDealList;
