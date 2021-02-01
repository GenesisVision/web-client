import { TerminalOpenOrdersContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-open-orders.context";
import React, { useContext } from "react";

import { OpenOrders } from "./open-orders";

export const OpenOrdersContainer: React.FC = () => {
  const { openOrders } = useContext(TerminalOpenOrdersContext);

  return <OpenOrders items={openOrders} />;
};
