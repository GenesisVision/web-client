import classNames from "classnames";
import { Row } from "components/row/row";
import { OrderBook } from "pages/trades/binance-trade-page/trading/order-book/order-book";
import { OrderBookCurrentPriceContainer } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price.container";
import { OrderBookTickSizeSelect } from "pages/trades/binance-trade-page/trading/order-book/order-book-tick-size-select";
import {
  collapseItems,
  getDividerParts,
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

import styles from "./order-book.module.scss";

interface Props {}

const _OrderBookContainer: React.FC<Props> = ({}) => {
  const count = 13;

  const { connectSocket } = useSockets();

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [tickValue, setTickValue] = useState<
    { value: string; default: boolean } | undefined
  >();
  const [list, setList] = useState<NormalizedDepth | undefined>();
  const [depthSocketData, setDepthSocketData] = useState<Depth | undefined>();
  const [depthSocketDataBuffer, setDepthSocketDataBuffer] = useState<Depth[]>(
    []
  );

  const dividerParts = getDividerParts(tickValue?.value);

  useEffect(() => {
    setList(undefined);
    setDepthSocketData(undefined);
    const symbol = getSymbol(baseAsset, quoteAsset);
    const depthStream = depthSocket(connectSocket, symbol);
    depthStream.subscribe(data => {
      setDepthSocketData(data);
    });
    const depth = getDepth(symbol);
    depth.subscribe(data => {
      let asks = normalizeDepthList(data.asks);
      let bids = normalizeDepthList(data.bids);
      const updates = depthSocketDataBuffer.filter(
        ({ lastUpdateId }) => lastUpdateId > data.lastUpdateId
      );
      updates
        .filter(event => event.lastUpdateId > data.lastUpdateId)
        .forEach(event => {
          asks = updateDepthList(asks, event.asks);
          bids = updateDepthList(bids, event.bids);
        });
      setList({ ...data, asks, bids });
      setDepthSocketDataBuffer([]);
    });
  }, [baseAsset, quoteAsset]);

  useEffect(() => {
    if (!depthSocketData && !list) return;
    if (!list && depthSocketData) {
      setDepthSocketDataBuffer([...depthSocketDataBuffer, depthSocketData]);
    }
    if (list && depthSocketData) {
      const asks = updateDepthList(list.asks, depthSocketData.asks);
      const bids = updateDepthList(list.bids, depthSocketData.bids);
      setList({ ...list, asks, bids });
    }
  }, [depthSocketData]);

  const listForRender = useMemo(
    () => ({
      asks: Object.values(
        collapseItems(list ? list.asks : {}, dividerParts, {
          add: true,
          enable: !tickValue?.default
        })
      )
        .sort(([priceA], [priceB]) => +priceB - +priceA)
        .slice(-count),
      bids: Object.values(
        collapseItems(list ? list.bids : {}, dividerParts, {
          enable: !tickValue?.default
        })
      )
        .sort(([priceA], [priceB]) => +priceB - +priceA)
        .slice(0, count)
    }),
    [list, dividerParts]
  );
  const { asks, bids } = listForRender;

  const ask = asks[asks.length - 1];
  const bid = bids[0];
  if (ask && bid)
    if (+ask[0] < +bid[0]) console.log("ask is less than bid", ask[0], bid[0]);

  return (
    <>
      <Row>
        <OrderBookTickSizeSelect value={tickValue} setValue={setTickValue} />
      </Row>
      <Row center={false} className={styles["order-book__tables-block"]}>
        <Row
          className={classNames(
            styles["order-book__table-block"],
            styles["order-book__table-block--reverse"]
          )}
        >
          <OrderBook reverse color={"red"} items={asks} />
        </Row>
        <Row>
          <OrderBookCurrentPriceContainer />
        </Row>
        <Row className={styles["order-book__table-block"]}>
          <OrderBook color={"green"} items={bids} />
        </Row>
      </Row>
    </>
  );
};

export const OrderBookContainer = React.memo(_OrderBookContainer);
