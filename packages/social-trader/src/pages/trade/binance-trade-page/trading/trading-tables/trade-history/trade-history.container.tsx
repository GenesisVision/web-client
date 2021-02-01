import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { filterOrderEventsStream } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useState } from "react";

import { TradeHistory } from "./trade-history";

export const TradeHistoryContainer: React.FC = () => {
  const { exchangeAccountId, userStream } = useContext(TerminalInfoContext);

  const [socketData, setSocketData] = useState<UnitedOrder[] | undefined>();

  useEffect(() => {
    if (!exchangeAccountId || !userStream) return;
    const openOrdersStream = filterOrderEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData([data]);
    });
  }, [exchangeAccountId, userStream]);

  return <TradeHistory updates={socketData} />;
};
