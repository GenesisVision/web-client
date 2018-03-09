import React from "react";

import TraderItem from "./trader-item/trader-item";

const TraderList = ({ traders }) => {
  return traders.map((x, idx) => (
    <TraderItem key={x.id} idx={idx + 1} trader={x} />
  ));
};

export default TraderList;
