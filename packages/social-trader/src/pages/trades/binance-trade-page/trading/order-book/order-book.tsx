import classNames from "classnames";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
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
              <Text muted size={"small"}>
                Price ({baseAsset})
              </Text>
            </th>
            <th>
              <Text muted size={"small"}>
                Amount ({quoteAsset})
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
              color={"#ff0000"}
              items={asks}
            />
          </Row>
          <Row small>
            <OrderBookCurrentPriceContainer />
          </Row>
          <Row wide small className={styles["order-book__table-block"]}>
            <OrderBookTable
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
