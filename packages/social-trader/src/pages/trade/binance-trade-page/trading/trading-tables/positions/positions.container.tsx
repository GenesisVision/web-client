import { filterPositionEventsStream } from "pages/trade/binance-trade-page/services/futures/binance-futures.helpers";
import { FuturesAccountEventPosition } from "pages/trade/binance-trade-page/services/futures/binance-futures.types";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { FuturesPositionInformation } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { Positions } from "./positions";
import {
  mapBinanceRawFuturesAccountPositionToFuturesPositionInformation,
  normalizePositionsList,
  updateList
} from "./positions.helpers";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";

export const PositionsContainer: React.FC = () => {
  const { exchangeAccountId, accountInfo } = useContext(TerminalInfoContext);

  const {
    userStream,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [list, setList] = useState<{
    [key: string]: FuturesPositionInformation;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: FuturesAccountEventPosition;
  }>({});

  useEffect(() => {
    if (!userStream) return;
    const positionsStream = filterPositionEventsStream(userStream);
    positionsStream.subscribe(({ positions }) => {
      setSocketData(normalizePositionsList(positions));
    });
  }, [exchangeAccountId, baseAsset, quoteAsset, userStream]);

  useEffect(() => {
    if (Object.values(list).length || !accountInfo?.positions) return;
    const positionsForSymbol = accountInfo.positions.filter(
      ({ symbol }) => symbol === getSymbol(baseAsset, quoteAsset)
    );
    setList(
      normalizePositionsList(
        positionsForSymbol.map(
          mapBinanceRawFuturesAccountPositionToFuturesPositionInformation
        )
      )
    );
  }, [accountInfo]);

  useEffect(() => {
    if (!Object.values(list).length || !list) return;
    const updatedList = updateList(list, socketData);
    setList(updatedList);
  }, [socketData]);

  const items = useMemo(
    () => Object.values(list).filter(({ positionAmt }) => positionAmt > 0),
    [list]
  );

  return <Positions items={items} />;
};
