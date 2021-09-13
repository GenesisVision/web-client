import { ColoredTextColor } from "components/colored-text/colored-text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalOpenOrdersContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-open-orders.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import {
  countOrderBookFuturesSum,
  getOrderBookLimitOrders,
  isOrderInLine
} from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import { OrderBookRow } from "pages/trade/binance-trade-page/trading/order-book/order-book.row";
import { StringBidDepth } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useMemo } from "react";
import { getPercentageValue } from "utils/helpers";

import styles from "./order-book.module.scss";

interface Props {
  color: ColoredTextColor;
  depthMaxSum: number;
  tableTickSize?: string;
  reverse?: boolean;
  items?: StringBidDepth[];
}

const _OrderBookFuturesTable: React.FC<Props> = ({
  tableTickSize,
  reverse,
  depthMaxSum,
  color,
  items = []
}) => {
  const { openOrders } = useContext(TerminalOpenOrdersContext);
  const { setPrice } = useContext(TradingPriceContext);

  const { stepSize, tickSize } = useContext(TerminalInfoContext);

  const limitOrders = useMemo(
    () => getOrderBookLimitOrders(openOrders, reverse),
    [openOrders]
  );

  return (
    <table className={styles["order-book__table"]}>
      <tbody>
        {items.map(([price, amount], i) => {
          const hasOrder = isOrderInLine({ items, i, limitOrders, price });
          const sum = countOrderBookFuturesSum(items, i, reverse);
          return (
            <OrderBookRow
              setPrice={setPrice}
              stepSize={stepSize}
              tickSize={tickSize}
              key={price}
              hasOrder={hasOrder}
              barPercent={100 - getPercentageValue(sum, depthMaxSum)}
              tableTickSize={tableTickSize}
              color={color}
              price={price}
              amount={amount}
              sum={sum}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export const OrderBookFuturesTable = React.memo(_OrderBookFuturesTable);
