import { filterPositionEventsStream } from "pages/trades/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesAccountUpdateEvent } from "pages/trades/binance-trade-page/services/futures/binance-futures.types";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { useTradeAuth } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { FuturesPositionInformation } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

import { Positions } from "./positions";
import { normalizePositionsList } from "./positions.helpers";

export const PositionsContainer: React.FC = () => {
  const { getPositionInformation } = useContext(TerminalMethodsContext);
  const { authData } = useTradeAuth();

  const {
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [list, setList] = useState<{
    [key: string]: FuturesPositionInformation;
  }>({});
  const [socketData, setSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
  >();

  useEffect(() => {
    if (!authData.publicKey || !userStream) return;
    const positions = getPositionInformation!({ authData });
    positions.pipe(map(normalizePositionsList)).subscribe(setList);
    const positionsStream = filterPositionEventsStream(userStream);
    positionsStream.subscribe(setSocketData);
  }, [authData, baseAsset, quoteAsset, userStream]);

  useEffect(() => {
    if (!socketData) return;
    const updatedList = { ...list };
    //
    // Updating
    //
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(() => Object.values(list), [list]);
  return <Positions items={items} />;
};
