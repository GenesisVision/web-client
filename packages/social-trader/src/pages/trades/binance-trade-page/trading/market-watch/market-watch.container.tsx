import { MarketWatch } from "pages/trades/binance-trade-page/trading/market-watch/market-watch";
import {
  normalizeMarketList,
  normalizeSymbolsList
} from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import {
  MergedTickerSymbolType,
  Ticker
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useEffect, useMemo, useState } from "react";
import { map } from "rxjs/operators";
import { getSymbols } from "services/binance/binance-http.service";
import { getTickersStream } from "services/binance/binance-stream.service";
import { useSockets } from "services/websocket.service";

interface Props {}

const _MarketWatchContainer: React.FC<Props> = () => {
  const [symbols, setSymbols] = useState<{
    [key: string]: Symbol;
  }>({});
  const [list, setList] = useState<{
    [key: string]: MergedTickerSymbolType;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: Ticker;
  }>({});
  const { connectSocket } = useSockets();

  useEffect(() => {
    const symbols = getSymbols().pipe(
      map(items => normalizeSymbolsList(items))
    );
    symbols.subscribe(data => {
      setSymbols(data);
    });

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
    Object.keys(symbols).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...symbols[name] };
    });
    setList(updatedList);
  }, [symbols]);
  const items = useMemo(() => Object.values(list), [list]);

  return Object.values(socketData).length ? (
    <MarketWatch items={items} />
  ) : null;
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);
