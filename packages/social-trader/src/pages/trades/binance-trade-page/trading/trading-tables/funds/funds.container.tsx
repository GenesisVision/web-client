import { filterPositionEventsStream } from "pages/trades/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesAccountUpdateEvent } from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { normalizeFundsList } from "pages/trades/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import { AssetBalance } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { Funds } from "./funds";

export const FundsContainer: React.FC = () => {
  const { accountInfo, userStream } = useContext(TradingInfoContext);
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
    const socketDataBalances = socketData.accountUpdate.balances;
    socketDataBalances.forEach(({ asset, free }) => {
      updatedList[asset] = { ...updatedList[asset], free };
    });
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <Funds items={items} />;
};
