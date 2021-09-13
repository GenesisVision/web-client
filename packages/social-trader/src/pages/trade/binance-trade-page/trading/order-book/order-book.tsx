import clsx from "clsx";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { OrderBookCurrentPriceContainer } from "pages/trade/binance-trade-page/trading/order-book/order-book-current-price.container";
import { OrderBookTickSizeSelect } from "pages/trade/binance-trade-page/trading/order-book/order-book-tick-size-select";
import {
  DepthFullAmount,
  StringBidDepth,
  TerminalCurrency,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { RefObject } from "react";

import styles from "./order-book.module.scss";
import { OrderBookFuturesTable } from "./order-book-futures-table";
import { OrderBookSpotTable } from "./order-book-spot-table";

interface Props {
  quoteAsset: TerminalCurrency;
  baseAsset: TerminalCurrency;
  terminalType: TerminalType;
  setTickValue: (value: { value: string; default: boolean }) => void;
  tablesBlockRef: RefObject<HTMLDivElement>;
  asks: StringBidDepth[];
  bids: StringBidDepth[];
  depthMaxSum?: number;
  listAmount?: DepthFullAmount;
  tickValue?: { value: string; default: boolean };
}

const _OrderBook: React.FC<Props> = ({
  quoteAsset,
  terminalType,
  depthMaxSum,
  baseAsset,
  listAmount,
  tickValue,
  setTickValue,
  tablesBlockRef,
  asks,
  bids
}) => {
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
            <OrderBookCurrentPriceContainer />
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
};

export const OrderBook = React.memo(_OrderBook);
