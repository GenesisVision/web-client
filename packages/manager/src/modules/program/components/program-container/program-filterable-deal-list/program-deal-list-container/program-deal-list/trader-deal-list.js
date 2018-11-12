import React from "react";

import ProgramDeal from "./program-deal/program-deal";

import "./trader-deal-list.css";

const ProgramDealList = ({ deals, serverType, currency }) => {
  const renderDealList = () => {
    if (deals.length === 0) {
      return <div>There are no deals.</div>;
    }

    return deals.map(x => (
      <ProgramDeal
        key={x.id}
        deal={x}
        serverType={serverType}
        currency={currency}
      />
    ));
  };
  return (
    <div className="trader-deal-list">
      <div className="program-container__header">Deal List</div>
      {renderDealList()}
    </div>
  );
};

export default ProgramDealList;
