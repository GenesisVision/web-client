import clsx from "clsx";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { OrderBookCurrentPriceContainer } from "pages/trade/binance-trade-page/trading/order-book/order-book-current-price.container";
import { OrderBookTickSizeSelect } from "pages/trade/binance-trade-page/trading/order-book/order-book-tick-size-select";
import {
  DepthFullAmount,
  StringBidDepth,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { RefObject } from "react";

import { OrderBookTable } from "./order-book-table";
import styles from "./order-book.module.scss";

interface Props {
  quoteAsset: TerminalCurrency;
  baseAsset: TerminalCurrency;
  listAmount: DepthFullAmount;
  tickValue?: { value: string; default: boolean };
  setTickValue: (value: { value: string; default: boolean }) => void;
  tablesBlockRef: RefObject<HTMLDivElement>;
  asks: StringBidDepth[];
  bids: StringBidDepth[];
}

const _OrderBook: React.FC<Props> = ({
  quoteAsset,
  baseAsset,
  listAmount,
  tickValue,
  setTickValue,
  tablesBlockRef,
  asks,
  bids
}) => {
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
                Amount ({baseAsset})
              </Text>
            </th>
            <th>
              <Text muted size={"small"}>
                Total
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
            <OrderBookTable
              fullAmount={listAmount.asks}
              tableTickSize={tickValue?.value}
              reverse
              color={"#ff0000"}
              items={asks}
            />
          </Row>
          <Row size={"small"} wide>
            <OrderBookCurrentPriceContainer />
          </Row>
          <Row
            wide
            size={"small"}
            className={styles["order-book__table-block"]}
          >
            <OrderBookTable
              fullAmount={listAmount.bids}
              tableTickSize={tickValue?.value}
              color={"#00ff00"}
              items={bids}
            />
          </Row>
        </div>
      </Row>
    </>
  );
};

export const OrderBook = React.memo(_OrderBook);
