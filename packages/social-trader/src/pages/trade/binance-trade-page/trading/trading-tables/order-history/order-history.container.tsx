import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { filterOrderEventsStream } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { UnitedOrder } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useState } from "react";

import { OrderHistory } from "./order-history";

export const OrderHistoryContainer: React.FC = () => {
  const { exchangeAccountId, userStream } = useContext(TerminalInfoContext);

  const [socketData, setSocketData] = useState<UnitedOrder[] | undefined>();

  useEffect(() => {
    if (!exchangeAccountId || !userStream) return;
    const openOrdersStream = filterOrderEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData([data]);
    });
  }, [exchangeAccountId, userStream]);

  return <OrderHistory updates={socketData} />;
};
