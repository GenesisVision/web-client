import { MarketWatch } from "pages/trades/binance-trade-page/trading/market-watch/market-watch";
import {
  normalizeMarketList,
  normalizeSymbolsList
} from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import {
  MergedTickerSymbolType,
  Symbol,
  Ticker
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";
import { useSockets } from "services/websocket.service";

import { getTickersStream } from "../services/binance-stream.service";

interface Props {}

const _MarketWatchContainer: React.FC<Props> = ({}) => {
  const [normalizedSymbols, setNormalizedSymbols] = useState<{
    [key: string]: Symbol;
  }>({});
  const [list, setList] = useState<{
    [key: string]: MergedTickerSymbolType;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: Ticker;
  }>({});
  const { connectSocket } = useSockets();

  const { exchangeInfo } = useContext(TradingInfoContext);

  useEffect(() => {
    if (exchangeInfo)
      setNormalizedSymbols(normalizeSymbolsList(exchangeInfo.symbols));
  }, [exchangeInfo]);

  useEffect(() => {
    const marketTickets = getTickersStream(connectSocket).pipe(
      map(items => normalizeMarketList(items))
    );
    marketTickets.subscribe(data => {
      setSocketData(data);
    });
  }, []);
  useEffect(() => {
    const updatedList = { ...list };
    Object.keys(socketData).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...socketData[name] };
    });
    setList(updatedList);
  }, [socketData]);
  useEffect(() => {
    const updatedList = { ...list };
    Object.keys(normalizedSymbols).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...normalizedSymbols[name] };
    });
    setList(updatedList);
  }, [normalizedSymbols]);
  const items = useMemo(() => Object.values(list), [list]);

  return Object.values(socketData).length ? (
    <MarketWatch items={items} />
  ) : null;
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);
