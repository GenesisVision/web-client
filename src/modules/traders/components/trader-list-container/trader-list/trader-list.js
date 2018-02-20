import React from "react";

import TraderItem from "../trader-item/trader-item";

const TraderList = ({ traders }) => {
  return (
    <div>
      <h1>Traders</h1>
      {traders.map(x => (
        <TraderItem key={x.investment.id} trader={x.investment} />
      ))}
    </div>
  );
};

export default TraderList;
