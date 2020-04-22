import { MarketWatch } from "pages/trades/binance-trade-page/trading/market-watch/market-watch";
import { normalizeMarketList } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { Ticker } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useEffect, useState } from "react";
import { map } from "rxjs/operators";
import { getTickersStream } from "services/binance/binance-stream.service";
import { marketTicketsSocket } from "services/binance/binance-ws.service";
import { useSockets } from "services/websocket.service";

interface Props {}

const _MarketWatchContainer: React.FC<Props> = () => {
  const [list, setList] = useState<{
    [key: string]: Ticker;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: Ticker;
  }>({});
  const { connectSocket } = useSockets();
  useEffect(() => {
    const marketTickets = getTickersStream(connectSocket).pipe(
      map(items => normalizeMarketList(items))
    );
    marketTickets.subscribe(data => {
      setSocketData(data);
    });
  }, []);
  useEffect(() => {
    setList({ ...list, ...socketData });
  }, [socketData]);
  return <MarketWatch items={Object.values(list)} />;
};

export const MarketWatchContainer = React.memo(_MarketWatchContainer);
