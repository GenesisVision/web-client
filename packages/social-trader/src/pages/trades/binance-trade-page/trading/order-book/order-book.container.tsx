import { Row } from "components/row/row";
import { OrderBook } from "pages/trades/binance-trade-page/trading/order-book/order-book";
import { OrderBookCurrentPriceContainer } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price.container";
import {
  normalizeDepthList,
  updateDepthList
} from "pages/trades/binance-trade-page/trading/order-book/order-book.helpers";
import { getDepth } from "pages/trades/binance-trade-page/trading/services/binance-http.service";
import { depthSocket } from "pages/trades/binance-trade-page/trading/services/binance-ws.service";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { getSymbol } from "pages/trades/binance-trade-page/trading/trading.helpers";
import {
  Depth,
  NormalizedDepth
} from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSockets } from "services/websocket.service";

interface Props {}

const _OrderBookContainer: React.FC<Props> = ({}) => {
  const count = 20;

  const { connectSocket } = useSockets();

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [list, setList] = useState<NormalizedDepth | undefined>();
  const [depthSocketData, setDepthSocketData] = useState<Depth | undefined>();

  useEffect(() => {
    const symbol = getSymbol(baseAsset, quoteAsset);
    const depth = getDepth(symbol, count);
    depth.subscribe(data => {
      const asks = normalizeDepthList(data.asks);
      const bids = normalizeDepthList(data.bids);
      setList({ ...data, asks, bids });
    });
    const depthStream = depthSocket(connectSocket, symbol);
    depthStream.subscribe(data => {
      setDepthSocketData(data);
    });
  }, [baseAsset, quoteAsset]);

  useEffect(() => {
    if (!depthSocketData || !list) return;
    const asks = updateDepthList(list.asks, depthSocketData.asks);
    const bids = updateDepthList(list.bids, depthSocketData.bids);

    setList({ ...list, asks, bids });
  }, [depthSocketData]);

  const asks = useMemo(
    () =>
      Object.values(list ? list.asks : {})
        .sort(([priceA], [priceB]) => +priceA - +priceB)
        .slice(0, count),
    [list?.asks]
  );
  const bids = useMemo(
    () =>
      Object.values(list ? list.bids : {})
        .sort(([priceA], [priceB]) => +priceA - +priceB)
        .reverse()
        .slice(0, count),
    [list?.bids]
  );

  return (
    <>
      <Row>
        <OrderBook reverse color={"red"} items={asks} />
      </Row>
      <Row>
        <OrderBookCurrentPriceContainer />
      </Row>
      <Row>
        <OrderBook color={"green"} items={bids} />
      </Row>
    </>
  );
};

export const OrderBookContainer = React.memo(_OrderBookContainer);
