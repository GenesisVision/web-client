import { DefaultTableBlock } from "components/default.block/default-table.block";
import { OpenOrdersContainer } from "pages/trades/binance-trade-page/trading/open-orders/open-orders.container";
import React from "react";

interface Props {}

export const OpenOrdersBlock: React.FC<Props> = () => {
  return (
    <DefaultTableBlock solid>
      <OpenOrdersContainer />
    </DefaultTableBlock>
  );
};
