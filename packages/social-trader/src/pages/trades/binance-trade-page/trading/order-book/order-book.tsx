import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { OrderBookCurrentPriceContainer } from "pages/trades/binance-trade-page/trading/order-book/order-book-current-price.container";
import { OrderBookTickSizeSelect } from "pages/trades/binance-trade-page/trading/order-book/order-book-tick-size-select";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { StringBidDepth } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { RefObject, useContext } from "react";

import { OrderBookTable } from "./order-book-table";
import styles from "./order-book.module.scss";

interface Props {
  tickValue?: { value: string; default: boolean };
  setTickValue: (value: { value: string; default: boolean }) => void;
  tablesBlockRef: RefObject<HTMLDivElement>;
  asks: StringBidDepth[];
  bids: StringBidDepth[];
}

const _OrderBook: React.FC<Props> = ({
  tickValue,
  setTickValue,
  tablesBlockRef,
  asks,
  bids
}) => {
  const {
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  return (
    <>
      <Row small>
        <OrderBookTickSizeSelect value={tickValue} setValue={setTickValue} />
      </Row>
      <Row small>
        <table className={styles["order-book__table"]}>
          <thead>
            <th>
              <MutedText small>Price ({baseAsset})</MutedText>
            </th>
            <th>
              <MutedText small>Amount ({quoteAsset})</MutedText>
            </th>
            <th>
              <MutedText small>Total</MutedText>
            </th>
          </thead>
        </table>
      </Row>
      <Row small className={styles["order-book__tables-row"]}>
        <div
          ref={tablesBlockRef}
          className={styles["order-book__tables-block"]}
        >
          <Row
            wide
            className={classNames(
              styles["order-book__table-block"],
              styles["order-book__table-block--reverse"]
            )}
          >
            <OrderBookTable
              tableTickSize={tickValue?.value}
              reverse
              color={"red"}
              items={asks}
            />
          </Row>
          <Row small>
            <OrderBookCurrentPriceContainer />
          </Row>
          <Row wide small className={styles["order-book__table-block"]}>
            <OrderBookTable
              tableTickSize={tickValue?.value}
              color={"green"}
              items={bids}
            />
          </Row>
        </div>
      </Row>
    </>
  );
};

export const OrderBook = React.memo(_OrderBook);
