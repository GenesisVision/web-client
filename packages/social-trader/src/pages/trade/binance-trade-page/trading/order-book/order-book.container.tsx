import useFlag from "hooks/flag.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import { OrderBook } from "pages/trade/binance-trade-page/trading/order-book/order-book";
import {
  collapseItems,
  getDividerParts,
  normalizeDepthList,
  ORDER_BOOK_ROW_HEIGHT,
  sortDepthList,
  updateDepthList,
  updateOrderBookFromBufferLogger
} from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import { getSymbol } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import {
  Depth,
  NormalizedDepth
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSockets } from "services/websocket.service";

interface Props {}

const ASKS_FULL_AMOUNT_DIVIDER = 300;
const BIDS_FULL_AMOUNT_DIVIDER = 25;

const _OrderBookContainer: React.FC<Props> = ({}) => {
  const [asksDivider, setAsksDivider] = useState(ASKS_FULL_AMOUNT_DIVIDER);
  const [bidsDivider, setBidsDivider] = useState(BIDS_FULL_AMOUNT_DIVIDER);

  const { depthSocket, getDepth } = useContext(TerminalMethodsContext);
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);

  const { connectSocket } = useSockets();

  const {
    terminalType,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [socketOpened, setSocketOpened, setSocketClosed] = useFlag();
  const [tickValue, setTickValue] = useState<
    { value: string; default: boolean } | undefined
  >();
  const [list, setList] = useState<NormalizedDepth | undefined>();
  const [depthSocketData, setDepthSocketData] = useState<Depth | undefined>();
  const [depthSocketDataBuffer, setDepthSocketDataBuffer] = useState<
    Depth[] | undefined
  >([]);

  const dividerParts = getDividerParts(tickValue?.value);

  useEffect(() => {
    if (ref.current && !document.fullscreenElement) {
      const count = Math.floor(
        (ref.current.clientHeight / ORDER_BOOK_ROW_HEIGHT - 2) / 2
      );
      setCount(count > 1 ? count : 1);
    }
  }, [ref.current?.clientHeight]);

  useEffect(() => {
    setSocketClosed();
    setList(undefined);
    setDepthSocketData(undefined);
    setDepthSocketDataBuffer([]);
    const symbol = getSymbol(baseAsset, quoteAsset);
    console.log("open stream");
    const depthStream = depthSocket(connectSocket, symbol, () => {
      setSocketOpened();
    });
    depthStream.subscribe(data => {
      setDepthSocketData(data);
    });
  }, [baseAsset, quoteAsset, terminalType]);

  useEffect(() => {
    if (!socketOpened) return;
    console.log("get snapshot");
    getDepth(getSymbol(baseAsset, quoteAsset)).subscribe(data => {
      setList({
        ...data,
        asks: normalizeDepthList(data.asks),
        bids: normalizeDepthList(data.bids)
      });
    });
  }, [socketOpened]);

  useEffect(() => {
    if (list && depthSocketDataBuffer?.length) {
      console.log("Update snapshot from buffer", depthSocketDataBuffer);
      let asks = list.asks;
      let bids = list.bids;
      depthSocketDataBuffer
        .filter(event => event.lastUpdateId > list.lastUpdateId)
        .forEach(event => {
          updateOrderBookFromBufferLogger({ event, list });
          asks = updateDepthList(asks, event.asks);
          bids = updateDepthList(bids, event.bids);
        });
      const lastBufferItem =
        depthSocketDataBuffer[depthSocketDataBuffer.length - 1];
      setList({
        ...list,
        asks,
        bids,
        lastUpdateId: lastBufferItem.lastUpdateId
      });
      setDepthSocketDataBuffer(undefined);
    }
  }, [list, depthSocketDataBuffer]);

  useEffect(() => {
    if (depthSocketData) {
      if (depthSocketDataBuffer) {
        console.log("set buffer");
        const newBuffer = [...depthSocketDataBuffer, depthSocketData];
        setDepthSocketDataBuffer(newBuffer);
      } else if (list) {
        setList({
          ...list,
          asks: updateDepthList(list.asks, depthSocketData.asks),
          bids: updateDepthList(list.bids, depthSocketData.bids),
          lastUpdateId: depthSocketData.lastUpdateId,
          firstUpdateId: depthSocketData.firstUpdateId
        });
      }
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
        .sort(sortDepthList)
        .slice(-count),
      bids: Object.values(
        collapseItems(list ? list.bids : {}, dividerParts, {
          enable: !tickValue?.default
        })
      )
        .sort(sortDepthList)
        .slice(0, count)
    }),
    [count, list, dividerParts, tickValue]
  );
  const { asks, bids } = listForRender;

  const listAmount = useMemo(() => {
    if (!list)
      return {
        asks: 0,
        bids: 0
      };
    return {
      asks:
        Object.values(list.asks).reduce((prev, [price, amount]) => {
          return prev + +price * +amount;
        }, 0) / asksDivider,
      bids:
        Object.values(list.bids).reduce((prev, [price, amount]) => {
          return prev + +price * +amount;
        }, 0) / bidsDivider
    };
  }, [list, asksDivider, bidsDivider]);

  return (
    <OrderBook
      baseAsset={baseAsset}
      quoteAsset={quoteAsset}
      listAmount={listAmount}
      tickValue={tickValue}
      setTickValue={setTickValue}
      tablesBlockRef={ref}
      asks={asks}
      bids={bids}
    />
  );
};

export const OrderBookContainer = React.memo(_OrderBookContainer);
