import { filterPositionEventsStream } from "pages/trade/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesAccountUpdateEvent } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/terminal-methods.context";
import { FuturesPositionInformation } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";

import { Positions } from "./positions";
import { normalizePositionsList } from "./positions.helpers";

export const PositionsContainer: React.FC = () => {
  const { getPositionInformation } = useContext(TerminalMethodsContext);
  const { authData } = useContext(TerminalInfoContext);

  const {
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [list, setList] = useState<{
    [key: string]: FuturesPositionInformation;
  }>({});
  const [socketData, setSocketData] = useState<
    FuturesAccountUpdateEvent | undefined
  >();

  useEffect(() => {
    if (!authData?.publicKey || !userStream) return;
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
