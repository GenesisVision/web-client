import { TerminalOpenOrdersContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-open-orders.context";
import React, { useContext } from "react";

import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { FuturesOrder, UnitedOrder } from "../../terminal.types";
import { OpenOrdersFutures } from "./open-orders-futures";
import { OpenOrdersSpot } from "./open-orders-spot";

export const OpenOrdersContainer: React.FC = () => {
  const { openOrders } = useContext(TerminalOpenOrdersContext);
  const { terminalType } = useContext(TerminalInfoContext);

  return terminalType === "futures" ? (
    <OpenOrdersFutures items={openOrders as FuturesOrder[]} />
  ) : (
    <OpenOrdersSpot items={openOrders as UnitedOrder[]} />
  );
};
