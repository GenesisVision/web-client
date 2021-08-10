import { ColoredTextColor } from "components/colored-text/colored-text";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalOpenOrdersContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-open-orders.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/contexts/trading-price.context";
import { isOrderInLine } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import { OrderBookRow } from "pages/trade/binance-trade-page/trading/order-book/order-book.row";
import { StringBidDepth } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useEffect, useState } from "react";
import { getPercentageValue } from "utils/helpers";

import styles from "./order-book.module.scss";
import { LevelsSum, OrderBookTooltip } from "./order-book-tooltip";

interface Props {
  fullAmount: number;
  tableTickSize?: string;
  reverse?: boolean;
  items?: StringBidDepth[];
  color: ColoredTextColor;
}

const _OrderBookTable: React.FC<Props> = ({
  fullAmount,
  tableTickSize,
  reverse,
  color,
  items = []
}) => {
  const { openOrders } = useContext(TerminalOpenOrdersContext);
  const { setPrice } = useContext(TradingPriceContext);
  const {
    stepSize,
    tickSize,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);

  const [hoveredRow, setHoveredRow] = useState<number | undefined>();
  const [levelSum, setLevelSum] = useState<LevelsSum>({
    avgPrice: 0,
    baseSum: 0,
    quoteSum: 0
  });

  useEffect(() => {
    if (hoveredRow !== undefined) {
      const first = reverse ? hoveredRow : 0;
      const last = reverse ? items.length : hoveredRow + 1;
      const selectedItems = items.slice(first, last);
      const avgPrice =
        selectedItems.reduce((sum, [price]) => sum + +price, 0) /
        (last - first);
      const baseSum = selectedItems.reduce(
        (sum, [_, amount]) => sum + +amount,
        0
      );
      const quoteSum = selectedItems.reduce(
        (sum, [price, amount]) => sum + +price * +amount,
        0
      );
      setLevelSum({ avgPrice, baseSum, quoteSum });
    }
  }, [hoveredRow, items]);

  const limitOrders = openOrders
    ? openOrders
        .filter(({ type }) => type.toUpperCase() === "LIMIT")
        .filter(
          ({ orderStatus }) =>
            orderStatus && orderStatus.toUpperCase() === "NEW"
        )
        .filter(
          ({ side }) =>
            (reverse && side === "Sell") ||
            (!reverse && side.toUpperCase() === "BUY")
        )
        .map(({ price }) => +price)
    : [];

  return (
    <table className={styles["order-book__table"]}>
      <tbody>
        {items.map(([price, amount], i) => {
          const hasOrder = isOrderInLine({ items, i, limitOrders, price });
          const total = +price * +amount;
          return (
            <OrderBookRow
              setPrice={setPrice}
              stepSize={stepSize}
              tickSize={tickSize}
              key={price}
              hasOrder={hasOrder}
              barPercent={100 - getPercentageValue(total, fullAmount)}
              tableTickSize={tableTickSize}
              hovered={
                hoveredRow !== undefined &&
                (reverse ? i >= hoveredRow : i <= hoveredRow)
              }
              index={i}
              setHoveredRow={setHoveredRow}
              color={color}
              price={price}
              amount={amount}
              total={total}
            />
          );
        })}
      </tbody>
      <OrderBookTooltip
        baseAsset={baseAsset}
        quoteAsset={quoteAsset}
        stepSize={stepSize}
        tickSize={tickSize}
        levelSum={levelSum}
        tableTickSize={tableTickSize}
        hoveredRow={hoveredRow}
      />
    </table>
  );
};

export const OrderBookTable = React.memo(_OrderBookTable);
