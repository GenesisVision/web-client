import clsx from "clsx";
import { Center } from "components/center/center";
import { ColoredTextColor } from "components/colored-text/colored-text";
import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { ORDER_BOOK_ROW_HEIGHT } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import React from "react";

import styles from "./order-book.module.scss";

interface Props {
  stepSize: string;
  tickSize: string;
  setPrice: (price: string) => void;
  hasOrder?: boolean;
  barPercent: number;
  tableTickSize?: string;
  hovered: boolean;
  index: number;
  setHoveredRow: (index: number | undefined) => void;
  color: ColoredTextColor;
  price: string;
  amount: string;
  total: number;
}

const _OrderBookRow: React.FC<Props> = ({
  stepSize,
  tickSize,
  setPrice,
  hasOrder,
  barPercent,
  tableTickSize,
  hovered,
  index,
  setHoveredRow,
  color,
  price,
  amount,
  total
}) => {
  const formattedPrice = terminalMoneyFormat({
    amount: price,
    tickSize: tableTickSize || tickSize
  });
  const formattedAmount = terminalMoneyFormat({
    amount: amount,
    tickSize: stepSize
  });
  const formattedTotal = terminalMoneyFormat({
    amount: total,
    tickSize: tableTickSize || tickSize
  });

  return (
    <tr
      style={{
        height: `${ORDER_BOOK_ROW_HEIGHT}px`,
        background: `linear-gradient(90deg, transparent ${barPercent}%, ${color}30 ${barPercent}%)`
      }}
      onMouseEnter={() => setHoveredRow(index)}
      onMouseLeave={() => setHoveredRow(undefined)}
      onClick={() => setPrice(String(price))}
      className={clsx(styles["order-book__table-row"], {
        [styles["order-book__table-row--hovered"]]: hovered
      })}
    >
      <td className={clsx(styles["order-book__first-cell"])}>
        <Center>
          {hasOrder && (
            <div className={styles["order-book__has-order-bubble"]} />
          )}
          <Text size={"xsmall"} color={color}>
            {formattedPrice}
          </Text>
        </Center>
      </td>
      <td>{formattedAmount}</td>
      <td>{formattedTotal}</td>
    </tr>
  );
};

export const OrderBookRow = React.memo(_OrderBookRow);
