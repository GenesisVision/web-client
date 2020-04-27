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
import { Observable } from "rxjs";
import { useSockets } from "services/websocket.service";

import styles from "./order-book.module.scss";

interface Props {}

const _OrderBookContainer: React.FC<Props> = ({}) => {
  const [isSubscribeDepth, setSubscribeDepth] = useState<string>("none");
  const count = 13;

  const { connectSocket } = useSockets();

  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);

  const [depthSnapshot, setDepthSnapshot] = useState<
    Observable<Depth> | undefined
  >();
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
    setSubscribeDepth("none");
    const symbol = getSymbol(baseAsset, quoteAsset);
    const depthStream = depthSocket(connectSocket, symbol);
    depthStream.subscribe(data => {
      setDepthSocketData(data);
    });
  }, [baseAsset, quoteAsset]);

  useEffect(() => {
    if (!list) {
      if (depthSocketData) {
        const newBuffer = [...depthSocketDataBuffer, depthSocketData];
        setDepthSocketDataBuffer(newBuffer);
        if (isSubscribeDepth === "pending" && depthSnapshot) {
          setSubscribeDepth("done");
          depthSnapshot.subscribe(data => {
            let asks = normalizeDepthList(data.asks);
            let bids = normalizeDepthList(data.bids);
            newBuffer
              .filter(event => event.lastUpdateId > data.lastUpdateId)
              .forEach(event => {
                asks = updateDepthList(asks, event.asks);
                bids = updateDepthList(bids, event.bids);
              });
            setList({
              ...data,
              asks,
              bids,
              lastUpdateId: newBuffer[newBuffer.length - 1].lastUpdateId
            });
            setDepthSocketDataBuffer([]);
          });
        }
        if (isSubscribeDepth === "none") {
          setDepthSnapshot(getDepth(getSymbol(baseAsset, quoteAsset)));
          setSubscribeDepth("pending");
        }
      }
    }
    if (list && depthSocketData) {
      if (depthSocketData.firstUpdateId !== list.lastUpdateId + 1) {
        console.log(`new event id failed`);
        return;
      }
      const asks = updateDepthList(list.asks, depthSocketData.asks);
      const bids = updateDepthList(list.bids, depthSocketData.bids);
      const ask = Object.values(asks).sort(
        ([priceA], [priceB]) => +priceB - +priceA
      )[Object.values(asks).length - 1];
      const bid = Object.values(bids).sort(
        ([priceA], [priceB]) => +priceB - +priceA
      )[0];
      if (ask && bid) {
        if (+ask[0] < +bid[0])
          console.log("Update: ask is less than bid", ask[0], bid[0]);
      }
      setList({
        ...list,
        asks,
        bids,
        lastUpdateId: depthSocketData.lastUpdateId,
        firstUpdateId: depthSocketData.firstUpdateId
      });
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
