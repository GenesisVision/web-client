import { filterPositionEventsStream } from "pages/trade/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesAccountUpdateEvent } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { AssetBalance } from "pages/trade/binance-trade-page/trading/terminal.types";
import { normalizeFundsList } from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { Funds } from "./funds";

export const FundsContainer: React.FC = () => {
  const { accountInfo, userStream } = useContext(TerminalInfoContext);
  const [socketData, setSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
  >();
  const [list, setList] = useState<{
    [key: string]: AssetBalance;
  }>({});

  useEffect(() => {
    if (!accountInfo) return;
    setList(normalizeFundsList(accountInfo.balances));
  }, [accountInfo]);

  useEffect(() => {
    if (!userStream) return;
    const openOrdersStream = filterPositionEventsStream(userStream);
    openOrdersStream.subscribe(data => {
      setSocketData(data);
    });
  }, [userStream]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    const socketDataBalances = socketData.balances;
    socketDataBalances.forEach(({ asset, free }) => {
      updatedList[asset] = { ...updatedList[asset], free: +free };
    });
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <Funds items={items} />;
};
