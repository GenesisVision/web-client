import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { filterOrderEventsStream } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  FuturesOrder,
  SpotOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useState } from "react";

import { withTradingTable } from "../with-trading-table";
import { TradeHistoryFutures } from "./trade-history-futures";
import { TradeHistorySpot } from "./trade-history-spot";

const TradeHistoryContainer: React.FC = () => {
  const { exchangeAccountId, $userStream, terminalType } = useContext(
    TerminalInfoContext
  );

  const [socketData, setSocketData] = useState<
    SpotOrder[] | FuturesOrder[] | undefined
  >();

  useEffect(() => {
    if (!exchangeAccountId || !$userStream) return;
    const openOrdersStream = filterOrderEventsStream($userStream);
    openOrdersStream.subscribe(data => {
      setSocketData([data as any]);
    });
  }, [exchangeAccountId, $userStream]);

  return terminalType === "futures" ? (
    <TradeHistoryFutures updates={socketData as FuturesOrder[]} />
  ) : (
    <TradeHistorySpot updates={socketData as SpotOrder[]} />
  );
};

export default withTradingTable(TradeHistoryContainer);
