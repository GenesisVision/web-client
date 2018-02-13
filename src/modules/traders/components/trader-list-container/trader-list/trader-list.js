import React from "react";

import TraderItem from "../trader-item/trader-item";

const TraderList = ({ traders }) => {
  return traders.map(x => <TraderItem key={x.investment.id} trader={x.investment} />);
};

export default TraderList;
