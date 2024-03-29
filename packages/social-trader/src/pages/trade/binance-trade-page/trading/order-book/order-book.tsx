import clsx from "clsx";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { OrderBookTickSizeSelect } from "pages/trade/binance-trade-page/trading/order-book/order-book-tick-size-select";
import {
  DepthFullAmount,
  StringBidDepth,
  TerminalCurrency,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { forwardRef } from "react";

import styles from "./order-book.module.scss";
import { OrderBookFuturesCurrentPriceContainer } from "./order-book-futures-current-price.container";
import { OrderBookFuturesTable } from "./order-book-futures-table";
import { OrderBookSpotCurrentPriceContainer } from "./order-book-spot-current-price.container";
import { OrderBookSpotTable } from "./order-book-spot-table";

interface Props {
  quoteAsset: TerminalCurrency;
  baseAsset: TerminalCurrency;
  terminalType: TerminalType;
  setTickValue: (value: { value: string; default: boolean }) => void;
  asks: StringBidDepth[];
  bids: StringBidDepth[];
  depthMaxSum?: number;
  listAmount?: DepthFullAmount;
  tickValue?: { value: string; default: boolean };
}

const _OrderBook = forwardRef<HTMLDivElement, Props>(
  (
    {
      quoteAsset,
      terminalType,
      depthMaxSum,
      baseAsset,
      listAmount,
      tickValue,
      setTickValue,
      asks,
      bids
    },
    tablesBlockRef
  ) => {
    const isFutures = terminalType === "futures";
    return (
      <>
        <Row size={"small"}>
          <OrderBookTickSizeSelect value={tickValue} setValue={setTickValue} />
        </Row>
        <Row size={"small"}>
          <table className={styles["order-book__table"]}>
            <thead>
              <th>
                <Text muted size={"small"}>
                  Price ({quoteAsset})
                </Text>
              </th>
              <th>
                <Text muted size={"small"}>
                  {isFutures ? `Size (${baseAsset})` : `Amount (${baseAsset})`}
                </Text>
              </th>
              <th>
                <Text muted size={"small"}>
                  {isFutures ? `Sum (${baseAsset})` : "Total"}
                </Text>
              </th>
            </thead>
          </table>
        </Row>
        <Row size={"small"} className={styles["order-book__tables-row"]}>
          <div
            ref={tablesBlockRef}
            className={styles["order-book__tables-block"]}
          >
            <Row
              wide
              className={clsx(
                styles["order-book__table-block"],
                styles["order-book__table-block--reverse"]
              )}
            >
              {isFutures ? (
                <OrderBookFuturesTable
                  tableTickSize={tickValue?.value}
                  reverse
                  color={"#ff0000"}
                  items={asks}
                  depthMaxSum={depthMaxSum!}
                />
              ) : (
                <OrderBookSpotTable
                  fullAmount={listAmount!.asks}
                  tableTickSize={tickValue?.value}
                  reverse
                  color={"#ff0000"}
                  items={asks}
                />
              )}
            </Row>
            <Row size={"small"} wide>
              {isFutures ? (
                <OrderBookFuturesCurrentPriceContainer />
              ) : (
                <OrderBookSpotCurrentPriceContainer />
              )}
            </Row>
            <Row
              wide
              size={"small"}
              className={styles["order-book__table-block"]}
            >
              {isFutures ? (
                <OrderBookFuturesTable
                  depthMaxSum={depthMaxSum!}
                  tableTickSize={tickValue?.value}
                  color={"#00ff00"}
                  items={bids}
                />
              ) : (
                <OrderBookSpotTable
                  fullAmount={listAmount!.bids}
                  tableTickSize={tickValue?.value}
                  color={"#00ff00"}
                  items={bids}
                />
              )}
            </Row>
          </div>
        </Row>
      </>
    );
  }
);

export const OrderBook = React.memo(_OrderBook);
