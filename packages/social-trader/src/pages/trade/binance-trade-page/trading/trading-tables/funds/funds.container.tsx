import { filterPositionEventsStream } from "pages/trade/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesAccountUpdateEvent } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  NormalizedFunds,
  normalizeFundsList,
  sortFundsFunc,
  updateUsdValues
} from "pages/trade/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { Funds } from "./funds";
import { useAccountCurrency } from "hooks/account-currency.hook";

export const FundsContainer: React.FC = () => {
  const currency = useAccountCurrency();
  const { accountInfo, userStream } = useContext(TerminalInfoContext);
  const [socketData, setSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
  >();
  const [list, setList] = useState<NormalizedFunds>({});

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
    socketDataBalances.forEach(update => {
      updatedList[update.asset] = {
        ...updatedList[update.asset],
        ...update,
        free: +update.free
      };
    });
    updateUsdValues(updatedList, currency).then(data => {
      setList(data);
    });
  }, [socketData]);

  const items = useMemo(
    () =>
      Object.values(list)
        .sort(sortFundsFunc)
        .filter(({ free, locked }) => free - locked > 0),
    [list]
  );

  return <Funds items={items} />;
};
