import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { filterOrderEventsStream } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  FuturesOrder,
  UnitedOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useState } from "react";

import { TradeHistoryFutures } from "./trade-history-futures";
import { TradeHistorySpot } from "./trade-history-spot";

export const TradeHistoryContainer: React.FC = () => {
  const { exchangeAccountId, $userStream, terminalType } = useContext(
    TerminalInfoContext
  );

  const [socketData, setSocketData] = useState<
    UnitedOrder[] | FuturesOrder[] | undefined
  >();

  useEffect(() => {
    if (!exchangeAccountId || !$userStream) return;
    const openOrdersStream = filterOrderEventsStream($userStream);
    openOrdersStream.subscribe(data => {
      setSocketData([data]);
    });
  }, [exchangeAccountId, $userStream]);

  return terminalType === "futures" ? (
    <TradeHistoryFutures updates={socketData} />
  ) : (
    <TradeHistorySpot updates={socketData} />
  );
};
